import globals from "globals";
import stylisticJs from "@stylistic/eslint-plugin-js";
import js from "@eslint/js";

export default [
	js.configs.recommended,
	{
		files: ["**/*.js"],
		languageOptions: {
			sourceType: "module",
			globals: {
				...globals.node,
			},
			ecmaVersion: "latest",
		},
		plugins: {
			"@stylistic/js": stylisticJs,
		},
		rules: {
			"@stylistic/js/linebreak-style": ["error", "unix"],
			"@stylistic/js/quotes": ["error", "double"],
			eqeqeq: "error",
			"no-trailing-spaces": "error",
			"object-curly-spacing": ["error", "always"],
			"arrow-spacing": ["error", { before: true, after: true }],
			"no-console": "off",
		},
	},
	{
		ignores: [
			"build/**",
			"dist/**",
			"node_modules/**",
			"frontend_src/build/**",
		],
	},
];
