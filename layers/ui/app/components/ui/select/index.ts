import { type VariantProps, cva } from "class-variance-authority";

export { default as Select } from "./Select.vue";
export { default as SelectContent } from "./SelectContent.vue";
export { default as SelectGroup } from "./SelectGroup.vue";
export { default as SelectItem } from "./SelectItem.vue";
export { default as SelectItemText } from "./SelectItemText.vue";
export { default as SelectLabel } from "./SelectLabel.vue";
export { default as SelectScrollDownButton } from "./SelectScrollDownButton.vue";
export { default as SelectScrollUpButton } from "./SelectScrollUpButton.vue";
export { default as SelectSeparator } from "./SelectSeparator.vue";
export { default as SelectTrigger } from "./SelectTrigger.vue";
export { default as SelectValue } from "./SelectValue.vue";

export const selectTriggerVariants = cva(
  "relative flex items-center justify-between w-full px-3 gap-2 overflow-hidden",
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

export type SelectTriggerVariants = VariantProps<typeof selectTriggerVariants>;
