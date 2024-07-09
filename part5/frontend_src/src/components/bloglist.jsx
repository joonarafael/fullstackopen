import Blog from "./blog";

const BlogList = (props) => {
	if (props.blogs && props.blogs.length > 0) {
		return (
			<div>
				{props.blogs.map((blog) => (
					<Blog key={blog.id} blog={blog} />
				))}
			</div>
		);
	}

	return null;
};

export default BlogList;
