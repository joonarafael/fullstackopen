import axios from "axios";

const BASE_URL = "http://localhost:3001";

const getAll = async () => {
	const user = JSON.parse(window.localStorage.getItem("user"));
	const token = user.token;

	try {
		const response = await axios.get(`${BASE_URL}/api/blogs`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (err) {
		console.log("Run into an error while fetching all blogs:", err);

		return null;
	}
};

const addNew = async (blog) => {
	const user = JSON.parse(window.localStorage.getItem("user"));
	const token = user.token;

	try {
		const response = await axios.post(`${BASE_URL}/api/blogs`, blog, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (err) {
		console.log("Run into an error while adding a new blog:", err);

		return null;
	}
};

const likeBlog = async (blog) => {
	const user = JSON.parse(window.localStorage.getItem("user"));
	const token = user.token;

	const blogId = blog.id;
	blog.likes = blog.likes + 1;

	try {
		const response = await axios.put(`${BASE_URL}/api/blogs/${blogId}`, blog, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (err) {
		console.log("Run into an error while liking the blog:", err);

		return null;
	}
};

const deleteBlog = async (blog) => {
	const user = JSON.parse(window.localStorage.getItem("user"));
	const token = user.token;

	const blogId = blog.id;

	try {
		const response = await axios.delete(`${BASE_URL}/api/blogs/${blogId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (err) {
		console.log("Run into an error while deleting the blog:", err);

		return null;
	}
};

export default { getAll, addNew, likeBlog, deleteBlog };
