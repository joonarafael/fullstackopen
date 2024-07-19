import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { notificationChange } from "../reducers/notificationReducer";

const NewAnecdote = (props) => {
	const dispatch = useDispatch();

	const addAnecdote = (event) => {
		event.preventDefault();
		const content = event.target.note.value;
		event.target.note.value = "";
		dispatch(createAnecdote(content));
		dispatch(notificationChange(`You added new anecdote: '${content}'`));
	};

	return (
		<form onSubmit={addAnecdote}>
			<input name="note" />
			<button type="submit">create</button>
		</form>
	);
};

export default NewAnecdote;
