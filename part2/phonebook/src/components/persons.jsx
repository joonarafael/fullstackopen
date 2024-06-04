const Persons = (props) => {
	return (
		<div>
			{props.persons
				.filter((person) =>
					person.name.toLowerCase().includes(props.searchValue.toLowerCase())
				)
				.map((person) => (
					<p key={person.name}>
						{person.name} {person.number}
					</p>
				))}
		</div>
	);
};

export default Persons;
