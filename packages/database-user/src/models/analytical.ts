import { Schema } from "mongoose";

import { connection } from "@repo/user-db/connection";
import type {
  UserAnalyticalSoundbitesBroadcastSchema,
  UserAnalyticalModel,
  UserAnalyticalSchema,
} from "@repo/user-db/types";

const broadcastSchema = new Schema<UserAnalyticalSoundbitesBroadcastSchema>(
  {
    name: { type: String, required: true },
    saleCount: { type: Number, default: 0 },
    testCount: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    _id: false,
    timestamps: false,
  },
);

const userAnalyticalSchema = new Schema<UserAnalyticalSchema>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    soundbites: {
      type: { broadcast: [broadcastSchema] },
      default: { broadcast: [] },
    },
  },
  {
    timestamps: true,
    strict: true,
    autoIndex: false,
  },
);

userAnalyticalSchema.index(
  { user: 1, "soundbites.broadcast.name": 1 },
  { background: true },
);
userAnalyticalSchema.index(
  { "soundbites.broadcast.updatedAt": -1 },
  { background: true },
);

userAnalyticalSchema.set("toJSON", { getters: true, virtuals: false });
userAnalyticalSchema.set("toObject", { getters: true, virtuals: false });

export const UserAnalytical = connection.model<
  UserAnalyticalSchema,
  UserAnalyticalModel
>("analytical", userAnalyticalSchema);
