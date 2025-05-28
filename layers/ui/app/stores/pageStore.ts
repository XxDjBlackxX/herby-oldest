import { defineStore } from "pinia";
import type { PageStore } from "@repo/client-types";

export const usePageStore = defineStore({
  id: "pageStore",
  state: (): PageStore => {
    return {
      ui: {
        theme: useColorMode()?.preference || "dark",
      },
      config: {
        currencies: [],
        lastUpdate: new Date(),
      },
    };
  },
  getters: {
    _getConfig: (state) => state.config,
  },
  actions: {
    setConfig(config: Record<string, string>) {
      this.config = { ...this.config, ...config, lastUpdate: new Date() };
    },
    async initConfig() {
      const response: any = await getReq("/config");

      if (response.data?.success) {
        this.setConfig(response.data.data);
      }
    },
  },
  persist: {
    key: "page-store",
    pick: ["ui", "config"],
  },
});
