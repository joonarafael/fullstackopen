import { PatientToDB } from "../";

export const parsePatientToDB = (input: unknown): PatientToDB | null => {
	return input as PatientToDB;
};
