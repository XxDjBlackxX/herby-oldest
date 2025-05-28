import { usePageStore } from "../stores/pageStore.js";

export function usePage() {
  const pageStore = usePageStore();

  return {
    pageStore,
  };
}
