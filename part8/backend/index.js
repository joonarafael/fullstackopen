const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const { GraphQLError } = require("graphql");

const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
mongoose.set("strictQuery", false);

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

require("dotenv").config();

const authorController = require("./controllers/authors");
const bookController = require("./controllers/books");

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log("error connection to MongoDB:", error.message);
	});

const typeDefs = `
  type Author {
	bookCount: Int!
	born: Int
	id: ID!
	name: String!
  }

  type Book {
	title: String!
	published: Int!
	author: Author!
	genres: [String!]!
	id: ID!
  }

  type User {
	favoriteGenre: String!
	id: ID!
	username: String!
  }

  type Token {
	value: String!
  }

  type Query {
	allAuthors: [Author!]!
	allBooks(author: String, genre: String): [Book!]!
	authorCount: Int!
	bookCount(author: String): Int!
	me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

	editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

	createUser(
	  username: String!
      favoriteGenre: String!
	): User

	login(
	  username: String!
	  password: String!
	): Token
  }
`;

const resolvers = {
	Query: {
		allAuthors: async () => {
			const books = await bookController.allBooks();
			const allAuthors = await authorController.allAuthors();
			const authors = [];

			for (let author of allAuthors) {
				author = author.toObject();

				const bookCount = books.filter(
					(book) => book.author.toString() === author._id.toString()
				).length;

				authors.push({ ...author, bookCount });
			}

			return authors;
		},
		allBooks: async (root, args) => {
			const allBooks = await bookController.allBooks();
			const books = [];
			const allAuthors = await authorController.allAuthors();
			const authors = [];

			for (let author of allAuthors) {
				author = author.toObject();

				const bookCount = books.filter(
					(book) => book.author.toString() === author._id.toString()
				).length;

				authors.push({ ...author, bookCount });
			}

			for (let book of allBooks) {
				book = book.toObject();

				const author = authors.find(
					(author) => author._id.toString() === book.author.toString()
				);

				books.push({ ...book, author });
			}

			let filteredBooks = [...books];

			if (args.author) {
				filteredBooks = filteredBooks.filter(
					(book) => book.author === args.author
				);
			}

			if (args.genre) {
				filteredBooks = filteredBooks.filter((book) =>
					book.genres.includes(args.genre)
				);
			}

			return filteredBooks;
		},
		authorCount: async () => {
			const authors = await authorController.allAuthors();

			return authors.length;
		},
		bookCount: async (root, args) => {
			const books = await bookController.allBooks();

			if (!args.author) {
				return books.length;
			}

			return books.filter((book) => book.author === args.author).length;
		},
		me: (root, args, context) => {
			return context.currentUser;
		},
	},
	Mutation: {
		addBook: async (root, args, context) => {
			if (!context.currentUser) {
				throw new GraphQLError("Unauthorized.", {
					extensions: {
						code: "UNAUTHORIZED",
					},
				});
			}

			const authors = await authorController.allAuthors();

			if (!authors.find((author) => author.name === args.author)) {
				const author = new Author({ name: args.author });

				try {
					await author.save();
				} catch (error) {
					throw new GraphQLError("Saving new author failed.", {
						extensions: {
							code: "BAD_USER_INPUT",
							invalidArgs: args,
							error,
						},
					});
				}
			}

			const allAuthors = await authorController.allAuthors();
			const author = allAuthors.find((author) => author.name === args.author);

			const book = new Book({
				...args,
				author: author._id,
			});

			try {
				await book.save();
			} catch (error) {
				throw new GraphQLError("Saving new book failed.", {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args,
						error,
					},
				});
			}

			return book;
		},
		editAuthor: async (root, args) => {
			if (!context.currentUser) {
				throw new GraphQLError("Unauthorized.", {
					extensions: {
						code: "UNAUTHORIZED",
					},
				});
			}

			const authors = await authorController.allAuthors();

			const author = authors.find((author) => author.name === args.name);

			if (!author) {
				return null;
			}

			const updatedAuthor = { ...author, born: args.setBornTo };

			try {
				await updatedAuthor.save();
			} catch (error) {
				throw new GraphQLError("Updating author failed.", {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args,
						error,
					},
				});
			}

			return updatedAuthor;
		},
		createUser: async (root, args) => {
			const user = new User({
				username: args.username,
				favoriteGenre: args.favoriteGenre,
			});

			try {
				await user.save();
			} catch (error) {
				throw new GraphQLError("Creating user failed.", {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args,
						error,
					},
				});
			}

			return user;
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			// any password is valid
			if (!user || !args.password) {
				throw new GraphQLError("Invalid credentials.");
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			};

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

startStandaloneServer(server, {
	listen: { port: 4000 },
	context: async ({ req, res }) => {
		try {
			const auth = req ? req.headers.authorization : null;

			if (auth && auth.startsWith("Bearer ")) {
				const decodedToken = jwt.verify(
					auth.substring(7),
					process.env.JWT_SECRET
				);

				const currentUser = await User.findById(decodedToken.id);
				return { currentUser };
			}
		} catch (error) {
			console.log(error);
			return null;
		}
	},
}).then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
