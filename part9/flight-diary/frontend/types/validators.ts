import { Diary, Visibility, Weather } from "./index";

export const isDiary = (diary: Diary) => {
	const parsedDiary: Diary = {
		id: diary.id && typeof diary.id === "number" ? diary.id : NaN,
		date: diary.date && typeof diary.date === "string" ? diary.date : "",
		visibility:
			diary.visibility && Object.values(Visibility).includes(diary.visibility)
				? diary.visibility
				: Visibility.null,
		weather:
			diary.weather && Object.values(Weather).includes(diary.weather)
				? diary.weather
				: Weather.null,
	};

	if (diary.comment && typeof diary.comment === "string") {
		parsedDiary.comment = diary.comment;
	}

	return parsedDiary;
};

export const isDiaries = (diaries: unknown): Diary[] => {
	if (!Array.isArray(diaries)) {
		throw new Error("Incorrect or missing diaries");
	}

	return diaries.map((diary) => isDiary(diary));
};
