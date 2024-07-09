import { useEffect, useState } from "react";
import AddNewForm from "./components/addnewform";
import LoginForm from "./components/loginform";
import Blogs from "./components/blogs";
import Notification from "./components/notification";

import blogService from "./services/blogservice";

const App = () => {
	const [user, setUser] = useState(null);
	const [blogs, setBlogs] = useState(null);
	const [notification, setNotification] = useState({
		status: "success",
		message: "",
	});

	useEffect(() => {
		const userFromLS = localStorage.getItem("user");

		if (userFromLS && userFromLS.length > 0) {
			setUser(JSON.parse(localStorage.getItem("user")));
		}
	}, []);

	useEffect(() => {
		const fetchBlogs = async () => {
			const blogsResponse = await blogService.getAll();

			if (blogsResponse) {
				setBlogs(blogsResponse);
			} else {
				setNotification({
					status: "error",
					message: "Failed to fetch blogs",
				});
			}
		};

		fetchBlogs();
	}, [user]);

	if (!user) {
		return (
			<div>
				<h2>Blogs</h2>
				<Notification
					status={notification.status}
					message={notification.message}
				/>
				<h2>Log in</h2>
				<LoginForm setNotification={setNotification} />
			</div>
		);
	}

	return (
		<div>
			<h2>Blogs</h2>
			<p>Logged in as {user.name}</p>
			<button
				onClick={() => {
					localStorage.removeItem("user");
					window.open("/", "_self");
				}}
			>
				Log out
			</button>
			<Notification
				status={notification.status}
				message={notification.message}
			/>
			<AddNewForm setNotification={setNotification} />
			<Blogs blogs={blogs} />
		</div>
	);
};

export default App;
