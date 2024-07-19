import NewAnecdote from "./components/NewAnecdote";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
	return (
		<div>
			<h2>Anecdotes</h2>
			<Notification />
			<Filter />
			<AnecdoteList />
			<h2>create new</h2>
			<NewAnecdote />
		</div>
	);
};

export default App;
