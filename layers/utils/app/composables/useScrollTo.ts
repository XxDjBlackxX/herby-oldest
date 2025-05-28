export const useScrollTo = (element: HTMLElement) => {
  element.scrollIntoView({ behavior: "smooth" });
};
