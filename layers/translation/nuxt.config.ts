import { locales } from "./constants/data";
import { createResolver } from "@nuxt/kit";

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  future: {
    compatibilityVersion: 4,
  },
  devServer: {
    port: 6010,
  },
  i18n: {
    defaultLocale: "en",
    strategy: "no_prefix",
    vueI18n: resolve("./i18n.config.ts"),
    locales,
  },
  modules: ["@nuxtjs/i18n"],
});
