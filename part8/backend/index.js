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
require("dotenv").config();

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

let authors = [];

let books = [];

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

  type Query {
	allAuthors: [Author!]!
	allBooks(author: String, genre: String): [Book!]!
	authorCount: Int!
	bookCount(author: String): Int!
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
  }
`;

const resolvers = {
	Query: {
		allAuthors: () => {
			return authors.map((author) => {
				const bookCount = books.filter(
					(book) => book.author === author.name
				).length;
				return { ...author, bookCount };
			});
		},
		allBooks: (root, args) => {
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
		authorCount: () => authors.length,
		bookCount: (root, args) => {
			if (!args.author) {
				return books.length;
			}

			return books.filter((book) => book.author === args.author).length;
		},
	},
	Mutation: {
		addBook: (root, args) => {
			console.log(authors);
			if (!authors.find((author) => author.name === args.author)) {
				authors = authors.concat({ name: args.author });

				const author = new Author({ name: args.author, bookCount: 0 });
				author.save();
			}

			const author = authors.find((author) => author.name === args.author);

			console.log(author);

			const book = new Book({
				...args,
				id: uuid(),
				author: author.id,
			});

			console.log(book);

			book.save();

			books = books.concat(book);

			return book;
		},
		editAuthor: (root, args) => {
			const author = authors.find((author) => author.name === args.name);

			if (!author) {
				return null;
			}

			const updatedAuthor = { ...author, born: args.setBornTo };

			authors = authors.map((author) =>
				author.name === args.name ? updatedAuthor : author
			);

			return updatedAuthor;
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

startStandaloneServer(server, {
	listen: { port: 4000 },
}).then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
