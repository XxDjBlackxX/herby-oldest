import type { Model, Document, Types } from "mongoose";

import type { CurrencySchema } from "@repo/financial-db/types";

export interface UserPaymentSchema extends Document {
  user: any;
  currency: CurrencySchema;
  orbit: {
    available: number;
    pending: number;
    withdrawable: number;
  };
  _id: Types.ObjectId;
}

export interface UserPaymentModel extends Model<UserPaymentSchema> {}
