export { default as LinkPreview } from "./LinkPreview.vue";

export type LinkPreviewProps = {
  url: string;
  quality?: number;
  isStatic?: boolean;
  imageSrc?: string;
};
