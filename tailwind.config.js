/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/app/**/*.{js,jsx,ts,tsx}",
		"./src/components/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#ED3237",
				bgBlack: "#140100",
				textBlack: "#1E1E1E",
				textGray: "#505050",
			},
		},
	},
	presets: [require("nativewind/preset")],
	plugins: [],
};
