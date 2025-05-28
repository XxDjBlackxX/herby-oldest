import type { Document, Model, Types } from "mongoose";

export interface UserAnalyticalSoundbitesBroadcastSchema {
  name: string;
  saleCount: number;
  testCount: number;
  updatedAt: Date;
}

export interface UserAnalyticalSchema extends Document {
  user: Types.ObjectId;
  soundbites: {
    broadcast: UserAnalyticalSoundbitesBroadcastSchema[];
  };
}

export interface UserAnalyticalModel extends Model<UserAnalyticalSchema> {}
