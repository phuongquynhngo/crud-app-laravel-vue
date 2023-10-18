
import authMiddleware from './middleware/auth.global'

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
  ssr: false,
  vue: {
    defineModel: true,
    propsDestructure: true,
  },
});