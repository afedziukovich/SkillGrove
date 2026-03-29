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
    nuxtUseMock: process.env.NUXT_USE_MOCK,

    jwtSecret: process.env.JWT_SECRET,

    groqApiEndpointSingle: process.env.GROQ_API_ENDPOINT_SINGLE,
    groqApiKey: process.env.GROQ_API_KEY,
    groqTargetModel: process.env.GROQ_TARGET_MODEL,

    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,

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
    'nuxt-toast',
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

  toast: {
    settings: {
      position: 'bottomCenter',
      timeout: 3000,
      pauseOnHover: true,
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

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'vue-codemirror',
        '@codemirror/lang-javascript',
        '@codemirror/lang-json',
        '@codemirror/lang-html',
        '@codemirror/lang-css',
        '@codemirror/view',
        '@codemirror/theme-one-dark',
      ],
    },
  },

  css: ['~/assets/css/mdc.css', '~/assets/css/main.css'],

  imports: {
    dirs: ['app/composables'],
  },
});
