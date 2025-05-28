import { type VariantProps, cva } from "class-variance-authority";

export { default as Message } from "./Message.vue";

export const messageVariants = cva(
  "flex items-center w-full gap-4 overflow-hidden p-4 rounded-primary border border-solid text-start font-medium",
  {
    variants: {
      type: {
        error:
          "bg-opacity-15 border-opacity-20 border-red-500 bg-red-500 text-red-500",
        success:
          "bg-opacity-15 border-opacity-20 border-green-500 bg-green-500 text-green-500",
        info: "bg-opacity-15 border-opacity-20 border-blue-500 bg-blue-500 text-blue-500",
        default:
          "bg-opacity-15 bg-primary-500 border-primary-500 text-primary-500",
      },
    },
    defaultVariants: {
      type: "info",
    },
  },
);

export type MessageVariants = VariantProps<typeof messageVariants>;
