/** @type {import('tailwindcss').Config} */

import typography from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '2rem'
			},
			screens: {
				sm: '100%',
				md: '100%',
				lg: '1120px',
				xl: '1304px'
			}
		},
		extend: {
			screens: {
				md: '768px',
				lg: '1024px'
			}
		}
	},
	plugins: [typography]
};
