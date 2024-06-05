import axios from "axios";

// USING weatherapi.com

const BASE_URL = "http://api.weatherapi.com/v1/current.json?key=";

const getWeather = (term) => {
	const request = axios.get(
		`${BASE_URL}${process.env.WEATHER_API_KEY}&q=${term}&aqi=no`
	);
	return request.then((response) => response.data.current);
};

export default { getWeather };
