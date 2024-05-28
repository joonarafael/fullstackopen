import { useState } from "react";

const Title = (props) => {
	return <h1>{props.title}</h1>;
};

const StatsLine = (props) => {
	return (
		<tr>
			<td>{props.text}</td>
			<td>{props.value}</td>
		</tr>
	);
};

const Stats = (props) => {
	const total = props.good + props.neutral + props.bad;
	const average = ((props.good - props.bad) / total).toFixed(1);
	const positive = ((props.good / total) * 100).toFixed(1);

	return (
		<table>
			<tbody>
				<StatsLine text="good" value={props.good} />
				<StatsLine text="neutral" value={props.neutral} />
				<StatsLine text="bad" value={props.bad} />
				<StatsLine text="all" value={total} />
				<StatsLine text="average" value={average || 0} />
				<StatsLine text="positive" value={`${positive || 0} %`} />
			</tbody>
		</table>
	);
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<Title title="give feedback" />
			<button
				onClick={() => {
					setGood(good + 1);
				}}
			>
				good
			</button>
			<button
				onClick={() => {
					setNeutral(neutral + 1);
				}}
			>
				neutral
			</button>
			<button
				onClick={() => {
					setBad(bad + 1);
				}}
			>
				bad
			</button>
			<Title title="statistics" />
			{good || neutral || bad ? (
				<Stats good={good} neutral={neutral} bad={bad} />
			) : (
				<p>No feedback given</p>
			)}
		</div>
	);
};

export default App;
