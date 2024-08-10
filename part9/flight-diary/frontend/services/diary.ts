import axios from "axios";

import { BACKEND_URL } from "../src/constants";
import { AddNewDiary, Diary } from "../types";
import { isDiaries } from "../types/validators";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
	"POST, PUT, DELETE, GET, OPTIONS";
axios.defaults.headers.common["Access-Control-Request-Method"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Headers"] =
	"Origin, X-Requested-With, Content-Type, Accept, Authorization";

const getAll = async (): Promise<Diary[]> => {
	const res = await axios.get(`${BACKEND_URL}/diaries`);

	return isDiaries(res.data);
};

const addEntry = async (entry: AddNewDiary) => {
	try {
		const res = await axios.post(`${BACKEND_URL}/diaries`, entry);

		if (res.status !== 200) {
			return res.data;
		}

		return "success";
	} catch (err: unknown) {
		if (axios.isAxiosError(err)) {
			return err.response?.data ?? "Something went wrong!";
		}

		return "Something went wrong!";
	}
};

export default {
	getAll,
	addEntry,
};
