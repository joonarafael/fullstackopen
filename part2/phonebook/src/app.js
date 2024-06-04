import { useEffect, useState } from "react";
import Search from "./components/search";
import AddNewForm from "./components/addnewform";
import Persons from "./components/persons";

import axios from "axios";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		const fetchPersons = async () => {
			await axios
				.get("http://localhost:3001/persons")
				.then((response) => {
					if (response.status === 200) {
						setPersons(response.data);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		};

		fetchPersons();
	}, []);

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
