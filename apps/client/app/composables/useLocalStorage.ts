const STORAGE_KEY = "data";

export const useLocalStorage = () => {
  const setItem = (key: string, value: any) => {
    localStorage.setItem(`${STORAGE_KEY}-${key}`, value || "undefined");
  };

  const getItem = (key: string) => {
    return localStorage.getItem(`${STORAGE_KEY}-${key}`);
  };

  const removeItem = (key: string) => {
    return localStorage.removeItem(`${STORAGE_KEY}-${key}`);
  };

  return {
    setItem,
    getItem,
    removeItem,
  };
};
