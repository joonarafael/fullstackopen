import { useState } from "react";

import authService from "../services/authservice";

const LoginForm = (props) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (event) => {
		event.preventDefault();

		if (!username || !password) {
			alert("Please enter both username and password");
			return;
		}

		const credentials = {
			username,
			password,
		};

		const res = await authService.login(credentials);

		if (res && res.token) {
			localStorage.setItem("user", JSON.stringify(res));

			window.open("/", "_self");
		} else {
			props.setNotification({
				status: "error",
				message: "Login failed. Please check your credentials.",
			});
		}
	};

	return (
		<form onSubmit={handleLogin}>
			<div>
				username:{" "}
				<input value={username} onChange={(e) => setUsername(e.target.value)} />
			</div>
			<div>
				password:{" "}
				<input value={password} onChange={(e) => setPassword(e.target.value)} />
			</div>
			<div>
				<button type="submit">login</button>
			</div>
		</form>
	);
};

export default LoginForm;
