const logger = require("../utils/logger");

const favoriteBlog = (blogs) => {
	if (!blogs || blogs.length === 0) {
		return null;
	}

	try {
		const mostLikes = Math.max(...blogs.map((blog) => blog.likes));
		const favorite = blogs.find((blog) => blog.likes === mostLikes);

		return {
			title: favorite.title,
			author: favorite.author,
			likes: favorite.likes,
		};
	} catch (error) {
		logger.error(
			"Encountered an error while determining the favorite blog:",
			error.message
		);
	}
};

const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	if (!blogs || blogs.length === 0) {
		return 0;
	}

	let res = 0;

	try {
		res = blogs.reduce((sum, blog) => sum + blog.likes, 0);
	} catch (error) {
		logger.error(
			"Encountered an error while calculating total likes:",
			error.message
		);
	}

	return res;
};

const mostBlogs = (blogs) => {
	if (!blogs || blogs.length === 0) {
		return null;
	}

	let res = null;

	try {
		const authors = blogs.map((blog) => blog.author);

		const author = authors.reduce((acc, curr) => {
			acc[curr] = (acc[curr] || 0) + 1;
			return acc;
		}, {});

		const mostBlogs = Math.max(...Object.values(author));

		const mostBlogsAuthor = Object.keys(author).find(
			(key) => author[key] === mostBlogs
		);

		res = {
			author: mostBlogsAuthor,
			blogs: mostBlogs,
		};
	} catch (error) {
		logger.error(
			"Encountered an error while determining author with the most blogs:",
			error.message
		);
	}

	return res;
};

const mostLikes = (blogs) => {
	if (!blogs || blogs.length === 0) {
		return null;
	}

	let res = null;

	try {
		const authors = blogs.map((blog) => blog.author);

		const author = authors.reduce((acc, curr) => {
			acc[curr] = acc[curr] || 0;
			return acc;
		}, {});

		for (const blog of blogs) {
			author[blog.author] += blog.likes;
		}

		const mostLikes = Math.max(...Object.values(author));

		const mostLikesAuthor = Object.keys(author).find(
			(key) => author[key] === mostLikes
		);

		res = {
			author: mostLikesAuthor,
			likes: mostLikes,
		};
	} catch (error) {
		logger.error(
			"Encountered an error while determining author with the most likes:",
			error.message
		);
	}

	return res;
};

module.exports = {
	dummy,
	favoriteBlog,
	mostBlogs,
	mostLikes,
	totalLikes,
};
