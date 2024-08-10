import { Diary } from "../types";

interface DiaryProps {
	diary: Diary;
}

const DiaryEntry = ({ diary }: DiaryProps) => {
	return (
		<div>
			<h3>{diary.date}</h3>
			<p>visibility: {diary.visibility}</p>
			<p>weather: {diary.weather}</p>
		</div>
	);
};

export default DiaryEntry;
