import { Schema, Types } from "mongoose";

import { connection } from "@repo/content-db/connection";
import type {
  ApplicationSchema,
  ApplicationModel,
  ListApplications,
} from "@repo/content-db/types";

import { User } from "@repo/user-db";
import { NotFoundError } from "@xjectro/express/exceptions";

const applicationSchema = new Schema<ApplicationSchema>(
  {
    author: {
      type: Types.ObjectId,
      required: true,
    },
    supervisory: {
      type: Types.ObjectId,
      default: null,
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ["broadcaster"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "success", "canceled", "in-progress"],
      default: "pending",
    },
    detail: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true },
);

applicationSchema.statics.listApplications = async function listApplications({
  limit,
  filter,
  populate,
}: ListApplications): Promise<any> {
  // @ts-ignore
  var populates = [];

  if (populate.includes("author")) {
    // @ts-ignore
    populates.push({
      path: "author",
      model: User,
      select: "username id profile",
      populate: [{ path: "profile", model: "profile", select: "avatar" }],
    });
  }

  if (populate.includes("supervisory")) {
    // @ts-ignore
    populates.push({
      path: "supervisory",
      model: User,
      select: "username id",
    });
  }

  let payload: any = {};

  if (filter.status == "success") {
    payload = {
      $or: [{ status: "canceled" }, { status: "success" }],
    };
  } else if (filter.status !== undefined) {
    payload = { status: filter.status };
  }

  if (filter.author !== undefined) {
    payload.author = Types.ObjectId.isValid(filter.author)
      ? filter.author
      : (await User.findOne({ user: filter.author }))?._id;
    if (!payload.author) {
      throw new NotFoundError("User not found!");
    }
  }

  const applications = await Application.find(payload)
    .sort({ createdAt: -1 })
    .skip(limit.after)
    .limit(limit.before > 0 ? limit.before - limit.after : 10)
    /**@ts-ignore */
    .populate(populates)
    .lean();

  if (!applications) {
    throw new NotFoundError("Applications not found");
  }

  const total = await Application.countDocuments(payload);

  return {
    applications: applications.map((a) => ({
      ...a,
      author: {
        id: a.author?.id,
        username: a.author?.username,
        avatar: a.author?.profile?.avatar,
      },
    })),
    total,
  };
};

export const Application = connection.model<
  ApplicationSchema,
  ApplicationModel
>("application", applicationSchema);
