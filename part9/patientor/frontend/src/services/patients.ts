import axios from 'axios';

import { apiBaseUrl } from '../constants';
import { Patient, PatientFormValues } from '../types';

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

const getAll = async () => {
	const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

	return data;
};

const create = async (object: PatientFormValues) => {
	const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

	return data;
};

const getById = async (id: string) => {
	const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

	return data;
};

export default {
	getAll,
	create,
	getById,
};
