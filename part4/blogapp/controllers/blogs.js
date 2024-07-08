const blogsRouter = require("express").Router();
const Blog = require("../models/blog.js");

blogsRouter.get("/api/blogs", (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs);
	});
});

blogsRouter.post("/api/blogs", (request, response) => {
	const blog = new Blog(request.body);

	if (!blog.likes) {
		blog.likes = 0;
	}

	if (!blog.title || !blog.url) {
		return response.status(400).end();
	}

	blog.save().then((result) => {
		response.status(201).json(result);
	});
});

module.exports = blogsRouter;
