import { generateHash } from "@xjectro/express-crypto";
import { Schema, Types } from "mongoose";
import { createAvatarURL, createPassword } from "@repo/helpers-utils";

import { connection } from "@repo/user-db/connection";
import {
  UserHistory,
  UserAnalytical,
  UserContent,
  UserIdentity,
  UserPayment,
  UserProfile,
} from "@repo/user-db/models";
import type {
  UserModel,
  UserSchema,
  CreateUser,
  UserGetPopulates,
} from "@repo/user-db/types";

import {
  PERMISSIONS,
  combinePermissions,
  hasPermission,
  type Permission,
} from "@repo/permission-utils";
import { NotFoundError, UnauthorizedError } from "@xjectro/express/exceptions";

const userSchema = new Schema<UserSchema>(
  {
    id: { type: String, unique: true, required: true, index: true },
    username: { type: String, required: true, index: true },
    permission: {
      type: Number,
      default: () => combinePermissions(PERMISSIONS.user),
    },
    connections: [
      {
        type: Types.ObjectId,
        ref: "connection",
        index: true,
      },
    ],
    identity: { type: Types.ObjectId, ref: "identity" },
    payment: { type: Types.ObjectId, ref: "payment" },
    content: { type: Types.ObjectId, ref: "content" },
    analytical: { type: Types.ObjectId, ref: "analytical" },
    history: { type: Types.ObjectId, ref: "history" },
    profile: { type: Types.ObjectId, ref: "profile" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.index({ username: 1, id: 1 });
userSchema.index({ permission: 1 });
userSchema.index({ createdAt: 1 });
userSchema.index({ updatedAt: 1 });

userSchema.methods.verifyPermission = async function (
  perm: Permission,
): Promise<boolean> {
  if (!hasPermission(this.permission, perm)) {
    throw new UnauthorizedError("User role is insufficient");
  }
  return true;
};

userSchema.statics.getPopulates = function (...args: UserGetPopulates[]) {
  const populates = new Map([
    ["history", { path: "history", model: "history" }],
    [
      "content.soundbites.liked",
      {
        path: "content",
        populate: UserContent.getPopulates("soundbites.liked"),
      },
    ],
    [
      "content.soundbites.created",
      {
        path: "content",
        populate: UserContent.getPopulates("soundbites.created"),
      },
    ],
    [
      "content.soundbites.broadcast",
      {
        path: "content",
        populate: UserContent.getPopulates("soundbites.broadcast"),
      },
    ],
    ["payment", { path: "payment", model: "payment" }],
    ["content", { path: "content", model: "content" }],
    ["identity", { path: "identity", model: "identity" }],
    ["profile", { path: "profile", model: "profile" }],
    ["connections", { path: "connections", model: "connection" }],
  ]);

  return args.map((arg) => populates.get(arg));
};

userSchema.statics.findByIdOrUsername = async function (
  id: string,
  options: { throwError?: boolean } = {},
): Promise<UserSchema | null> {
  const schema = await this.findOne({
    $or: [{ id }, { username: id }],
  }).exec();

  if (!schema && options.throwError) {
    throw new NotFoundError(`${this.modelName} is not found!`);
  }

  return schema;
};

userSchema.statics.createUser = async function (
  data: CreateUser,
): Promise<Types.ObjectId> {
  let user;
  try {
    const id = generateHash("hex", data as any);
    const avatarURL = createAvatarURL();

    user = new User({
      id,
      username: data.username,
    });

    const profile = new UserProfile({
      user: user._id,
      name: data.name,
      surname: data.surname,
      followers: [],
      avatar: {
        url: avatarURL,
        fallback: `${data.name?.slice(0, 1).toUpperCase()}${data.surname?.slice(0, 1).toUpperCase()}`,
      },
    });

    const identity = new UserIdentity({
      user: user._id,
      email: data.email,
      password: data.password || createPassword(),
    });

    const payment = new UserPayment({
      user: user._id,
    });

    const content = new UserContent({ user: user._id });
    const analytical = new UserAnalytical({ user: user._id });
    const history = new UserHistory({ user: user._id });

    await Promise.all([
      identity.save(),
      payment.save(),
      content.save(),
      analytical.save(),
      history.save(),
      profile.save(),
    ]);

    Object.assign(user, {
      identity: identity._id,
      payment: payment._id,
      content: content._id,
      analytical: analytical._id,
      history: history._id,
      profile: profile._id,
    });

    await user.save();
    return user._id;
  } catch (error) {
    if (user) {
      try {
        await Promise.all([
          User.deleteOne({ _id: user._id }),
          UserProfile.deleteOne({ user: user._id }),
          UserIdentity.deleteOne({ user: user._id }),
          UserPayment.deleteOne({ user: user._id }),
          UserContent.deleteOne({ user: user._id }),
          UserAnalytical.deleteOne({ user: user._id }),
          UserHistory.deleteOne({ user: user._id }),
        ]);
      } catch (cleanupError) {
        console.error("Cleanup error:", cleanupError);
      }
    }
    throw error;
  }
};

export const User = connection.model<UserSchema, UserModel>("user", userSchema);
