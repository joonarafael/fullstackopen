const Blog = require("../models/blog");

const { BLOGS } = require("./data/bloglist");

const nonExistingId = async () => {
	const blog = new Blog({ content: "dummy" });
	await blog.save();
	await blog.deleteOne();

	return blog._id.toString();
};

const blogsInDb = async () => {
	const notes = await Blog.find({});
	return notes.map((note) => note.toJSON());
};

module.exports = {
	BLOGS,
	nonExistingId,
	blogsInDb,
};
