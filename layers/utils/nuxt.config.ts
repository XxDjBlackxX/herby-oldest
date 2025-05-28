// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  future: {
    compatibilityVersion: 4,
  },
  devServer: {
    port: 6000,
  },
  modules: ["@vueuse/nuxt", "@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],
  buildModules: ["@nuxtjs/axios"],
  runtimeConfig: {
    app: {
      SERVER_URL: process.env.SERVER_URL,
      CLIENT_URL: process.env.CLIENT_URL,
      TITLE: process.env.PROJECT_TITLE,
      FILE_SIZE_LIMIT: process.env.FILE_SIZE_LIMIT,
      MIN_WITHDRAWABLE_ORBIT: process.env.MIN_WITHDRAWABLE_ORBIT,
    },
    public: {
      OAUTH_URI: {
        DISCORD: process.env.DISCORD_OAUTH_URI,
        TWITCH: process.env.TWITCH_OAUTH_URI,
        GITHUB: process.env.GIT_OAUTH_URI,
      },
      REDIRECT_URI: {
        DISCORD: `${process.env.SERVER_URL}/v1/auth/connections/discord/redirect`,
        TWITCH: `${process.env.SERVER_URL}/v1/auth/connections/twitch/redirect`,
        GITHUB: `${process.env.SERVER_URL}/v1/auth/connections/github/redirect`,
        KICK: `${process.env.SERVER_URL}/v1/auth/connections/kick/redirect`,
      },
    },
  },
  axios: {
    baseURL: process.env.SERVER_URL || "http://localhost:3000",
  },
});
