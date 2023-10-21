
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    //pageTransition: { name: "fade", mode: "out-in" },
  },
  runtimeConfig: {
    public: {
      clientId: 2,
      clientSecret: "Ln9SZzuhYi938tEfTEKpwqfrRvruoApRWqrCUthR"
    }
  },
  build: {
		transpile: ["primevue"]
	},
  modules: [
    "@nuxtjs/tailwindcss",
    '@pinia/nuxt',

  ],
  css: [
    // 'primeicons/primeicons.css',
    // "~/assets/css/main.css",
    // "~/assets/css/primevue.scss",
    // 'primevue/resources/themes/bootstrap4-light-blue/theme.css',
  ],
  // components: [
  //   'vue-multiselect',
  // ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},

    },
  },
  imports: {
    dirs: ['stores'],
    presets: [
      {
        imports: ['twMerge'],
        from: 'tailwind-merge',
      },
    ],
  },
  ssr: false,
  vue: {
    defineModel: true,
    propsDestructure: true,
  },
});