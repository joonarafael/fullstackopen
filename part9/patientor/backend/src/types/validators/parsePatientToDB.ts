import { Gender, PatientToDB } from "../";

const isString = (text: unknown): text is string => {
	return typeof text === "string" || text instanceof String;
};

const isGender = (param: unknown): param is Gender => {
	if (!param) {
		return false;
	}

	if (typeof param !== "string") {
		return false;
	}

	return Object.values(Gender).includes(param as Gender);
};

export const parsePatientToDB = (input: unknown): PatientToDB | null => {
	const parsedPatientToDB: PatientToDB = {
		name: "",
		dateOfBirth: "",
		ssn: "",
		gender: Gender.female,
		occupation: "",
	};

	if (!input || typeof input !== "object") {
		return null;
	}

	const notActuallySafe = input as PatientToDB;

	if (notActuallySafe.name && isString(notActuallySafe.name)) {
		parsedPatientToDB.name = notActuallySafe.name;
	} else {
		return null;
	}

	if (notActuallySafe.dateOfBirth && isString(notActuallySafe.dateOfBirth)) {
		parsedPatientToDB.dateOfBirth = notActuallySafe.dateOfBirth;
	} else {
		return null;
	}

	if (notActuallySafe.ssn && isString(notActuallySafe.ssn)) {
		parsedPatientToDB.ssn = notActuallySafe.ssn;
	} else {
		return null;
	}

	if (notActuallySafe.gender && isGender(notActuallySafe.gender)) {
		parsedPatientToDB.gender = notActuallySafe.gender;
	} else {
		return null;
	}

	if (notActuallySafe.occupation && isString(notActuallySafe.occupation)) {
		parsedPatientToDB.occupation = notActuallySafe.occupation;
	} else {
		return null;
	}

	return parsedPatientToDB;
};
