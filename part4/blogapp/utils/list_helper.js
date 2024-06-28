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

module.exports = {
	favoriteBlog,
	dummy,
	totalLikes,
};
