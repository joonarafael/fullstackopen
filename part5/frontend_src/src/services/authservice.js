import axios from "axios";

const BASE_URL = "http://localhost:3001";

const login = async (credentials) => {
	try {
		const response = await axios.post(
			`${BASE_URL}/api/auth/login`,
			credentials
		);

		return response.data ?? null;
	} catch (err) {
		console.log("Run into an error while logging in:", err);
		return null;
	}
};

export default { login };
