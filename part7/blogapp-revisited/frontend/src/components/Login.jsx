import { useState } from "react";

import { Form, Button } from "react-bootstrap";

const Login = ({ doLogin }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (event) => {
		event.preventDefault();
		doLogin({ username, password });
		setUsername("");
		setPassword("");
	};

	return (
		<Form onSubmit={handleLogin}>
			<Form.Group>
				<Form.Label>Username:</Form.Label>
				<Form.Control
					type="text"
					data-testid="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Password:</Form.Label>
				<Form.Control
					type="password"
					value={password}
					data-testid="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</Form.Group>
			<Button type="submit" value="Login">
				Login
			</Button>
		</Form>
	);
};

export default Login;
