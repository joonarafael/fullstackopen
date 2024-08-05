import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const ME = gql`
	query {
		me {
			username
			favoriteGenre
		}
	}
`;

const ALL_BOOKS = gql`
	query {
		allBooks {
			title
			author {
				name
			}
			published
			genres
		}
	}
`;

const Recommend = (props) => {
	const result = useQuery(ME, {
		pollInterval: 10000,
	});

	const result0 = useQuery(ALL_BOOKS, {
		pollInterval: 10000,
	});

	if (!props.show) {
		return null;
	}

	if (result.loading || result0.loading) {
		return <div>loading...</div>;
	}

	const user = result?.data?.me ?? [];
	const books = result0?.data?.allBooks ?? [];

	const filteredBooks = books.filter((book) =>
		book.genres.includes(user.favoriteGenre)
	);

	return (
		<div>
			<h2>recommend</h2>
			<p>
				books from your favorite genre <strong>{user.favoriteGenre}</strong>
			</p>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{filteredBooks.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Recommend;
