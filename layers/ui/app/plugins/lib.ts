import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useThrottleFn } from "@vueuse/core";
import { navigateTo, defineNuxtPlugin } from "nuxt/app";

export default defineNuxtPlugin(() => {
  const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

  const formatSize = (value: number | string): string => {
    return typeof value == "number" ? `${value}px` : value;
  };

  const onClick = useThrottleFn(
    ({
      to,
      external,
      callback,
      disabled,
    }: {
      to?: string;
      external?: boolean;
      callback?: () => void;
      disabled?: boolean;
    }) => {
      if (disabled) return false;
      if (to) {
        navigateTo(to, { external });
      } else {
        callback();
      }
    },
    300,
  );

  return {
    provide: {
      cn,
      formatSize,
      onClick,
    },
  };
});
