import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{ts,vue}'],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
		},
	},
	plugins: [],
} as Config;
