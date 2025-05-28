import { Schema, Types } from "mongoose";

import { connection } from "@repo/user-db/connection";
import type { UserContentModel, UserContentSchema } from "@repo/user-db/types";

import { Soundbite } from "@repo/content-db/models";

const broadcastSoundbiteSchema = new Schema(
  {
    id: { type: String, required: true },
    audio: { type: String, required: true },
    thumbnail: { type: String, required: true },
    title: { type: String, required: true },
    orbit: { type: Number, default: 50 },
  },
  { timestamps: true },
);

const userContentSchema = new Schema<UserContentSchema>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    soundbites: {
      type: {
        liked: [{ type: Types.ObjectId, ref: Soundbite, autopopulate: true }],
        created: [{ type: Types.ObjectId, ref: Soundbite, autopopulate: true }],
        broadcast: [broadcastSoundbiteSchema],
      },
      default: {
        liked: [],
        created: [],
        broadcast: [],
      },
    },
  },
  {
    timestamps: true,
    minimize: false,
    validateBeforeSave: true,
    strict: true,
  },
);

userContentSchema.index({ user: 1, "soundbites.liked": 1 });
userContentSchema.index({ user: 1, "soundbites.created": 1 });
userContentSchema.index(
  { user: 1, "soundbites.broadcast.id": 1 },
  { sparse: true },
);
userContentSchema.index({ "soundbites.broadcast.createdAt": -1 });

userContentSchema.statics.getPopulates = function (...args: string[]) {
  const populates = new Map([
    [
      "soundbites.liked",
      {
        path: "soundbites",
        model: Soundbite,
        populate: [
          {
            path: "liked",
            model: Soundbite,
            populate: Soundbite.getPopulates("author"),
            options: { lean: true },
          },
        ],
      },
    ],
    [
      "soundbites.created",
      {
        path: "soundbites",
        model: Soundbite,
        populate: [
          {
            path: "created",
            model: Soundbite,
            populate: Soundbite.getPopulates("author"),
            options: { lean: true },
          },
        ],
      },
    ],
    [
      "soundbites.broadcast",
      {
        path: "soundbites",
        options: { lean: true },
      },
    ],
  ]);

  return args.map((arg) => populates.get(arg));
};

userContentSchema.pre("find", function () {
  if (!this.getOptions().select) {
    this.select("-__v");
  }
});

export const UserContent = connection.model<
  UserContentSchema,
  UserContentModel
>("content", userContentSchema);
