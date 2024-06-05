import axios from "axios";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/";

const getAll = () => {
	const request = axios.get(`${BASE_URL}api/all`);
	return request.then((response) => response.data);
};

export default { getAll };
