import type { Document, Model, Types } from "mongoose";

import type { CurrencySchema } from "@repo/financial-db/types";

import type { UserSchema } from "@repo/user-db";

export interface PaymentBasketItem {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  event: {
    name: string;
    data: object;
  };
  type: "virtual" | "physical";
}

export interface PaymentSchema extends Document {
  id: string;
  status: "pending" | "failed" | "canceled" | "success";
  author: UserSchema | Types.ObjectId;
  totalPrice: number;
  currency: CurrencySchema | Types.ObjectId;
  basketItems: PaymentBasketItem[];
}

export interface ListPayments {
  limit: { after: number; before: number };
  filter: {
    status?: PaymentSchema["status"];
    author?: UserSchema["_id"] | string;
  };
  populate?: "author"[];
}

export interface PaymentCreateFunction {
  author: PaymentSchema["author"];
  status?: PaymentSchema["status"];
  basketItems: PaymentBasketItem[];
  currency: PaymentSchema["currency"];
}

export interface PaymentCheckFunction {
  id: PaymentSchema["id"];
  requester: PaymentSchema["author"];
}

export interface PaymentModel extends Model<PaymentSchema> {
  createPayment(data: PaymentCreateFunction): Promise<PaymentSchema>;
  checkPayment(data: PaymentCheckFunction): Promise<PaymentSchema>;
  listPayments(
    options: ListPayments,
  ): Promise<{ payments: PaymentSchema[]; total: number }>;
}
