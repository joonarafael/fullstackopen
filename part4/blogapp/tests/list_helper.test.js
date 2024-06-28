const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const { BLOGS } = require("./data/bloglist");

test("`dummy()` returns always one", () => {
	const blogs = [];

	const res = listHelper.dummy(blogs);
	assert.strictEqual(res, 1);
});

describe("`totalLikes` works as expected", () => {
	test("Return zero for empty list", () => {
		const res = listHelper.totalLikes([]);
		assert.strictEqual(res, 0);
	});

	test("Return correct like count for one blog", () => {
		const res = listHelper.totalLikes([BLOGS[0]]);
		assert.strictEqual(res, 7);
	});

	test("Return correct like count for the complete blog list.", () => {
		const res = listHelper.totalLikes(BLOGS);
		assert.strictEqual(res, 36);
	});
});

describe("`favoriteBlog` works as expected", () => {
	test("Return null for empty list", () => {
		const res = listHelper.favoriteBlog([]);
		assert.strictEqual(res, null);
	});

	test("Return correct blog from one selection", () => {
		const res = listHelper.favoriteBlog([BLOGS[0]]);

		assert.deepStrictEqual(res, {
			title: "React patterns",
			author: "Michael Chan",
			likes: 7,
		});
	});

	test("Return blog with the highest like count from the complete list.", () => {
		const res = listHelper.favoriteBlog(BLOGS);

		assert.deepStrictEqual(res, {
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			likes: 12,
		});
	});
});
