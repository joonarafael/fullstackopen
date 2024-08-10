import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

const getAll = async () => {
	const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

	return data;
};

export default {
	getAll,
};
