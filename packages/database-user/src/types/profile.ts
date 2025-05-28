import type { Document, Model, Types } from "mongoose";

export interface UserProfileSchema extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  surname: string;
  name: string;
  avatar: {
    url: string;
    fallback: string;
  };
  banner: {
    url: string;
  };
  description: string;
  followers: { user: UserProfileSchema[]; date: Date }[];
}

export interface UserProfileModel extends Model<UserProfileSchema> {
  findByIdOrUsername: (
    id: string,
    options: { throwError?: boolean },
  ) => Promise<UserProfileSchema>;
}
