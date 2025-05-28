import bcrypt from "bcryptjs";
import { Schema, Types } from "mongoose";

import { connection } from "@repo/user-db/connection";
import type {
  UserIdentityModel,
  UserIdentitySchema,
} from "@repo/user-db/types";

const userIdentitySchema = new Schema<UserIdentitySchema>(
  {
    user: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    gsm: {
      countryCode: {
        type: String,
        default: "99",
      },
      number: {
        type: String,
        default: "111111111",
      },
    },
    identifyNumber: {
      type: String,
      default: "11111111111",
    },
    protection: {
      login: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userIdentitySchema.index({ "gsm.countryCode": 1, "gsm.number": 1 });
userIdentitySchema.index({ "verification.email": 1 });
userIdentitySchema.index({ "verification.gsm": 1 });
userIdentitySchema.index({ "protection.twoFactor.enabled": 1 });

userIdentitySchema.pre<UserIdentitySchema>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userIdentitySchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password).catch(() => false);
};

userIdentitySchema.statics.checkEmail = async function (
  email: string,
): Promise<boolean> {
  return !!(await this.findOne({ email }).lean());
};

export const UserIdentity = connection.model<
  UserIdentitySchema,
  UserIdentityModel
>("identity", userIdentitySchema);
