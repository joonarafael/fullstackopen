const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requestLogger = (request, response, next) => {
	logger.info("Method:", request.method);
	logger.info("Path:  ", request.path);
	logger.info("Body:  ", request.body);
	logger.info("---");
	next();
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "Unknown endpoint!" });
};

const errorHandler = (error, request, response, next) => {
	logger.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "Malformatted ID." });
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message });
	}

	next(error);
};

const tokenExtractor = (request, response, next) => {
	const authorization = request.get("authorization");

	request.token =
		authorization && authorization.toLowerCase().startsWith("bearer ")
			? authorization.substring(7)
			: null;

	if (!request.token) {
		return response.status(401).json({ error: "Token missing or invalid." });
	}

	next();
};

const userExtractor = async (request, response, next) => {
	const token = request.token;
	const decodedToken = jwt.verify(token, process.env.SECRET);

	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: "Token missing or invalid." });
	}

	request.user = await User.findById(decodedToken.id);

	if (!request.user) {
		return response.status(401).json({ error: "Token missing or invalid." });
	}

	next();
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor,
};
