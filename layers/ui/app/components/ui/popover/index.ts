import { type VariantProps, cva } from "class-variance-authority";

export { default as Popover } from "./Popover.vue";
export { default as PopoverContent } from "./PopoverContent.vue";
export { default as PopoverTrigger } from "./PopoverTrigger.vue";

export const popoverTriggerVariants = cva("transition-all", {
  variants: {
    variant: {},
  },
});

export type PopoverTriggerVariants = VariantProps<
  typeof popoverTriggerVariants
>;
