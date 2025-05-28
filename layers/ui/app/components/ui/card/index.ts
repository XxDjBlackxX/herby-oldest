import { cva, type VariantProps } from "class-variance-authority";

export { default as Card } from "./Card.vue";
export { default as CardContent } from "./CardContent.vue";
export { default as CardDescription } from "./CardDescription.vue";
export { default as CardFooter } from "./CardFooter.vue";
export { default as CardHeader } from "./CardHeader.vue";
export { default as CardTitle } from "./CardTitle.vue";
export { default as ViewportCard } from "./ViewportCard.vue";
export { default as CardSeparator } from "./CardSeparator.vue";
export { default as CardSubCard } from "./CardSubCard.vue";
export { default as IntroductionCard } from "./IntroductionCard.vue";

export type ViewportCardProps = {
  label?: string | null;
  sublabel?: string | null;
  class?: string | null;
  border?: boolean;
  hypertext?: boolean;
};

export const cardTitleVariant = cva(
  "leading-none tracking-tight text-typography-50",
  {
    variants: {
      size: {
        sm: "text-base font-medium",
        md: "text-2xl font-bold",
        xl: "text-3xl font-bold",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

export const cardDescriptionVariant = cva(
  "font-medium leading-none tracking-tight",
  {
    variants: {
      size: {
        sm: "text-sm font-light text-typography-500",
        md: "text-sm font-light text-typography-500",
        xl: "text-lg font-medium text-typography-400",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

export type CardTitleVariants = VariantProps<typeof cardTitleVariant>;
export type CardDescriptionVariants = VariantProps<
  typeof cardDescriptionVariant
>;
