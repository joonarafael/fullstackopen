import axios from "axios";

const BASE_URL = "http://localhost:3001";

const getAll = async () => {
	const user = JSON.parse(localStorage.getItem("user"));
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
	const user = JSON.parse(localStorage.getItem("user"));
	const token = user.token;

	try {
		const response = await axios.post(`${BASE_URL}/api/blogs`, blog, {
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

export default { getAll, addNew };
