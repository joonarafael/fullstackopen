import { useContext } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, voteAnecdote } from "./requests";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import NotificationContext from "./providers/notificationcontext";

const App = () => {
	const queryClient = useQueryClient();
	const [notification, setNotification, notificationDispatch] =
		useContext(NotificationContext);

	const voteAnecdoteMutation = useMutation({
		mutationFn: (anecdote) => {
			voteAnecdote(anecdote.anecdote.id, {
				...anecdote.anecdote,
				votes: anecdote.anecdote.votes + 1,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
			notificationDispatch(setNotification("Anecdote voted successfully!"));
		},
	});

	const handleVote = (anecdote) => {
		voteAnecdoteMutation.mutate({ anecdote });
	};

	const result = useQuery({
		queryKey: ["anecdotes"],
		queryFn: getAnecdotes,
	});

	if (result.isLoading) {
		return <div>loading data...</div>;
	}

	if (result.isError) {
		return <div>servers down! please try again in a short while</div>;
	}

	const anecdotes = result.data;

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
