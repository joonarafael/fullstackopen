import { createContext, useReducer, useEffect } from "react";

const blogReducer = (state, action) => {
	switch (action.type) {
		case "SET_BLOGS":
			return action.payload;
		default:
			return state;
	}
};

export const setBlogs = (blogs) => {
	return {
		type: "SET_BLOGS",
		payload: blogs,
	};
};

const BlogContext = createContext([]);

export const BlogContextProvider = (props) => {
	const [blogs, blogsDispatch] = useReducer(blogReducer, []);

	return (
		<BlogContext.Provider value={[blogs, setBlogs, blogsDispatch]}>
			{props.children}
		</BlogContext.Provider>
	);
};

export default BlogContext;
