const Header = (props) => {
	return <h1>{props.course}</h1>;
};

const Part = (props) => {
	return (
		<p>
			{props.part.title} {props.part.exercises}
		</p>
	);
};

const Content = (props) => {
	return (
		<>
			<Part part={props.parts[0]} />
			<Part part={props.parts[1]} />
			<Part part={props.parts[2]} />
		</>
	);
};

const Total = (props) => {
	const sum = props.parts.reduce((acc, part) => acc + part.exercises, 0);

	return <p>Number of exercises {sum}</p>;
};

const App = () => {
	const course = {
		name: "Half Stack application development",
		parts: [
			{
				title: "Fundamentals of React",
				exercises: 10,
			},
			{
				title: "Using props to pass data",
				exercises: 7,
			},
			{
				title: "State of a component",
				exercises: 14,
			},
		],
	};

	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};

export default App;
