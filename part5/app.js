const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/auth");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const path = require("path");

mongoose.set("strictQuery", false);

logger.info("Connecting to:", config.MONGODB_URI);

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info("Connected to Atlas.");
	})
	.catch((error) => {
		logger.error(
			"Encountered an error while connecting to Atlas:",
			error.message
		);
	});

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);

app.use("/api/blogs", middleware.tokenExtractor, blogsRouter);
app.use("/api/blogs", middleware.userExtractor, blogsRouter);

app.use("/", blogsRouter);
app.use("/", usersRouter);
app.use("/", loginRouter);

if (process.env.NODE_ENV === "test") {
	const testingRouter = require("./controllers/testing");
	app.use("/api/testing", testingRouter);
}

app.use(express.static(path.join(__dirname, "build")));

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
