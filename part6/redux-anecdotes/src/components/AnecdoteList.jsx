import { useSelector, useDispatch } from "react-redux";

import { voteAnecdote } from "../reducers/anecdoteReducer";
import { notificationChange } from "../reducers/notificationReducer";

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => state.anecdotes);
	const filter = useSelector((state) => state.filter);
	const dispatch = useDispatch();

	const vote = (id) => {
		dispatch(voteAnecdote(id));
		dispatch(notificationChange(`You voted anecdote with id: '${id}'`));
	};

	const filteredAnecdotes = anecdotes.filter((anecdote) =>
		anecdote.content.toLowerCase().includes(filter.toLowerCase())
	);

	const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes);

	return (
		<>
			{sortedAnecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
		</>
	);
};

export default AnecdoteList;
