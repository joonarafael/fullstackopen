import React from "react";

import diaryService from "../services/diary";
import { Visibility, Weather } from "../types";

interface AddDiaryProps {
	setNotification: (notification: {
		error?: boolean;
		message?: string | null;
	}) => void;
}

const AddDiary = ({ setNotification }: AddDiaryProps) => {
	const addDiary = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);

		const date = formData.get("date");
		const visibility = formData.get("visibility");
		const weather = formData.get("weather");
		const comment = formData.get("comment");

		if (!date || !visibility || !weather) {
			setNotification({
				error: true,
				message: "Please fill all fields",
			});
			return;
		}

		const res = await diaryService.addEntry({
			date: date as string,
			visibility: visibility as Visibility,
			weather: weather as Weather,
			comment: comment as string,
		});

		if (res !== "success") {
			setNotification({
				error: true,
				message: res,
			});
			return;
		}

		setNotification({
			error: false,
			message: "Entry added successfully",
		});
	};

	return (
		<form onSubmit={addDiary}>
			<div>
				<label htmlFor="date">Date</label>
				<input type="date" id="date" name="date" />
			</div>
			<fieldset>
				<legend>visibility</legend>
				<div>
					<input
						type="radio"
						id="visibilityChoice1"
						name="visibility"
						value="great"
					/>
					<label htmlFor="visibilityChoice1">Great</label>
					<input
						type="radio"
						id="visibilityChoice2"
						name="visibility"
						value="good"
					/>
					<label htmlFor="visibilityChoice2">Good</label>
					<input
						type="radio"
						id="visibilityChoice3"
						name="visibility"
						value="ok"
					/>
					<label htmlFor="visibilityChoice3">Ok</label>
					<input
						type="radio"
						id="visibilityChoice4"
						name="visibility"
						value="poor"
					/>
					<label htmlFor="visibilityChoice4">Poor</label>
				</div>
			</fieldset>
			<fieldset>
				<legend>weather</legend>
				<div>
					<input
						type="radio"
						id="weatherChoice1"
						name="weather"
						value="sunny"
					/>
					<label htmlFor="weatherChoice1">Sunny</label>
					<input
						type="radio"
						id="weatherChoice2"
						name="weather"
						value="rainy"
					/>
					<label htmlFor="weatherChoice2">Rainy</label>
					<input
						type="radio"
						id="weatherChoice3"
						name="weather"
						value="cloudy"
					/>
					<label htmlFor="weatherChoice3">Cloudy</label>
					<input
						type="radio"
						id="weatherChoice4"
						name="weather"
						value="stormy"
					/>
					<label htmlFor="weatherChoice4">Stormy</label>
					<input
						type="radio"
						id="weatherChoice5"
						name="weather"
						value="windy"
					/>
					<label htmlFor="weatherChoice5">Windy</label>
				</div>
			</fieldset>
			<div>
				<label htmlFor="comment">Comment</label>
				<input type="text" id="comment" name="comment" />
			</div>
			<button type="submit">Add entry</button>
		</form>
	);
};

export default AddDiary;
