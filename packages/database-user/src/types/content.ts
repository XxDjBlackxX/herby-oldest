import type { Document, Model, Types } from "mongoose";

export interface UserContentSchema extends Document {
  user: Types.ObjectId;
  _id: Types.ObjectId;
  soundbites: {
    liked: Types.ObjectId[];
    created: Types.ObjectId[];
    broadcast: {
      orbit: number;
      title: string;
      id: string;
      audio: string;
      thumbnail: string;
      createdAt: Date;
    }[];
  };
}

export type UserContentGetPopulates =
  | "soundbites.created"
  | "soundbites.liked"
  | "soundbites.broadcast";

export interface UserContentModel extends Model<UserContentSchema> {
  getPopulates(...o: UserContentGetPopulates[]): {
    path: string;
    populate?: {
      path: string;
      model: any;
      populate?: any[];
      options?: { lean: boolean };
    }[];
    options?: { lean: boolean };
  }[];
}
