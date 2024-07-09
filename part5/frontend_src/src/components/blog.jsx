import { useState } from "react";

const Blog = (props) => {
	const [expand, setExpand] = useState(false);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "col",
				columnGap: "12px",
				border: "solid",
				borderWidth: 1,
			}}
		>
			<p>{props.blog.title}</p>
			{expand ? (
				<>
					<button
						onClick={() => {
							setExpand(false);
						}}
					>
						Minimize
					</button>
					<p>{props.blog.url}</p>
					<p>{props.blog.likes}</p>
					<p>{props.blog.author}</p>
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
