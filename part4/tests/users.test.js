const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const User = require("../models/user");

const app = require("../app");
const api = supertest(app);

let TOKEN;

beforeEach(async () => {
	await Blog.deleteMany({});
	await User.deleteMany({});

	const testUser = {
		username: "root",
		name: "Superuser",
		password: "admin",
	};

	await api.post("/api/users").send(testUser);
	const res = await api.post("/api/auth/login").send(testUser);

	TOKEN = res.body.token;
});

describe("Basic API routes are working", async () => {
	test("Test GET `/api/users`", async () => {
		const res = await api
			.get("/api/users")
			.set("Authorization", `Bearer ${TOKEN}`);

		assert.strictEqual(res.status, 200);
		assert.strictEqual(res.body.length, 1);
	});

	test("Test creating a new user", async () => {
		const user = {
			username: "testUser",
			name: "Test User",
			password: "test123",
		};

		const res = await api.post("/api/users").send(user);

		assert.strictEqual(res.status, 201);
	});

	test("Prohibit creation of a user with an username already in use", async () => {
		const user = {
			username: "root",
			name: "Superuser",
			password: "admin",
		};

		const res = await api.post("/api/users").send(user);

		assert.strictEqual(res.status, 400);
	});

	test("Prohibit creation of a user with an invalid username", async () => {
		const user = {
			username: "ab",
			name: "Test User",
			password: "test123",
		};

		const res = await api.post("/api/users").send(user);

		assert.strictEqual(res.status, 400);
	});

	test("Prohibit creation of a user with an invalid password", async () => {
		const user = {
			username: "testUser",
			name: "Test User",
			password: "ab",
		};

		const res = await api.post("/api/users").send(user);

		assert.strictEqual(res.status, 400);
	});
});

after(async () => {
	await Blog.deleteMany({});
	await User.deleteMany({});

	await mongoose.connection.close();
});
