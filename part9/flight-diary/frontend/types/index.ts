export enum Visibility {
	null = "null",
	great = "great",
	good = "good",
	ok = "ok",
	poor = "poor",
}

export enum Weather {
	null = "null",
	sunny = "sunny",
	rainy = "rainy",
	cloudy = "cloudy",
	stormy = "stormy",
	windy = "windy",
}

export type Diary = {
	id: number;
	date: string;
	visibility: Visibility;
	weather: Weather;
	comment?: string;
};

export type AddNewDiary = Omit<Diary, "id">;
