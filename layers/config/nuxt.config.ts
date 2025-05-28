// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devServer: {
    port: 6015,
  },
  modules: ["@nuxt/eslint", "@nuxt/image"],
  extends: ["@layers/translation", "@layers/ui", "@layers/utils"],
});
