import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import Select from "react-select";

const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`;

const EDIT_AUTHOR = gql`
	mutation editAuthor($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			born
		}
	}
`;

const Authors = (props) => {
	const [selectedAuthor, setSelectedAuthor] = useState("");
	const [born, setBorn] = useState("");
	const [editAuthor] = useMutation(EDIT_AUTHOR);

	const result = useQuery(ALL_AUTHORS, {
		pollInterval: 10000,
	});

	if (!props.show) {
		return null;
	}

	const submit = async (event) => {
		event.preventDefault();

		editAuthor({
			variables: { name: selectedAuthor.value, setBornTo: parseInt(born) },
		});

		setSelectedAuthor("");
		setBorn("");
	};

	if (!props.show) {
		return null;
	}

	if (result.loading) {
		return <div>loading...</div>;
	}

	const authors = result?.data?.allAuthors ?? [];

	const authorOptions = authors.map((a) => ({
		value: a.name,
		label: a.name,
	}));

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<form onSubmit={submit}>
				<Select
					defaultValue={selectedAuthor}
					onChange={setSelectedAuthor}
					options={authorOptions}
				/>
				<div>
					born
					<input
						type="number"
						value={born}
						onChange={({ target }) => setBorn(target.value)}
					/>
				</div>
				<button type="submit">update author</button>
			</form>
		</div>
	);
};

export default Authors;
