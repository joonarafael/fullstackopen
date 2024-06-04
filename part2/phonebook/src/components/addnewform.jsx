import { useState } from "react";

const AddNewForm = (props) => {
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	const addPerson = (event) => {
		event.preventDefault();

		if (!newName || !newNumber) {
			alert("Please enter a name and number");
			return;
		}

		const personObject = {
			name: newName,
			number: newNumber,
		};

		if (props.persons.find((person) => person.name === newName)) {
			alert(`${newName} is already added to phonebook`);
			return;
		}

		props.setPersons(props.persons.concat(personObject));
		setNewName("");
		setNewNumber("");
	};

	return (
		<form onSubmit={addPerson}>
			<div>
				name:{" "}
				<input value={newName} onChange={(e) => setNewName(e.target.value)} />
			</div>
			<div>
				number:{" "}
				<input
					value={newNumber}
					onChange={(e) => setNewNumber(e.target.value)}
				/>
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

export default AddNewForm;
