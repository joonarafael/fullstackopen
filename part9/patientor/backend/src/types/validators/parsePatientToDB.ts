/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/no-unsafe-member-access: 0 */
/* eslint @typescript-eslint/no-unsafe-assignment: 0 */
/* eslint @typescript-eslint/no-unsafe-argument: 0 */

import { Gender, PatientToDB } from "../";

const isString = (text: unknown): text is string => {
	return typeof text === "string" || text instanceof String;
};

const isGender = (param: any): param is Gender => {
	return Object.values(Gender).includes(param);
};

export const parsePatientToDB = (input: any): PatientToDB | null => {
	const parsedPatientToDB: PatientToDB = {
		name: "",
		dateOfBirth: "",
		ssn: "",
		gender: Gender.female,
		occupation: "",
	};

	if (input.name && isString(input.name)) {
		parsedPatientToDB.name = input.name;
	} else {
		return null;
	}

	if (input.dateOfBirth && isString(input.dateOfBirth)) {
		parsedPatientToDB.dateOfBirth = input.dateOfBirth;
	} else {
		return null;
	}

	if (input.ssn && isString(input.ssn)) {
		parsedPatientToDB.ssn = input.ssn;
	} else {
		return null;
	}

	if (input.gender && isGender(input.gender)) {
		parsedPatientToDB.gender = input.gender;
	} else {
		return null;
	}

	if (input.occupation && isString(input.occupation)) {
		parsedPatientToDB.occupation = input.occupation;
	} else {
		return null;
	}

	return parsedPatientToDB;
};
