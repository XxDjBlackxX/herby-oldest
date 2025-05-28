import type { SoundbiteSchema } from "@repo/content-db";

export interface Soundbite extends SoundbiteSchema {
  requesting: {
    isLiked: boolean;
    isBroadcast: boolean;
    owner: boolean;
  };
  likeCount: number;
  createdAt: Date;
}

export interface HistoryBroadcastSoundbite extends Soundbite {
  orbit: number;
  env: string;
  sender: string;
}

export interface ContentBroadcastSoundbite extends Soundbite {
  orbit: number;
  env: string;
  sender: string;
}

export interface ContentBroadcastSoundbite extends Soundbite {
  orbit: number;
}

export interface DiscoverSoundbite extends Soundbite {}
