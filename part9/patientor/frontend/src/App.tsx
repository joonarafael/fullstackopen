import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import { Button, Container, Divider, Typography } from "@mui/material";

import PatientListPage from "./components/PatientListPage";
import { apiBaseUrl } from "./constants";
import patientService from "./services/patients";
import { Patient } from "./types";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

const App = () => {
	const [patients, setPatients] = useState<Patient[]>([]);

	useEffect(() => {
		void axios.get<void>(`${apiBaseUrl}/ping`);

		const fetchPatientList = async () => {
			const patients = await patientService.getAll();
			setPatients(patients);
		};
		void fetchPatientList();
	}, []);

	return (
		<div className="App">
			<Router>
				<Container>
					<Typography variant="h3" style={{ marginBottom: "0.5em" }}>
						Patientor
					</Typography>
					<Button component={Link} to="/" variant="contained" color="primary">
						Home
					</Button>
					<Divider hidden />
					<Routes>
						<Route
							path="/"
							element={
								<PatientListPage
									patients={patients}
									setPatients={setPatients}
								/>
							}
						/>
					</Routes>
				</Container>
			</Router>
		</div>
	);
};

export default App;
