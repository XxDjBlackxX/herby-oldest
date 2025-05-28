import { cva, type VariantProps } from "class-variance-authority";

export { default as Textarea } from "./Textarea.vue";

export const textareaVariants = cva(
  "transition-all flex min-h-20 w-full items-center justify-start p-3",
  {
    variants: {
      size: {
        sm: "h-[46px] text-sm",
        base: "h-[56px] text-base",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

export type TextAreaVariants = VariantProps<typeof textareaVariants>;
