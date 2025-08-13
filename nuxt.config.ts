// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui-pro',
    '@nuxt/test-utils'
  ],

  // Import main CSS file
  css: ['~/assets/css/main.css'],

  // Nuxt UI configuration
  ui: {
    theme: {
      colors: ['primary', 'secondary', 'accent', 'neutral']
    }
  },

  // Color mode configuration for dark/light theme
  colorMode: {
    preference: 'system'
  }
})