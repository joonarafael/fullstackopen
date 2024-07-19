import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = (newAnecdote) =>
	axios.post(baseUrl, { ...newAnecdote, votes: 0 }).then((res) => res.data);

export const voteAnecdote = (id, newAnecdote) =>
	axios.put(`${baseUrl}/${id}`, newAnecdote).then((res) => res.data);
