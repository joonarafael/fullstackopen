export type Diagnosis = {
	code: string;
	name: string;
	latin?: string | null;
};

export type Patient = {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
};

export type NonSensitivePatient = Omit<Patient, "ssn">;

export type PatientToDB = Omit<Patient, "id">;

export enum Gender {
	male = "male",
	female = "female",
	other = "other",
}
