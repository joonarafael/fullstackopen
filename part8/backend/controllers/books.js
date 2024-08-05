const Book = require("../models/book");

const allBooks = async () => {
	const res = await Book.find({});

	if (!res) {
		console.log("No books found.");
		return [];
	}

	return res;
};

module.exports = { allBooks };
