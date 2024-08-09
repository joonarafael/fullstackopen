const RATING_DESCRIPTIONS: Record<string, string> = {
	"1": "You can do better",
	"2": "Not too bad but could be better",
	"3": "Good job!",
};

interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

export const calculateExercises = (
	dailyHours: Array<number>,
	target: number
): Result => {
	const periodLength = dailyHours.length;
	const trainingDays = dailyHours.filter((hours) => hours > 0).length;
	const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;
	const success = average >= target;
	const rating = Math.min(3, Math.floor((average / target) * 3));
	const ratingDescription = RATING_DESCRIPTIONS[rating.toString()];

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average,
	};
};

const parseExArguments = (args: Array<string>): [number, Array<number>] => {
	// if run with `ts-node calculateExercises.ts -- -s`
	if (args.length < 6) throw new Error("Not enough arguments");

	const target = !isNaN(Number(args[4])) ? Number(args[4]) : -1;

	if (target === -1) {
		throw new Error("Provided values were not numbers!");
	}

	const dailyHours = args.slice(5).map((arg) => {
		if (!isNaN(Number(arg))) {
			return Number(arg);
		} else {
			throw new Error("Provided values were not numbers!");
		}
	});

	return [target, dailyHours];
};

try {
	const [target, exercies] = parseExArguments(process.argv);
	console.log(calculateExercises(exercies, target));
} catch (e) {
	console.log("Error, something bad happened, message: ", e);
}
