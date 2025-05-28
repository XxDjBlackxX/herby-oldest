import cron from "node-cron";
import { v4 as uuidV4 } from "uuid";
import { Schema, Types } from "mongoose";

import { connection } from "@repo/financial-db/connection";
import { Currency } from "@repo/financial-db/models";
import type {
  PaymentBasketItem,
  PaymentCreateFunction,
  PaymentModel,
  PaymentSchema,
  ListPayments,
  PaymentCheckFunction,
} from "@repo/financial-db/types";

import { NotFoundError, UnauthorizedError } from "@xjectro/express/exceptions";
import { User } from "@repo/user-db";

const basketItemSchema = new Schema<PaymentBasketItem>(
  {
    id: { type: String, default: uuidV4 },
    name: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    price: { type: Number, required: true },
    event: {
      name: { type: String, required: true },
      data: { type: Schema.Types.Mixed, required: false },
    },
    type: { type: String, enum: ["virtual", "physical"], required: true },
  },
  { _id: false },
);

const paymentSchema = new Schema<PaymentSchema>(
  {
    id: { type: String, default: uuidV4 },
    author: { type: Types.ObjectId, required: true },
    status: {
      type: String,
      enum: ["pending", "success", "failed", "canceled"],
      default: "pending",
    },
    currency: { type: Types.ObjectId, ref: Currency },
    totalPrice: { type: Number, required: true },
    basketItems: [basketItemSchema],
  },
  { timestamps: true },
);

paymentSchema.index({ status: 1, tested: 1, createdAt: 1 });

paymentSchema.plugin(Currency.checkCurrencyPlugin, { location: "currency" });

paymentSchema.statics.createPayment = async function ({
  author,
  status = "pending",
  basketItems,
  currency,
}: PaymentCreateFunction): Promise<PaymentSchema> {
  const totalPrice = basketItems.reduce((total, item) => total + item.price, 0);
  const payment = new Payment({
    author,
    status,
    basketItems,
    currency,
    totalPrice,
  });
  await payment.save();
  return payment;
};

paymentSchema.statics.checkPayment = async function ({
  id,
  requester,
}: PaymentCheckFunction): Promise<PaymentSchema> {
  const payment = await Payment.findOne({ id });
  if (!payment) {
    throw new NotFoundError("Payment not found");
  }
  if (payment.author.toString() !== requester.toString()) {
    throw new UnauthorizedError("Only the owner can view this payment");
  }
  return payment;
};

paymentSchema.statics.listPayments = async function ({
  limit,
  filter,
  populate,
}: ListPayments): Promise<{ payments: PaymentSchema[]; total: number }> {
  const query: any = {};

  if (filter.status) {
    query.status = filter.status;
  }
  if (filter.author) {
    query.author = Types.ObjectId.isValid(filter.author)
      ? filter.author
      : (await User.findOne({ user: filter.author }))?._id;
    if (!query.author) {
      throw new NotFoundError("User not found!");
    }
  }

  let queryExec = Payment.find(query)
    .sort({ createdAt: -1 })
    .skip(limit.after)
    .limit(limit.before > limit.after ? limit.before - limit.after : 10);

  if (populate?.includes("author")) {
    queryExec = queryExec.populate({
      path: "author",
      model: User,
      select: "username id profile",
      populate: { path: "profile", model: "profile", select: "avatar" },
    });
  }

  queryExec.populate({ path: "currency", model: Currency });

  const payments = await queryExec.lean();
  const total = await Payment.countDocuments(query);
  return { payments, total };
};

cron.schedule("*/10 * * * *", async () => {
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
  const failedPayments = await Payment.updateMany(
    { status: "pending", createdAt: { $lte: twoHoursAgo } },
    { status: "failed" },
  );
  console.log(`${failedPayments.modifiedCount} payments marked as failed`);
});

export const Payment = connection.model<PaymentSchema, PaymentModel>(
  "payment",
  paymentSchema,
);
