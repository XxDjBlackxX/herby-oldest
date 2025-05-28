import { useMiddlewareState } from "../composables/useMiddlewareState";
import { useSession } from "../composables/useSession";
import { defineNuxtRouteMiddleware } from "nuxt/app";

export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const { sessionStore, logout } = useSession();
    const middlewareState = useMiddlewareState();

    middlewareState.value.authentication.triggered = true;

    if (!sessionStore.user) {
      sessionStore
        .initUser()
        .then(() => {
          sessionStore.isLoggedIn = true;
          middlewareState.value.authentication.done = true;
        })
        .catch((error) => {
          if (error?.status !== 401 && error?.status !== 403) {
            middlewareState.value.authentication.err = true;
            console.info("User's Connections Could Not Be Pulled");
          }
          logout();
          middlewareState.value.authentication.done = true;
          console.info("User Could Not Login");
        });
    }
  }

  return true;
});
