export { default as VideoPlayer } from "./VideoPlayer.vue";
export { default as AudioPlayer } from "./AudioPlayer.vue";

export type VideoPlayerProps = {
  src: File | string | null;
  controls?: boolean;
  class?: string;
  currentTime?: number;
  playing?: boolean;
  duration?: number;
};

export type VideoPlayerEmits = {
  "update:currentTime"?: [number];
  "update:playing"?: [boolean];
  "update:duration"?: [number];
};

export type AudioPlayerProps = {
  src: File | string | null;
  class?: string;
  currentTime?: number;
  playing?: boolean;
  duration?: number;
};

export type AudioPlayerEmits = {
  "update:currentTime"?: [number];
  "update:playing"?: [boolean];
  "update:duration"?: [number];
};
