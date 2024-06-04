import { useState } from "react";
import Search from "./components/search";
import AddNewForm from "./components/addnewform";
import Persons from "./components/persons";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456" },
		{ name: "Ada Lovelace", number: "39-44-5323523" },
		{ name: "Dan Abramov", number: "12-43-234345" },
		{ name: "Mary Poppendieck", number: "39-23-6423122" },
	]);
	const [searchValue, setSearchValue] = useState("");

	return (
		<div>
			<h2>Phonebook</h2>
			<Search searchValue={searchValue} setSearchValue={setSearchValue} />
			<h2>Add a new</h2>
			<AddNewForm persons={persons} setPersons={setPersons} />
			<h2>Numbers</h2>
			<Persons persons={persons} searchValue={searchValue} />
		</div>
	);
};

export default App;
