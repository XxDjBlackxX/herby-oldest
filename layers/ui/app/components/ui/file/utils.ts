export const getCssVariable = (
  element: HTMLElement,
  variable: string,
): string => {
  return getComputedStyle(element).getPropertyValue(variable).trim();
};
