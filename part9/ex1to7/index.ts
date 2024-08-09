import express from "express";

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_, res) => {
	res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
	const height: number = Number(req.query.height);
	const weight: number = Number(req.query.weight);

	if (isNaN(height) || isNaN(weight)) {
		return res.status(400).json({ error: "Malformatted parameters." });
	}

	const bmiCategory = calculateBmi(height, weight);

	return res.json({
		weight,
		height,
		bmi: bmiCategory,
	});
});

app.post("/exercises", (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { daily_exercises, target } = req.body;

	const targetNumber = Number(target);

	if (isNaN(targetNumber)) {
		return res.status(400).json({ error: "Malformatted parameters." });
	}

	let dailyExercises: Array<number> = [];

	// .map() will throw an error if daily_exercises is not an array
	try {
		dailyExercises = daily_exercises.map((e: any) => {
			const num = Number(e);

			if (isNaN(num)) {
				throw new Error("Provided values were not numbers!");
			}

			return num;
		});
	} catch (e) {
		return res.status(400).json({ error: "Malformatted parameters." });
	}

	const exerciseResult = calculateExercises(dailyExercises, targetNumber);

	return res.json(exerciseResult);
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
