import colors from 'tailwindcss/colors';

// https://nuxt.com/docs/api/configuration/nuxt-config
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

  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/fonts', '@nuxt/image', '@nuxtjs/tailwindcss'],

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
