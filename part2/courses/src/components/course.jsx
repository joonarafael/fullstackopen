import Content from "./content";
import Header from "./header";
import Total from "./total";

const Course = (props) => {
	return (
		<div>
			<Header course={props.course.name} />
			<Content parts={props.course.parts} />
			<Total parts={props.course.parts} />
		</div>
	);
};

export default Course;
