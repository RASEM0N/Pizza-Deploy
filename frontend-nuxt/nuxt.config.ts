// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: true,
	compatibilityDate: '2025-01-21',
	runtimeConfig: {
		public: {
			// @TODO http://localhost:5000
			baseUrl: 'http://localhost:5000',
		},
	},
	app: {
		head: {
			title: 'Pizza',
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			link: [
				{
					rel: 'icon',
					type: 'image/svg+xml',
					href: '/logo.svg',
					sizes: '128x128',
				},
			],
		},
	},

	// @TODO https://nuxt.com/docs/api/nuxt-config
	alias: {},
	devtools: {
		enabled: false,
	},
	typescript: {
		strict: true,
	},
	vue: {
		propsDestructure: true,
	},
	modules: [
		'@nuxt/image',
		'@nuxtjs/i18n',
		'@nuxtjs/color-mode',
		'@nuxtjs/tailwindcss',
		'@nuxtjs/google-fonts',
		'@pinia/nuxt',
		'@vee-validate/nuxt',
		'@vueuse/nuxt',
		'shadcn-nuxt',
		'nuxt-lucide-icons',
	],
	dir: {
		pages: 'src/pages',
		layouts: 'src/app/layouts',
		middleware: 'src/app/middleware',
	},
	components: [
		{
			path: 'src/widgets',
			extensions: ['.vue'],
			prefix: 'Widget',
		},
		{
			path: 'src/features',
			extensions: ['.vue'],
			prefix: 'Feature',
		},
		{
			path: 'src/entities',
			extensions: ['.vue'],
			prefix: 'Entity',
		},
		{
			path: 'src/shared/ui',
			extensions: ['.vue'],
			prefix: 'Ui',
		},
	],
	i18n: {
		strategy: 'prefix',
		defaultLocale: 'ru',
		baseUrl: 'http://localhost:3000',
		locales: [
			{
				code: 'en',
				language: 'en-US',
				file: 'en.json',
			},
			{
				code: 'ru',
				language: 'ru-RU',
				file: 'ru.json',
			},
		],
	},
	tailwindcss: {
		cssPath: 'src/app/style.css',
	},
	googleFonts: {
		display: 'swap',
		prefetch: true,
		preconnect: true,
		preload: true,
		families: {
			Nunito: ['400', '500', '600', '700', '800', '900'],
		},
	},
	lucide: {
		namePrefix: 'Icon',
	},
});
