/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"custom-blue": "#563BFF",
				"custom-dark-blue": "#3734A9",
				"custom-gray": "#51459E",
			},
			spacing: {
				2.91: "2.91px",
				21.09: "21.09px",
				18.18: "18.18px",
				66: "66px",
				48: "48px",
			},
			borderRadius: {
				15: "15px",
			},
		},
	},
	plugins: [],
}
