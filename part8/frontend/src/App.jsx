import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommend from "./components/Recommend";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client";

const App = () => {
	const [token, setToken] = useState(null);
	const [page, setPage] = useState("authors");
	const client = useApolloClient();

	useEffect(() => {
		const userToken = localStorage.getItem("userToken");
		if (userToken) {
			setToken(userToken);
		}
	}, []);

	useEffect(() => {
		setPage("authors");
	}, [token]);

	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
		setPage("authors");
	};

	return (
		<div>
			<div>
				<button onClick={() => setPage("authors")}>authors</button>
				<button onClick={() => setPage("books")}>books</button>
				{token ? (
					<>
						<button onClick={() => setPage("add")}>add book</button>
						<button onClick={() => setPage("recommend")}>recommend</button>
						<button
							onClick={() => {
								logout();
							}}
						>
							logout
						</button>
					</>
				) : (
					<button onClick={() => setPage("login")}>login</button>
				)}
			</div>
			<Authors show={page === "authors"} />
			<Books show={page === "books"} />
			{token ? (
				<>
					<NewBook show={page === "add"} />
					<Recommend show={page === "recommend"} />
				</>
			) : (
				<LoginForm show={page === "login"} setToken={setToken} />
			)}
		</div>
	);
};

export default App;
