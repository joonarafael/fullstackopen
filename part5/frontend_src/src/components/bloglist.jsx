import Blog from "./blog";

import blogService from "../services/blogservice";

const BlogList = (props) => {
	const handleLike = async (blog) => {
		const res = await blogService.likeBlog(blog);
	};

	const handleDelete = async (blog) => {
		const areYouSure = window.confirm(
			"Are you sure you wish to delete this blog?"
		);

		if (areYouSure) {
			const res = await blogService.deleteBlog(blog);

			if (res) {
				window.location.reload();
			}
		}
	};

	const user = JSON.parse(window.localStorage.getItem("user"));
	const username = user?.username ?? null;

	if (props.blogs && props.blogs.length > 0) {
		return (
			<div>
				{props.blogs.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
						handleLike={handleLike}
						handleDelete={handleDelete}
						username={username}
					/>
				))}
			</div>
		);
	}

	return null;
};

export default BlogList;
