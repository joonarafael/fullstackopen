import { gql, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

const ALL_BOOKS = gql`
	query allBooks($genre: String) {
		allBooks(genre: $genre) {
			title
			author {
				name
			}
			published
			genres
		}
	}
`;

const Books = (props) => {
	const [genre, setGenre] = useState("");

	const { loading, data, refetch } = useQuery(ALL_BOOKS, {
		variables: { genre },
		pollInterval: 10000,
	});

	useEffect(() => {
		refetch();
	}, [genre, refetch]);

	if (!props.show) {
		return null;
	}

	if (loading) {
		return <div>loading...</div>;
	}

	const allGenres = data?.allBooks
		.map((book) => book.genres)
		.flat()
		.filter((genre, index, self) => self.indexOf(genre) === index);

	const books = data?.allBooks ?? [];

	return (
		<div>
			<h2>books</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div>
				{allGenres.map((a) => (
					<button
						key={a}
						onClick={() => {
							setGenre(a);
						}}
					>
						{a}
					</button>
				))}
				<button
					onClick={() => {
						setGenre("");
					}}
				>
					all genres
				</button>
			</div>
		</div>
	);
};

export default Books;
