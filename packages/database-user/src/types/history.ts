import type { Document, Model, Types } from "mongoose";

export interface UserHistorySchema extends Document {
  user: any;
  _id: Types.ObjectId;
  soundbites: {
    broadcast: {
      sender: string;
      env: string;
      orbit: number;
      title: string;
      id: string;
      audio: string;
      thumbnail: string;
      createdAt: Date;
    }[];
  };
}

export interface UserHistoryModel extends Model<UserHistorySchema> {}
