// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["reka-ui/nuxt"],
  runtimeConfig: {
    apiDebug: false,
    apiKey: process.env.API_KEY,
  },
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/x-icon", href: "https://fav.farm/📦" },
      ],
    },
  },
});
