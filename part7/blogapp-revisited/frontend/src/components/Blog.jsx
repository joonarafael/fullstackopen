import React, { useState } from "react";
import PropTypes from "prop-types";
import storage from "../services/storage";

import { Button } from "react-bootstrap";

const Blog = ({ blog, handleVote, handleDelete }) => {
	const [visible, setVisible] = useState(false);

	const nameOfUser = blog.user ? blog.user.name : "anonymous";

	const style = {
		border: "solid",
		padding: 10,
		borderWidth: 1,
		marginBottom: 5,
		display: "flex",
		flexDirection: "column",
		gap: "0.5rem",
	};

	const canRemove = blog.user ? blog.user.username === storage.me() : true;

	console.log(blog.user, storage.me(), canRemove);

	return (
		<div style={style} className="blog">
			{blog.title} by {blog.author}
			<Button variant="outline-primary" onClick={() => setVisible(!visible)}>
				{visible ? "hide" : "view"}
			</Button>
			{visible && (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "0.5rem",
					}}
				>
					<div>
						<a href={blog.url}>{blog.url}</a>
					</div>
					<div>
						likes {blog.likes}
						<Button style={{ marginLeft: 3 }} onClick={() => handleVote(blog)}>
							like
						</Button>
					</div>
					<div>{nameOfUser}</div>
					{canRemove && (
						<Button variant="outline-danger" onClick={() => handleDelete(blog)}>
							remove
						</Button>
					)}
				</div>
			)}
		</div>
	);
};

Blog.propTypes = {
	blog: PropTypes.shape({
		url: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		likes: PropTypes.number.isRequired,
		user: PropTypes.object,
	}).isRequired,
	handleVote: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
};

export default Blog;
