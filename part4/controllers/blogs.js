const blogsRouter = require("express").Router();
const logger = require("../utils/logger");
const Blog = require("../models/blog.js");

blogsRouter.get("/api/blogs", async (request, response) => {
	try {
		const res = await Blog.find({}).populate("user", {
			username: 1,
			name: 1,
			id: 1,
		});

		return response.status(200).json(res);
	} catch (err) {
		logger.error(`Couldn't fetch blogs: ${err}`);

		return response.status(500).json({ error: "Something went wrong!" });
	}
});

blogsRouter.post("/api/blogs", async (request, response) => {
	try {
		const user = request.user;

		const blog = new Blog(request.body);
		blog.user = user._id;

		if (!blog.user) {
			return response.status(401).json({ error: "Unauthorized." });
		}

		if (!blog.likes) {
			blog.likes = 0;
		}

		if (!blog.title || !blog.url) {
			return response.status(400).json({ error: "Title or URL missing!" });
		}

		const res = await blog.save();

		return response.status(201).json(res);
	} catch (err) {
		logger.error(`Couldn't post a new blog: ${err}`);

		return response.status(500).json({ error: "Something went wrong!" });
	}
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

		return response.status(500).json({ error: "Something went wrong!" });
	}
});

blogsRouter.delete("/api/blogs/:id", async (request, response) => {
	const id = request.params.id;
	const user = request.user;

	if (!id) {
		return response.status(400).json({ error: "ID missing!" });
	}

	if (!user) {
		return response.status(401).json({ error: "Unauthorized." });
	}

	try {
		const blog = await Blog.findById(id);

		console.log("pissing myself", blog);

		if (!blog) {
			return response.status(404).json({ error: "Invalid blog ID!" });
		}

		if (blog.user.toString() !== user._id.toString()) {
			return response.status(401).json({ error: "Unauthorized." });
		}

		await Blog.findByIdAndDelete(id);

		return response.status(200).end();
	} catch (err) {
		logger.error(`Blog deletion unsuccessful: ${err}`);

		return response.status(500).json({ error: "Something went wrong!" });
	}
});

module.exports = blogsRouter;
