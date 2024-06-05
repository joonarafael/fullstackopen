import { useEffect, useState } from "react";
import Search from "./components/search";
import SearchResult from "./components/searchresult";

import apiService from "./services/apiservice";
import Country from "./components/country";

const App = () => {
	const [allCountries, setAllCountries] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCountry, setSelectedCountry] = useState(null);
	const [view, setView] = useState("search");

	// fetch full country data from the API
	useEffect(() => {
		apiService
			.getAll()
			.then((response) => {
				setAllCountries(response);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	// handle search term changes
	useEffect(() => {
		if (searchTerm === "") {
			setSearchResults([]);
			return;
		}

		setView("search");

		const results = allCountries.filter((country) =>
			country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setSearchResults(results);

		if (results.length === 1) {
			setView("country");
			setSelectedCountry(results[0]);
		}
	}, [searchTerm]);

	return (
		<div>
			<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			{view === "search" ? (
				<div>
					{searchResults.length > 10 ? (
						<p>Too many matches, specify another filter</p>
					) : (
						<>
							{searchResults.map((searchResult, i) => {
								return (
									<SearchResult
										name={searchResult.name.common}
										key={i}
										setView={setView}
										setSelectedCountry={() => {
											setSelectedCountry(searchResult);
										}}
									/>
								);
							})}
						</>
					)}
				</div>
			) : (
				<div>
					<Country country={selectedCountry} />
				</div>
			)}
		</div>
	);
};

export default App;
