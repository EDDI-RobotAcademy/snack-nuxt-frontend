import vuetify from 'vite-plugin-vuetify'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  srcDir: 'src',

  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css'],

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    ssr: {
      noExternal: ['vuetify'],
    },
    plugins: [vuetify()],
  },

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap',
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      MAIN_API_URL: process.env.NUXT_PUBLIC_MAIN_API_URL,
      AI_BASE_URL: process.env.NUXT_PUBLIC_AI_BASE_URL,
    },
  },

  compatibilityDate: '2025-04-04',
})
