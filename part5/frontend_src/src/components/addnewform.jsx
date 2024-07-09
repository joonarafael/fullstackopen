import { useState } from "react";

import blogService from "../services/blogservice";

const AddNewForm = (props) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const addBlog = async (event) => {
		event.preventDefault();

		if (!title || !url) {
			alert("Please enter a title and an URL.");
			return;
		}

		const blogObject = {
			title,
			author,
			url,
		};

		const res = await blogService.addNew(blogObject);

		if (res) {
			props.setNotification({
				status: "success",
				message: "Blog post added!",
			});
		} else {
			props.setNotification({
				status: "error",
				message: "Encountered an error, blog post not added.",
			});
		}
	};

	return (
		<form onSubmit={addBlog}>
			<div>
				title:{" "}
				<input value={title} onChange={(e) => setTitle(e.target.value)} />
			</div>
			<div>
				author:{" "}
				<input value={author} onChange={(e) => setAuthor(e.target.value)} />
			</div>
			<div>
				url: <input value={url} onChange={(e) => setUrl(e.target.value)} />
			</div>
			<div>
				<button type="submit">create</button>
			</div>
		</form>
	);
};

export default AddNewForm;
