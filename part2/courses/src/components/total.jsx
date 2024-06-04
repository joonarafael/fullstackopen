const Total = (props) => {
	const sum = props.parts.reduce((acc, part) => acc + part.exercises, 0);

	return (
		<p>
			<strong>total of {sum} exercises</strong>
		</p>
	);
};

export default Total;
