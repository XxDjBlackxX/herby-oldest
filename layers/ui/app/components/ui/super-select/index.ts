import { type VariantProps, cva } from "class-variance-authority";

export { default as SuperSelect } from "./SuperSelect.vue";
export { default as SuperSelectAnchor } from "./SuperSelectAnchor.vue";
export { default as SuperSelectEmpty } from "./SuperSelectEmpty.vue";
export { default as SuperSelectGroup } from "./SuperSelectGroup.vue";
export { default as SuperSelectInput } from "./SuperSelectInput.vue";
export { default as SuperSelectItem } from "./SuperSelectItem.vue";
export { default as SuperSelectContent } from "./SuperSelectContent.vue";
export { default as SuperSelectSeparator } from "./SuperSelectSeparator.vue";
export { default as SuperSelectTrigger } from "./SuperSelectTrigger.vue";

export const superSelectTriggerVariants = cva(
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

export type SuperSelectTriggerVariants = VariantProps<
  typeof superSelectTriggerVariants
>;
