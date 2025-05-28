import { cva, type VariantProps } from "class-variance-authority";

export const inputVariants = cva("transition-all relative flex w-full px-3", {
  variants: {
    size: {
      sm: "h-[46px] text-sm",
      base: "h-[56px] text-base",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export type InputVariants = VariantProps<typeof inputVariants>;

export const editableInputVariants = cva(
  "relative flex items-center w-full group",
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

export type EditableInputVariants = VariantProps<typeof editableInputVariants>;
