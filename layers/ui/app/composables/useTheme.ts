import { usePageStore } from "../stores/pageStore.js";
import { computed } from "vue";

type Theme = { key: string; color: string };

const themes: Theme[] = [
  { key: "dark", color: "#000000" },
  { key: "light", color: "#ffffff" },
];

export function useTheme() {
  const pageStore = usePageStore();

  const setTheme = (recentTheme: string): void => {
    const colorMode = useColorMode();
    colorMode.preference = recentTheme;
    pageStore.ui.theme = recentTheme;
    localStorage.setItem("ui-theme", recentTheme);
  };

  const theme = computed(() => pageStore.ui.theme);

  return {
    theme,
    setTheme,
    pageStore,
    themes,
  };
}
