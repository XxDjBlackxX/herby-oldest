import { Schema, Types } from "mongoose";
import autoPopulatePlugin from "mongoose-autopopulate";

import { connection } from "@repo/user-db/connection";
import type { UserPaymentModel, UserPaymentSchema } from "@repo/user-db/types";

import { Currency } from "@repo/financial-db";

const userPaymentSchema = new Schema<UserPaymentSchema>(
  {
    user: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    currency: {
      type: Types.ObjectId,
      ref: Currency,
      autopopulate: true,
    },
    orbit: {
      available: {
        type: Number,
        default: 0,
      },
      pending: {
        type: Number,
        default: 0,
      },
      withdrawable: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true },
);

userPaymentSchema.plugin(autoPopulatePlugin);
userPaymentSchema.plugin(Currency.checkCurrencyPlugin, {
  location: "currency",
});

export const UserPayment = connection.model<
  UserPaymentSchema,
  UserPaymentModel
>("payment", userPaymentSchema);
