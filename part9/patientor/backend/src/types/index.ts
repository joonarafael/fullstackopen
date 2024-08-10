export interface Diagnosis {
	code: string;
	name: string;
	latin?: string | null;
}

interface BaseEntry {
	id: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis["code"]>;
	description: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: "OccupationalHealthcare";
	employerName: string;
	sickLeave?: {
		startDate: string;
		endDate: string;
	};
}

export enum HealthCheckRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck";
	healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
	type: "Hospital";
	discharge: {
		date: string;
		criteria: string;
	};
}

type Entry = OccupationalHealthcareEntry | HospitalEntry | HealthCheckEntry;

export interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
	entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type PatientToDB = Omit<Patient, "id">;

export enum Gender {
	male = "male",
	female = "female",
	other = "other",
}
