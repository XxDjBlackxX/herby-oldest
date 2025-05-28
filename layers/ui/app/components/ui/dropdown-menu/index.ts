import { type VariantProps, cva } from "class-variance-authority";

export { DropdownMenuPortal } from "reka-ui";

export { default as DropdownMenu } from "./DropdownMenu.vue";
export { default as DropdownMenuTrigger } from "./DropdownMenuTrigger.vue";
export { default as DropdownMenuContent } from "./DropdownMenuContent.vue";
export { default as DropdownMenuItem } from "./DropdownMenuItem.vue";
export { default as DropdownMenuSeparator } from "./DropdownMenuSeparator.vue";
export { default as DropdownMenuLabel } from "./DropdownMenuLabel.vue";

export const dropdownMenuItemVariants = cva(
  "transition-all cursor-pointer flex items-center justify-start overflow-hidden w-full px-2 py-2 outline-none rounded-primary gap-2 font-medium whitespace-nowrap group text-typography-500",
  {
    variants: {
      variant: {
        secondary: "hover:bg-surface-300 hover:text-typography-50",
        primary:
          "hover:bg-primary-500 hover:text-primary-foreground data-[active=true]:bg-primary-500 data-[active=true]:text-primary-foreground",
        danger:
          "hover:bg-red-500 hover:text-white data-[active=true]:bg-red-500 data-[active=true]:text-white",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export type DropdownMenuItemVariants = VariantProps<
  typeof dropdownMenuItemVariants
>;
