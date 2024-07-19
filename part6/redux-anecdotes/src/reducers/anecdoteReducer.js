import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		createAnecdote(state, action) {
			const content = action.payload;

			const anecdoteObject = {
				content,
				id: getId(),
				votes: 0,
			};

			anecdoteService.createAnecdote(anecdoteObject);

			state.push(anecdoteObject);
		},
		voteAnecdote(state, action) {
			const id = action.payload;
			const anecdoteToVote = state.find((a) => a.id === id);
			anecdoteToVote.votes += 1;

			anecdoteService.voteAnecdote(id, anecdoteToVote);
		},
		appendAnecdotes(state, action) {
			state.push(action.payload);
		},
		setAnecdotes(state, action) {
			return action.payload;
		},
	},
});

export const { createAnecdote, voteAnecdote, appendAnecdotes, setAnecdotes } =
	anecdoteSlice.actions;
export default anecdoteSlice.reducer;
