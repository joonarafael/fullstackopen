import { forwardRef, useState, useImperativeHandle } from "react";

import blogService from "../services/blogservice";

const AddNewForm = forwardRef((props, ref) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");
	const [hideComponent, setHideComponent] = useState(true);

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

			setHideComponent(true);
		} else {
			props.setNotification({
				status: "error",
				message: "Encountered an error, blog post not added.",
			});
		}
	};

	useImperativeHandle(ref, () => {
		return { hideComponent, setHideComponent };
	});

	if (hideComponent) {
		return null;
	}

	return (
		<>
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
					<button type="submit">Create</button>
				</div>
			</form>
			<button
				type="button"
				onClick={() => {
					setHideComponent(true);
				}}
			>
				Cancel
			</button>
		</>
	);
});

export default AddNewForm;
