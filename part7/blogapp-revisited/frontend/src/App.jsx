import { useState, useEffect, createRef, useContext } from "react";
import NotificationContext from "./providers/notificationcontext";
import BlogContext from "./providers/blogcontext";
import blogService from "./services/blogs";
import loginService from "./services/login";
import storage from "./services/storage";
import Login from "./components/Login";
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { Table, Button } from "react-bootstrap";

const App = () => {
	const [user, setUser] = useState(null);
	const [notification, setNotification, notificationDispatch] =
		useContext(NotificationContext);
	const [blogs, setBlogs, blogsDispatch] = useContext(BlogContext);

	useEffect(() => {
		blogService.getAll().then((blogs) => blogsDispatch(setBlogs(blogs)));
	}, []);

	useEffect(() => {
		const user = storage.loadUser();
		if (user) {
			setUser(user);
		}
	}, []);

	const blogFormRef = createRef();

	const notify = (message, type = "success") => {
		notificationDispatch(setNotification({ message, type }));
	};

	const handleLogin = async (credentials) => {
		try {
			const user = await loginService.login(credentials);
			setUser(user);
			storage.saveUser(user);
			notify(`Welcome back, ${user.name}`);
		} catch (error) {
			notify("Wrong credentials", "error");
		}
	};

	const handleCreate = async (blog) => {
		const newBlog = await blogService.create(blog);
		blogsDispatch(setBlogs(blogs.concat(newBlog)));
		notify(`Blog created: ${newBlog.title}, ${newBlog.author}`);
		blogFormRef.current.toggleVisibility();
	};

	const handleVote = async (blog) => {
		console.log("updating", blog);
		const updatedBlog = await blogService.update(blog.id, {
			...blog,
			likes: blog.likes + 1,
		});

		notify(`You liked ${updatedBlog.title} by ${updatedBlog.author}`);
		blogsDispatch(
			setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)))
		);
	};

	const handleLogout = () => {
		setUser(null);
		storage.removeUser();
		notify(`Bye, ${user.name}!`);
	};

	const handleDelete = async (blog) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			await blogService.remove(blog.id);
			blogsDispatch(setBlogs(blogs.filter((b) => b.id !== blog.id)));
			notify(`Blog ${blog.title}, by ${blog.author} removed`);
		}
	};

	if (!user) {
		return (
			<div>
				<h2>blogs</h2>
				<Notification notification={notification} />
				<Login doLogin={handleLogin} />
			</div>
		);
	}

	const byLikes = (a, b) => b.likes - a.likes;

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "1rem",
			}}
		>
			<h2>blogs</h2>
			<Notification notification={notification} />
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					gap: "0.25rem",
					alignItems: "center",
				}}
			>
				{user.name} logged in
				<Button variant="outline-primary" onClick={handleLogout}>
					logout
				</Button>
			</div>
			<Togglable buttonLabel="create new blog" ref={blogFormRef}>
				<NewBlog doCreate={handleCreate} />
			</Togglable>
			<Table striped>
				<tbody>
					{blogs.sort(byLikes).map((blog) => (
						<tr key={blog.id}>
							<Blog
								key={blog.id}
								blog={blog}
								handleVote={handleVote}
								handleDelete={handleDelete}
							/>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default App;
