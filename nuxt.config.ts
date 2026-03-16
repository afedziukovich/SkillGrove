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

    groqApiEndpointSingle: process.env.GROQ_API_ENDPOINT_SINGLE,
    groqApiKey: process.env.GROQ_API_KEY,
    groqTargetModel: process.env.GROQ_TARGET_MODEL,

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
    '@nuxtjs/mdc',
  ],

  mdc: {
    highlight: {
      theme: 'github-light',
      wrapperStyle: true,
      langs: ['javascript', 'typescript', 'json', 'python'],
    },
    components: {
      prose: false,
    },
  },

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

  typescript: {
    tsConfig: {
      include: ['../test/unit/**/*'],
    },
  },

  css: ['~/assets/css/mdc.css', '~/assets/css/main.css'],
});
