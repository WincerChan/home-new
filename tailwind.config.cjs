/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			"colors": {
				"bgc": {
					"dark": "#132C33"
				},
				"title": {
					"dark": "#EDEDEF"
				},
				"bgs": {
					"dark": "#c7d2d4"
				},
				"heading": {
					"dark": "#4d4030"
				},
				"footer": {
					"dark": "#4F383E"
				}
			},
			"fontFamily": {
				"round": ['Varela Round'],
			}
		},
	},
	plugins: [],
}
