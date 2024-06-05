const Search = (props) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				columnGap: "5px",
			}}
		>
			<p>find countries</p>
			<input
				value={props.searchTerm}
				onChange={(e) => props.setSearchTerm(e.target.value)}
			/>
		</div>
	);
};

export default Search;
