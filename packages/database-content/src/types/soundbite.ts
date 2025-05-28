import type { Document, Model, Types } from "mongoose";

export interface SoundbiteSchema extends Document {
  title: string;
  tags: string[];
  likers: { user: Types.ObjectId; insertedAt: Date }[];
  broadcasters: { user: Types.ObjectId; insertedAt: Date }[];
  id: string;
  audio: string;
  thumbnail: string;
  visibility: "public" | "private";
  author: Types.ObjectId;
  _id: Types.ObjectId;
  likeCount: number;
  broadcasterCount: number;
}

export interface FunctionOptionsItemContain {
  broadcast: any[];
  liked: any[];
  created: any[];
}

export interface FormatSoundbiteData {
  item: any;
  contain?: FunctionOptionsItemContain | null;
  custom?: {
    owner?: boolean | null;
    isLiked?: boolean | null;
    isBroadcast?: boolean | null;
  };
}

export interface ListSoundbites {
  contain?: FunctionOptionsItemContain | null;
  limit?: any;
  filters: { name: string; query?: string }[] | string[];
}

type SoundbiteGetPopulates = "author" | "likers" | "broadcasters";

export interface SoundbiteModel extends Model<SoundbiteSchema> {
  validateVisibility: (visibility: string) => void;
  getPopulates(
    ...o: SoundbiteGetPopulates[]
  ): { path: string; model: string }[];
  formatSoundbiteData: ({}: FormatSoundbiteData) => any;
  listSoundbites: ({}: ListSoundbites) => Promise<any>;
}
