import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./App";

import anecdoteReducer, { setAnecdotes } from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";
import notificationMiddleware from "./reducers/notificationMiddleware";

import anecdoteService from "./services/anecdotes";

const store = configureStore({
	reducer: {
		anecdotes: anecdoteReducer,
		filter: filterReducer,
		notification: notificationReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(notificationMiddleware),
});

anecdoteService
	.getAll()
	.then((anecdotes) => store.dispatch(setAnecdotes(anecdotes)));

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<App />
	</Provider>
);
