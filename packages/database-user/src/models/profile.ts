import { Schema, Types } from "mongoose";

import { connection } from "@repo/user-db/connection";
import type { UserProfileSchema, UserProfileModel } from "@repo/user-db/types";

import { NotFoundError } from "@xjectro/express/exceptions";
import { createAvatarURL, createBannerURL } from "@repo/helpers-utils";

const userProfileSchema = new Schema<UserProfileSchema>(
  {
    user: { type: Schema.ObjectId, ref: "user" },
    avatar: {
      url: String,
      fallback: String,
    },
    banner: {
      url: { type: String, default: createBannerURL },
    },
    description: { type: String, default: "" },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    followers: [
      {
        user: { type: Types.ObjectId, ref: "user" },
        date: Date,
      },
    ],
  },
  { timestamps: true },
);

userProfileSchema.index({ user: 1 });
userProfileSchema.index({ "followers.user": 1 });
userProfileSchema.index({ id: 1, username: 1 });

userProfileSchema.statics.findByIdOrUsername = async function (
  id: string,
  options: { throwError?: boolean } = {},
) {
  const schema = await this.findOne({
    $or: [{ id }, { username: id }],
  });
  if (!schema && options.throwError)
    throw new NotFoundError(`${this.modelName} is not found!`);
  return schema;
};

userProfileSchema.pre<UserProfileSchema>("save", function (next) {
  if (!this.avatar.url) {
    this.avatar.url = this.avatar.url ? this.avatar.url : createAvatarURL();
  }
  if (!this.banner.url) {
    this.banner.url = this.banner.url ? this.banner.url : createBannerURL();
  }
  next();
});

export const UserProfile = connection.model<
  UserProfileSchema,
  UserProfileModel
>("profile", userProfileSchema);
