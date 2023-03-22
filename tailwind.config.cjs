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
					"dark": "#B8BFC3"
				}
			},
			"fontFamily": {
				"round": ['Varela Round'],
			}
		},
	},
	plugins: [],
}
