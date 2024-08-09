import data from "../data/patients";
import { NonSensitivePatient } from "../types";

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

export default {
	getAllNonSensitive,
};
