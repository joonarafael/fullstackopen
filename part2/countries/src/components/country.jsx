import { useState, useEffect } from "react";

import weatherService from "../services/weatherservice";

// NOTE: Weather is using the weatherapi.com API, which requires an API key.

const Country = (props) => {
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		weatherService
			.getWeather(props.country.capital[0])
			.then((response) => {
				setWeather(response);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [props.country.capital]);

	return (
		<div>
			<h1>{props.country.name.common}</h1>
			<p>capital {props.country.capital[0]}</p>
			<p>area {props.country.area}</p>
			<h2>languages</h2>
			<ul>
				{Object.values(props.country.languages).map((language, i) => {
					return <li key={i}>{language}</li>;
				})}
			</ul>
			<img src={props.country.flags.png} />
            <h2>Weather in {props.country.capital[0]}</h2>
            {weather ? (
                <div>
                    <p>temperature: {weather.temp_c} Celsius</p>
                    <img src={weather.condition.icon} alt={weather.condition.text} />
                    <p>wind: {weather.wind_kph} kph direction {weather.wind_dir}</p>
                </div>
            ) : (
                <p>Weather data not available</p>
            )}
		</div>
	);
};

export default Country;
