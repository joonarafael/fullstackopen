import { useState } from "react";
import blogService from "../services/blogservice";

const Blog = (props) => {
	const [expand, setExpand] = useState(false);

	const handleLike = async () => {
		const res = await blogService.likeBlog(props.blog);
	};

	const handleDelete = async () => {
		const areYouSure = window.confirm(
			"Are you sure you wish to delete this blog?"
		);

		if (areYouSure) {
			const res = await blogService.deleteBlog(props.blog);

			if (res) {
				window.location.reload();
			}
		}
	};

	const user = JSON.parse(window.localStorage.getItem("user"));
	const username = user.username;

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				columnGap: "12px",
				border: "solid",
				borderWidth: 1,
			}}
		>
			<p>
				<strong>{props.blog.title}</strong>
			</p>
			{expand ? (
				<>
					<button
						onClick={() => {
							setExpand(false);
						}}
					>
						Minimize
					</button>
					<p>
						<em>{props.blog.author}</em>
					</p>
					<p>{props.blog.url}</p>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
						}}
					>
						<p>likes: {props.blog.likes}</p>
						<button
							onClick={() => {
								handleLike();
							}}
						>
							Like
						</button>
					</div>
					{props.blog.user.username === username && (
						<button
							onClick={() => {
								handleDelete();
							}}
						>
							Delete blog
						</button>
					)}
				</>
			) : (
				<button
					onClick={() => {
						setExpand(true);
					}}
				>
					Expand
				</button>
			)}
		</div>
	);
};

export default Blog;
