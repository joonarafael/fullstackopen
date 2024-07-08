const blogsRouter = require("express").Router();
const logger = require("../utils/logger");
const Blog = require("../models/blog.js");

blogsRouter.get("/api/blogs", async (request, response) => {
	try {
		const res = await Blog.find({}).populate("users", {
			username: 1,
			name: 1,
			id: 1,
		});

		response.json(res);
	} catch (err) {
		logger.error(`Couldn't fetch users: ${err}`);

		return response.status(500).json({ error: "Something went wrong! " });
	}
});

blogsRouter.post("/api/blogs", (request, response) => {
	const blog = new Blog(request.body);

	if (!blog.likes) {
		blog.likes = 0;
	}

	if (!blog.title || !blog.url) {
		return response.status(400).json({ error: "Title or URL missing!" });
	}

	blog.save().then((result) => {
		response.status(201).json(result);
	});
});

blogsRouter.put("/api/blogs/:id", async (request, response) => {
	const id = request.params.id;
	const { title, author, url, likes } = request.body;

	if (!id) {
		return response.status(400).json({ error: "ID missing!" });
	}

	try {
		await Blog.findByIdAndUpdate(id, { title, author, url, likes });

		return response.status(200).end();
	} catch (err) {
		logger.error(`Blog updating unsuccessful: ${err}`);

		return response.status(500).json({ error: "Something went wrong! " });
	}
});

blogsRouter.delete("/api/blogs/:id", async (request, response) => {
	const id = request.params.id;

	try {
		await Blog.findByIdAndDelete(id);

		return response.status(200).end();
	} catch (err) {
		logger.error(`Blog deletion unsuccessful: ${err}`);

		return response.status(500).json({ error: "Something went wrong! " });
	}
});

module.exports = blogsRouter;
