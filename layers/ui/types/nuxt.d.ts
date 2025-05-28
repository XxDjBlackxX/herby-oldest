import { ClassValue } from "clsx";
import { NuxtApp } from "nuxt/schema";

declare module "#app" {
  interface NuxtApp {
    $cn: (...inputs: ClassValue[]) => string;
    $formatSize: (value: number | string) => string;
    $onClick: (options: {
      to?: string;
      external?: boolean;
      callback?: () => void;
      disabled?: boolean;
    }) => boolean | void;
    $t: (input: string) => string;
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $cn: NuxtApp["$cn"];
    $formatSize: NuxtApp["$formatSize"];
    $onClick: NuxtApp["$onClick"];
    $t: NuxtApp["$t"];
  }
}
