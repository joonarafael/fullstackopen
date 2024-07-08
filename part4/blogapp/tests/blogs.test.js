const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const app = require("../app");
const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});

	await Blog.insertMany(helper.BLOGS);
});

describe("Basic API routes are working", async () => {
	test("Test GET `/api/blogs`", async () => {
		const res = await api.get("/api/blogs");

		assert.strictEqual(res.status, 200);
		assert.strictEqual(res.body.length, helper.BLOGS.length);
	});

	test("Ensure ID fields are present for blog posts", async () => {
		const res = await api.get("/api/blogs");

		assert.strictEqual(res.status, 200);

		res.body.forEach((blog) => {
			assert.ok(blog.id);
		});
	});

	test("Test adding a new blog", async () => {
		const blog = {
			author: "John Doe",
			title: "A new blog",
			url: "https://example.com",
			likes: 1,
		};

		let res = await api.post("/api/blogs").send(blog);

		assert.strictEqual(res.status, 201);

		res = await api.get("/api/blogs");

		assert.strictEqual(res.status, 200);
		assert.strictEqual(res.body.length, helper.BLOGS.length + 1);
	});

	test("Test removing a blog", async () => {
		let res = await api.get("/api/blogs");

		const blogIdToRemove = res.body[0].id;

		res = await api.delete(`/api/blogs/${blogIdToRemove}`);

		assert.strictEqual(res.status, 200);
	});

	test("Test updating a blog", async () => {
		let res = await api.get("/api/blogs");

		const blogIdToUpdate = res.body[0].id;

		const newBlog = {
			author: "John Doe Updated",
			title: "An updated blog",
			url: "https://www.example.com",
			likes: 3,
		};

		res = await api.put(`/api/blogs/${blogIdToUpdate}`).send(newBlog);

		assert.strictEqual(res.status, 200);
	});

	test("Blog like count is initialized to 0 if not provided", async () => {
		const blog = {
			author: "John Doe",
			title: "Another new blog",
			url: "https://example.com",
		};

		const res = await api.post("/api/blogs").send(blog);

		assert.strictEqual(res.status, 201);
		assert.strictEqual(res.body.likes, 0);
	});

	test("Blog post is rejected if no title or URL is provided", async () => {
		let blog = {
			author: "John Doe",
			url: "https://example.com",
		};

		let res = await api.post("/api/blogs").send(blog);

		assert.strictEqual(res.status, 400);

		blog = {
			url: "https://example.com",
		};

		res = await api.post("/api/blogs").send(blog);

		assert.strictEqual(res.status, 400);

		blog = {
			title: "Yet Another Blog",
		};

		res = await api.post("/api/blogs").send(blog);

		assert.strictEqual(res.status, 400);

		res = await api.get("/api/blogs");

		assert.strictEqual(res.status, 200);
		assert.strictEqual(res.body.length, helper.BLOGS.length);
	});
});

after(async () => {
	await Blog.deleteMany({});

	await mongoose.connection.close();
});
