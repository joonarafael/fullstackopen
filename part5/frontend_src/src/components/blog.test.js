import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./blog";

jest.mock("../services/blogservice", () => ({
	addNew: jest.fn(),
}));

test("Only title rendered as a default", () => {
	const blog = {
		title: "Test Blog",
		user: {
			username: "test_user",
		},
		url: "href.com",
		likes: 3,
	};

	render(<Blog blog={blog} />);

	expect(screen.getByText("Test Blog")).toBeInTheDocument();

	const url = screen.queryByText("href.com");
	expect(url).toBeNull();

	const likes = screen.queryByText("likes: 3");
	expect(likes).toBeNull();
});

test("Blog post can be expanded and correct information is displayed", async () => {
	const blog = {
		title: "Test Blog",
		user: {
			username: "test_user",
		},
		url: "href.com",
		likes: 3,
	};

	render(<Blog blog={blog} />);

	expect(screen.getByText("Test Blog")).toBeInTheDocument();

	const expandButton = screen.getByText("Expand");
	await userEvent.click(expandButton);

	expect(screen.getByText("href.com")).toBeInTheDocument();
	expect(screen.getByText("likes: 3")).toBeInTheDocument();
});

test("Blog post can be liked and function is accurately called", async () => {
	const blog = {
		title: "Test Blog",
		user: {
			username: "test_user",
		},
		url: "href.com",
		likes: 3,
	};

	const handleLikeMock = jest.fn();

	render(<Blog blog={blog} handleLike={handleLikeMock} />);

	expect(screen.getByText("Test Blog")).toBeInTheDocument();

	const expandButton = screen.getByText("Expand");
	await userEvent.click(expandButton);

	const likeButton = screen.getByText("Like");
	await userEvent.click(likeButton);
	await userEvent.click(likeButton);

	expect(handleLikeMock).toHaveBeenCalledTimes(2);
});
