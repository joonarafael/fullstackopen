/* eslint @typescript-eslint/no-unsafe-assignment: 0 */
/* eslint @typescript-eslint/no-unsafe-call: 0 */

import { v4 as uuidv4 } from "uuid";

import data from "../data/patients";
import { Gender, NonSensitivePatient, Patient, PatientToDB } from "../types";

const getAllNonSensitive = (): NonSensitivePatient[] => {
	const nonSensitivePatients: NonSensitivePatient[] = data.map(
		({ id, name, dateOfBirth, gender, occupation }) => ({
			id,
			name,
			dateOfBirth,
			gender: gender as Gender,
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

export default {
	getAllNonSensitive,
	addPatient,
};
