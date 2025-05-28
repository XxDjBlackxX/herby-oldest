import { Schema, Types } from "mongoose";

import { connection } from "@repo/user-db/connection";
import type { UserHistoryModel, UserHistorySchema } from "@repo/user-db/types";

const broadcastItemSchema = new Schema({
  id: { type: String, required: true, index: true },
  audio: { type: String, required: true },
  thumbnail: { type: String, required: true },
  title: { type: String, required: true },
  sender: { type: String, required: true, index: true },
  env: { type: String, required: true },
  orbit: { type: Number, default: 0, index: true },
  createdAt: { type: Date, default: Date.now, index: true },
});

const userHistorySchema = new Schema<UserHistorySchema>(
  {
    user: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    soundbites: {
      broadcast: [broadcastItemSchema],
    },
  },
  {
    timestamps: true,
    autoIndex: true,
  },
);

userHistorySchema.index({ user: 1, "soundbites.broadcast.createdAt": -1 });
userHistorySchema.index({
  "soundbites.broadcast.sender": 1,
  "soundbites.broadcast.env": 1,
});
userHistorySchema.index({ "soundbites.broadcast.createdAt": -1 });

export const UserHistory = connection.model<
  UserHistorySchema,
  UserHistoryModel
>("history", userHistorySchema);
