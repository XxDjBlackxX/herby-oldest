import type { Document, Model, Types } from "mongoose";

import type { UserSchema } from "@repo/user-db/types";

export interface UserIdentitySchema extends Document {
  _id: Types.ObjectId;
  user: UserSchema;
  email: string;
  password: string;
  gsm: {
    countryCode: string;
    number: string;
  };
  identifyNumber: string;
  protection: {
    login: boolean;
  };
  comparePassword: (password: string) => Promise<boolean>;
}

export interface UserIdentityModel extends Model<UserIdentitySchema> {
  checkEmail(email: string): Promise<boolean>;
}
