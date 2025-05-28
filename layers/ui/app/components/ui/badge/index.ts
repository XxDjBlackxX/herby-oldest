import { type VariantProps, cva } from "class-variance-authority";

export { default as Badge } from "./Badge.vue";

export const badgeVariants = cva(
  "flex items-center justify-center w-fit gap-2 whitespace-nowrap px-2 py-1 cursor-pointer rounded-primary",
  {
    variants: {
      variant: {
        pending: "bg-orange-500/30 border border-orange-500/50 text-orange-300",
        canceled: "bg-red-500/30 border border-red-500/50 text-red-300",
        success: "bg-green-500/30 border border-green-500/50 text-green-300",
        failed: "bg-red-500/30 border border-red-500/50 text-red-300",
        supervisory:
          "bg-fuchsia-500/30 border border-fuchsia-500/50 text-fuchsia-300",
        secondary:
          "bg-surface-200 border border-surface-400 text-typography-500",
        admin: "bg-indigo-500/30 border border-indigo-500/50 text-indigo-300",
        user: "bg-surface-200 border border-surface-400 text-typography-500",
        financier:
          "bg-yellow-500/30 border border-yellow-500/50 text-yellow-300",
        moderator: "bg-blue-500/30 border border-blue-500/50 text-blue-300",
        broadcaster: "bg-teal-500/30 border border-teal-500/50 text-teal-500",
        "in-progress": "bg-blue-500/30 border border-blue-500/50 text-blue-300",
      },
    },
    defaultVariants: {
      variant: "pending",
    },
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
