// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: {
    enabled: process.env.NODE_ENV == "development",
  },
  future: {
    compatibilityVersion: 4,
  },
  devServer: {
    port: 3000,
  },
  ssr: true,
  app: {
    baseURL: "/",
    head: {
      charset: "utf-8",
      viewport:
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: `${process.env.CLIENT_URL}/assets/favicon.ico`,
        },
      ],
      meta: [
        {
          name: "description",
          content:
            "Step into the world of broadcasters, support them, interact and enjoy the fun!",
        },
        { property: "og:title", content: "New Generation Library Herby" },
        {
          property: "og:description",
          content:
            "Step into the world of broadcasters, support them, interact and enjoy the fun!",
        },
        {
          property: "og:image",
          content: `${process.env.CLIENT_URL}/assets/favicon.ico`,
        },
        { property: "og:url", content: "https://herby.cat" },
      ],
    },
  },
  extends: ["@layers/config"],
});
