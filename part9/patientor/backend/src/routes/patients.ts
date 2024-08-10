/* eslint @typescript-eslint/no-unsafe-assignment: 0 */

import express from "express";

import patientService from "../services/patientService";
import { parsePatientToDB } from "../types/validators/parsePatientToDB";

const router = express.Router();

router.get("/", (_req, res) => {
	res.send(patientService.getAllNonSensitive());
});

router.post("/", (req, res) => {
	const { name, dateOfBirth, ssn, gender, occupation } = req.body;

	const parsedEntry = parsePatientToDB({
		name,
		dateOfBirth,
		ssn,
		gender,
		occupation,
	});

	if (parsedEntry) {
		patientService.addPatient(parsedEntry);

		res.status(200).send();
	} else {
		res.status(400).send();
	}
});

router.get("/:id", (req, res) => {
	const patient = patientService.findById(req.params.id);

	if (patient) {
		res.status(200).send(patient);
	} else {
		res.status(404).send();
	}
});

export default router;
