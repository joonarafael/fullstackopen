import recordService from "../services/blogservice";

const Blogs = (props) => {
	if (props.blogs && props.blogs.length > 0) {
		return (
			<div>
				{props.blogs.map((blog) => (
					<div
						key={blog.id}
						style={{
							display: "flex",
							columnGap: "12px",
						}}
					>
						<p>
							{blog.title} {blog.author}
						</p>
						<p>
							{blog.url} {blog.user.username}
						</p>
					</div>
				))}
			</div>
		);
	}

	return null;
};

export default Blogs;
