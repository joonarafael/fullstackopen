/* eslint @typescript-eslint/no-unsafe-assignment: 0 */
/* eslint @typescript-eslint/no-unsafe-call: 0 */

import { v4 as uuidv4 } from "uuid";

import data from "../data/patients";
import { NonSensitivePatient, Patient, PatientToDB } from "../types";

const getAllNonSensitive = (): NonSensitivePatient[] => {
	const nonSensitivePatients: NonSensitivePatient[] = data.map(
		({ id, name, dateOfBirth, gender, occupation }) => ({
			id,
			name,
			dateOfBirth,
			gender,
			occupation,
		})
	);

	return nonSensitivePatients;
};

const addPatient = (patient: PatientToDB) => {
	const completedPatient: Patient = {
		...patient,
		id: uuidv4(),
	};

	data.push(completedPatient);
};

const findById = (id: string): Patient | undefined => {
	const patient = data.find((p) => p.id === id);

	if (!patient) {
		return undefined;
	}

	return patient;
};

export default {
	getAllNonSensitive,
	addPatient,
	findById,
};
