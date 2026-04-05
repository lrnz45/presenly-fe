// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],
  css: [
    "~/assets/css/tailwind.css",
    "~/assets/css/global.css"
  ],
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' }],
      script: [
        { src: 'https://accounts.google.com/gsi/client', async: true, defer: true }
      ]
    }
  },
  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "", // Menghasilkan class="light" atau class="dark" di tag <html>
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:4000/api/v1',
      googleClientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID || '1013778811802-f9b88v72m2un62d49t9i4ndbtqas6on4.apps.googleusercontent.com'
    }
  }
});