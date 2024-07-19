import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import NotificationContext from "../providers/notificationcontext";
import { createAnecdote } from "../requests";

const AnecdoteForm = () => {
	const queryClient = useQueryClient();
	const [notification, setNotification, notificationDispatch] =
		useContext(NotificationContext);

	const newAnecdoteMutation = useMutation({
		mutationFn: createAnecdote,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
		},
	});

	const onCreate = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;

		newAnecdoteMutation.mutate({ content, important: true });
		notificationDispatch(setNotification("Anecdote created successfully!"));
		event.target.anecdote.value = "";
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
