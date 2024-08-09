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
	gender: string;
	occupation: string;
};

export type NonSensitivePatient = Omit<Patient, "ssn">;
