import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import patientService from "../../services/patients";
import { Diagnosis, Entry, Patient } from "../../types";

interface PatientPageProps {
	diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
	const id = useParams().id;
	const [patientData, setPatientData] = useState<Patient | undefined>();

	useEffect(() => {
		const fetchPatientData = async () => {
			if (!id) {
				return;
			}

			const res = await patientService.getById(id);

			if (res) {
				setPatientData(res);
			}
		};

		fetchPatientData();
	}, [id]);

	if (!id) {
		return <p>Invalid URL, no ID provided.</p>;
	}

	if (!patientData) {
		return <p>Invalid ID</p>;
	}

	const EntryElement = (entry: Entry) => {
		return (
			<div>
				<p>
					{entry.date} <em>{entry.description}</em>
				</p>
				<ul>
					{entry.diagnosisCodes?.map((code, i) => (
						<li key={i}>
							{code} {diagnoses.find((d) => d.code === code)?.name}
						</li>
					))}
				</ul>
			</div>
		);
	};

	return (
		<div>
			<h1>
				{patientData.name}, {patientData.gender}
			</h1>
			<p>ssh: {patientData.ssn}</p>
			<p>occupation: {patientData.occupation}</p>
			<h3>entries</h3>
			<div>
				{patientData.entries.map((entry) => (
					<EntryElement key={entry.id} {...entry} />
				))}
			</div>
		</div>
	);
};

export default PatientPage;
