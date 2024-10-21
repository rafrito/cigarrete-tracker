import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#0d0d0d",
					foreground: "#e0e0e0",
				},
				secondary: {
					DEFAULT: "#1a1a1a",
					foreground: "#e0e0e0",
				},
				highlightGray: "#333333",
				accent: "#999999",
				error: "#d32f2f",
				borderColor: "#444444",
				background: "#white",
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
