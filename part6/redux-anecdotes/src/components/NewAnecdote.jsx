import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const NewAnecdote = (props) => {
	const dispatch = useDispatch();

	const addAnecdote = (event) => {
		event.preventDefault();
		const content = event.target.note.value;
		event.target.note.value = "";
		dispatch(createAnecdote(content));
	};

	return (
		<form onSubmit={addAnecdote}>
			<input name="note" />
			<button type="submit">create</button>
		</form>
	);
};

export default NewAnecdote;
