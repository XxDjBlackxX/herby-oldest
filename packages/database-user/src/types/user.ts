import type { Model, Document, Types } from "mongoose";

import type {
  UserAnalyticalSchema,
  UserContentSchema,
  UserHistorySchema,
  UserPaymentSchema,
  UserProfileSchema,
  UserIdentitySchema,
} from "@repo/user-db/types";

import type { Permission } from "@repo/permission-utils";

export interface UserSchema extends Document {
  _id: Types.ObjectId;
  id: string;
  username: string;
  connections: Types.ObjectId[];
  identity: UserIdentitySchema;
  permission: Permission;
  payment: UserPaymentSchema;
  content: UserContentSchema;
  analytical: UserAnalyticalSchema;
  history: UserHistorySchema;
  profile: UserProfileSchema;
  createdAt: Date;
  updatedAt: Date;
  verifyPermission: (perm: Permission) => Promise<boolean>;
}

export interface CreateUser {
  username: string;
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
}

export type UserGetPopulates =
  | "history"
  | "content.soundbites.liked"
  | "content.soundbites.created"
  | "content.soundbites.broadcast"
  | "payment"
  | "content"
  | "identity"
  | "profile"
  | "profile.avatar"
  | "identity.email"
  | "connections";

export interface UserModel extends Model<UserSchema> {
  findByIdOrUsername(
    id: string,
    options?: { throwError?: boolean },
  ): Promise<UserSchema | null>;
  getPopulates(
    ...fields: UserGetPopulates[]
  ): Array<{ path: string; model: string; populate?: any[] }>;
  createUser(data: CreateUser): Promise<Types.ObjectId>;
}
