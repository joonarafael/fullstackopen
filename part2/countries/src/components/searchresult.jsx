const SearchResult = (props) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				columnGap: "5px",
			}}
		>
			<p>{props.name}</p>
			<button
				onClick={() => {
					props.setSelectedCountry();
					props.setView("country");
				}}
			>
				show
			</button>
		</div>
	);
};

export default SearchResult;
