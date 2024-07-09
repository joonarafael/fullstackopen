const usersRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const logger = require("../utils/logger");
const User = require("../models/user.js");

usersRouter.get("/api/users", async (request, response) => {
	try {
		const res = await User.find({})
			.select("username name _id")
			.populate("blogs", {
				title: 1,
				author: 1,
				url: 1,
				likes: 1,
				id: 1,
			});

		response.json(res);
	} catch (err) {
		logger.error(`Couldn't fetch users: ${err}`);

		return response.status(500).json({ error: "Something went wrong! " });
	}
});

usersRouter.post("/api/users", async (request, response) => {
	try {
		const { username, name, password } = request.body;

		if (!username || !name || !password) {
			return response
				.status(400)
				.json({ error: "Username, name, or password missing!" });
		}

		if (password.length < 3) {
			return response
				.status(400)
				.json({ error: "Password must be at least 3 characters long!" });
		}

		if (username.length < 3) {
			return response
				.status(400)
				.json({ error: "Username must be at least 3 characters long!" });
		}

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const user = new User({
			username,
			name,
			hashedPassword,
		});

		const res = await user.save();

		response.status(201).json(res);
	} catch (err) {
		logger.error(`User creation unsuccessful: ${err}`);

		if (err.code === 11000) {
			return response.status(400).json({ error: "Username already in use!" });
		}

		return response.status(500).json({ error: "Something went wrong! " });
	}
});

module.exports = usersRouter;
