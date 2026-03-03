import colors from 'tailwindcss/colors';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      title: 'SkillGrove',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      noscript: [{ textContent: 'JavaScript is required' }],
    },
  },

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,

    public: {
      jwtMaxAge: process.env.JWT_MAX_AGE || '604800',
    },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],

  eslint: {
    config: {},
  },

  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: { primary: colors.green },
        },
      },
    },
  },

  postcss: {
    plugins: {},
  },
});
