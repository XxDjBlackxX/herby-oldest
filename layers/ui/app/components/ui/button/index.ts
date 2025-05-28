import { type VariantProps, cva } from "class-variance-authority";
import type { PrimitiveProps } from "reka-ui";
import { HTMLAttributes } from "vue";

export { default as Button } from "./DefaultButton.vue";
export { default as HrefButton } from "./HrefButton.vue";
export { default as CopyButton } from "./CopyButton.vue";
export { default as MagicButton } from "./MagicButton.vue";
export { default as SwitchingBetweenPagesButton } from "./SwitchingBetweenPagesButton.vue";
export { default as CryptomusButton } from "./CryptomusButton.vue";

export interface ButtonProps extends PrimitiveProps {
  class?: HTMLAttributes["class"];
  disabled?: HTMLButtonElement["disabled"];
  to?: string | null;
  waiting?: boolean;
  external?: boolean;
  as?: "button" | "span";
}

export interface ButtonEmits {
  click: void[];
}

export const defaultButtonVariants = cva(
  "transition-all font-medium pointer-events-auto cursor-pointer disabled:cursor-not-allowed active:scale-[0.9] group-aria-disabled:pointer-events-none",
  {
    variants: {
      variant: {
        secondary:
          "outline-none bg-surface-200 disabled:bg-surface-300 disabled:opacity-50 hover:bg-surface-300 focus:bg-surface-200",
        primary:
          "outline-none bg-primary-500 disabled:bg-primary-800 text-primary-foreground hover:bg-primary-600 focus:bg-primary-500",
        danger:
          "outline-none text-white bg-red-500 disabled:bg-red-700 hover:bg-red-600 focus:bg-red-500",
        ghost: "hover:bg-gray-400/20",
        outline:
          "bg-surface-200 disabled:bg-surface-300 hover:bg-surface-300 focus:bg-surface-200 border-2 border-dashed border-surface-500",
        greenish:
          "border-none outline-none hover:outline hover:outline-offset-2 hover:outline-outline bg-surface-200 disabled:bg-surface-300 hover:bg-surface-300 focus:bg-surface-200 ring-1 ring-surface-300 text-green-500",
        reddish:
          "border-none outline-none hover:outline hover:outline-offset-2 hover:outline-outline bg-surface-200 disabled:bg-surface-300 hover:bg-surface-300 focus:bg-surface-200 ring-1 ring-surface-300 text-red-500",
      },
      align: {
        center: "justify-center",
        start: "justify-start",
      },
      orientation: {
        vertical: "flex-col",
        horizontal: "flex items-center",
      },
      shape: {
        nds: "inline-flex items-center justify-center font-medium rounded-full p-2",
        default: "inline-flex items-center rounded-primary",
      },
    },
    defaultVariants: {
      shape: "default",
      variant: "primary",
      align: "start",
      orientation: "horizontal",
    },
  },
);

export const linkButtonVariants = cva(
  "transition-all flex items-center gap-x-2 text-sm font-medium hover:underline active:scale-[0.9]",
  {
    variants: {
      variant: {
        primary: "text-typography-500 hover:text-primary-500",
        default: "text-typography-50 hover:text-primary-500",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export type DefaultButtonVariants = VariantProps<typeof defaultButtonVariants>;
export type HrefButtonVariants = VariantProps<typeof linkButtonVariants>;
