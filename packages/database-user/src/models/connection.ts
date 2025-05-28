import { Schema, Types } from "mongoose";

import { connection } from "@repo/user-db/connection";
import { User } from "@repo/user-db/models";
import type {
  UserConnectionModel,
  UserConnectionSchema,
} from "@repo/user-db/types";

const userConnectionSchema = new Schema<UserConnectionSchema>(
  {
    user: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    access_token: {
      type: String,
      required: true,
    },
    refresh_token: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      required: true,
    },
    data: {
      type: {
        id: String,
        name: String,
        username: String,
      },
      required: true,
    },
  },
  { timestamps: true },
);

userConnectionSchema.statics.connect = async function ({
  ...state
}: UserConnectionSchema) {
  const connection = await this.findOneAndUpdate(
    { user: state.user, type: state.type },
    {
      $set: { data: state.data },
      $setOnInsert: { access_token: state.access_token },
    },
    { upsert: true, new: true },
  );

  await User.updateOne(
    { _id: connection.user, connections: { $ne: connection._id } },
    { $push: { connections: connection._id } },
  );

  return connection;
};

userConnectionSchema.statics.disconnect = async function ({
  user,
  type,
}: {
  user: UserConnectionSchema["_id"];
  type: string;
}) {
  const connection = await this.findOne({ user, type });
  if (!connection) return false;

  await User.updateOne(
    { _id: connection.user },
    { $pull: { connections: connection._id } },
  );

  await connection.deleteOne();

  return connection;
};

export const UserConnection = connection.model<
  UserConnectionSchema,
  UserConnectionModel
>("connection", userConnectionSchema);
