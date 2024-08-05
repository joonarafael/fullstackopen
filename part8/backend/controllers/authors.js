const Author = require("../models/author");

const allAuthors = async () => {
	const res = await Author.find({});

	if (!res) {
		console.log("No authors found.");
		return [];
	}

	return res;
};

module.exports = { allAuthors };
