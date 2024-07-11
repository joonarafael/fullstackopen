import { useState } from "react";

const Blog = (props) => {
	const [expand, setExpand] = useState(false);

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
								props.handleLike(props.blog);
							}}
						>
							Like
						</button>
					</div>
					{props.username && props.blog.user.username === props.username && (
						<button
							onClick={() => {
								props.handleDelete(props.blog);
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
