import { defineNuxtRouteMiddleware } from "nuxt/app";

export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const { pageStore } = usePage();
    const middlewareState = useMiddlewareState();

    middlewareState.value.config.triggered = true;

    const lastUpdateDate = new Date(pageStore.config.lastUpdate);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    if (lastUpdateDate < oneWeekAgo || !pageStore.config.currencies.length) {
      pageStore
        .initConfig()
        .then(() => (middlewareState.value.config.done = true))
        .catch(() => (middlewareState.value.config.done = false));
    } else {
      middlewareState.value.config.done = true;
    }
  }

  return true;
});
