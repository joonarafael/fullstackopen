type BMICategory = {
	lowerBound: number;
	upperBound: number;
	category: string;
};

const BMI: BMICategory[] = [
	{
		lowerBound: 0,
		upperBound: 15.9,
		category: "Underweight (Severe thinness)",
	},
	{
		lowerBound: 16,
		upperBound: 16.9,
		category: "Underweight (Moderate thinness)",
	},
	{
		lowerBound: 17,
		upperBound: 18.4,
		category: "Underweight (Mild thinness)",
	},
	{
		lowerBound: 18.5,
		upperBound: 24.9,
		category: "Normal range",
	},
	{
		lowerBound: 25,
		upperBound: 29.9,
		category: "Overweight (Pre-obese)",
	},
	{
		lowerBound: 30,
		upperBound: 34.9,
		category: "Obese (Class I)",
	},
	{
		lowerBound: 35,
		upperBound: 39.9,
		category: "Obese (Class II)",
	},
	{
		lowerBound: 40,
		upperBound: 99,
		category: "Obese (Class III)",
	},
];

const calculateBmi = (height: number, weight: number): string => {
	const bmi = weight / Math.pow(height / 100, 2);

	for (let i = 0; i < BMI.length; i++) {
		if (bmi >= BMI[i].lowerBound && bmi <= BMI[i].upperBound) {
			return BMI[i].category;
		}
	}

	return "unknown";
};

const parseArguments = (args: Array<string>): Array<number> => {
	// if run with `ts-node bmiCalculator.ts -- -s`
	if (args.length < 6) throw new Error("Not enough arguments");

	const parsedArgs = args.slice(4).map((arg) => {
		if (!isNaN(Number(arg))) {
			return Number(arg);
		} else {
			throw new Error("Provided values were not numbers!");
		}
	});

	return parsedArgs;
};

try {
	const [height, weight] = parseArguments(process.argv);
	console.log(calculateBmi(height, weight));
} catch (e) {
	console.log("Error, something bad happened, message: ", e.message);
}
