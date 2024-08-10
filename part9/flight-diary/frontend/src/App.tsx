import { useEffect, useState } from "react";

import AddDiary from "../components/adddiary";
import DiaryEntry from "../components/diary";
import Notification from "../components/notification";
import diaryService from "../services/diary";
import { Diary } from "../types/index";

const App = () => {
	const [diaries, setDiaries] = useState<Diary[]>([]);
	const [notification, setNotification] = useState<{
		error?: boolean;
		message?: string | null;
	}>({
		message: "",
	});

	const fetchDiaries = async () => {
		const res = await diaryService.getAll();

		setDiaries(res);
	};

	useEffect(() => {
		fetchDiaries();
	}, []);

	useEffect(() => {
		if (notification.message?.includes("added")) {
			fetchDiaries();
		}

		const timer = setTimeout(() => {
			setNotification({ message: null });
		}, 5000);

		return () => clearTimeout(timer);
	}, [notification]);

	return (
		<div className="App">
			<Notification
				isError={notification.error ?? null}
				message={notification.message ?? null}
			/>
			<h1>Add new entry</h1>
			<AddDiary setNotification={setNotification} />
			<h1>Diary entries</h1>
			<div>
				{diaries.map((diary, i) => (
					<DiaryEntry key={i} diary={diary} />
				))}
			</div>
		</div>
	);
};

export default App;
