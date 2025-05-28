import { type VariantProps, cva } from "class-variance-authority";

export { default as SearchBar } from "./SearchBar.vue";

export const searchBarVariants = cva(
  "relative group flex items-center justify-start w-full overflow-hidden",
  {
    variants: {
      size: {
        sm: "text-sm h-[46px]",
        base: "text-base h-[56px]",
      },
    },
    defaultVariants: {
      size: "base",
    },
  },
);

export type SearchBarVariants = VariantProps<typeof searchBarVariants>;
