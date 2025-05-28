import { createResolver } from "@nuxt/kit";

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  future: {
    compatibilityVersion: 4,
  },
  devServer: {
    port: 6005,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "nuxt-lucide-icons",
    "vue-sonner/nuxt",
    "@formkit/auto-animate",
  ],
  plugins: [resolve("./app/plugins/lib.ts")],
  extends: ["@layers/utils", "@layers/translation"],
  lucide: {
    namePrefix: "Icon",
  },
  googleFonts: {
    families: {
      Inter: [400, 500, 700],
      Poppins: [400, 500, 700],
      Prompt: [400, 500, 700],
      "Chakra Petch": [400, 500, 700],
      "Ubuntu Mono": [400, 500, 700],
      Kanit: [400, 500, 700],
    },
  },
  css: [resolve("./app/assets/css/main.css")],
  tailwindcss: {
    configPath: resolve("./tailwind.config"),
  },
  shadcn: {
    prefix: "Ui",
    componentDir: resolve("./app/components/ui"),
  },
  colorMode: {
    storageKey: "ui-theme",
    preference: "dark",
  },
  components: [
    {
      path: resolve("./app/components/icons"),
      extensions: [".vue"],
      pathPrefix: false,
      priority: 20,
    },
  ],
});
