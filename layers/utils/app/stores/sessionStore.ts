import { defineStore } from "pinia";
import type { User, SessionStore } from "@repo/client-types";
import getReq from "../utils/getReq";

export const useSessionStore = defineStore({
  id: "sessionStore",
  state: (): SessionStore => ({
    user: null,
    isLoggedIn: false,
  }),
  getters: {
    _getUser: (state) => state.user,
  },
  actions: {
    setUser(user: Record<string, string>) {
      this.user = { ...this.user, ...user } as User;
    },
    async initUser() {
      const response: any = await getReq("/users/me");

      if (response.data?.success) {
        this.setUser(response.data.data);
      }
    },
  },
});
