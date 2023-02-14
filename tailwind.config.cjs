/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			keyframes: {
				fadeIn: {
					'0%': { opacity: 0, scale: '0.9' },
					'100%': { opacity: 1, scale: '1' },
				},
			},
		},
		plugins: [],
	},
}
