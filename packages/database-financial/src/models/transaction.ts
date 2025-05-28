import { v4 as uuidV4 } from "uuid";
import { Schema, Types } from "mongoose";

import { connection } from "@repo/financial-db/connection";
import type {
  TransactionPayeeSchema,
  TransactionModel,
  TransactionSchema,
  TransactionCreateFunction,
  ListTransactions,
} from "@repo/financial-db/types";

import { User } from "@repo/user-db";
import { NotFoundError } from "@xjectro/express/exceptions";

const payeeSchema = new Schema<TransactionPayeeSchema>({
  fullName: String,
  iban: String,
});

const transactionSchema = new Schema<TransactionSchema>(
  {
    id: { type: String, default: uuidV4 },
    author: { type: Types.ObjectId, required: true },
    amount: { type: Number, required: true },
    type: {
      type: String,
      enum: ["income", "expense", "withdraw"],
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "pending", "failed", "canceled"],
      default: "success",
    },
    currency: { type: Object },
    payee: { type: payeeSchema, required: false, default: null },
    priority: { type: String, enum: ["high", "normal", "low"], default: "low" },
  },
  { timestamps: true },
);

transactionSchema.index({ author: 1, createdAt: -1 });
transactionSchema.index({ status: 1, type: 1 });

transactionSchema.statics.createTransaction = async function (
  data: TransactionCreateFunction,
): Promise<TransactionSchema> {
  const transaction = new Transaction(data);
  await transaction.save();
  return transaction;
};

transactionSchema.statics.getTransaction = async function (
  id: string,
): Promise<TransactionSchema> {
  const transaction = await Transaction.findOne({ id }).populate("currency");
  if (!transaction) {
    throw new Error("Transaction not found");
  }
  return transaction;
};

transactionSchema.statics.listTransactions = async function ({
  limit,
  filter,
  populate,
}: ListTransactions): Promise<{
  transactions: TransactionSchema[];
  total: number;
}> {
  const query: any = {};

  if (filter.status) {
    query.status = filter.status;
  }
  if (filter.priority) {
    query.priority = filter.priority;
  }
  if (filter.author) {
    query.author = Types.ObjectId.isValid(filter.author)
      ? filter.author
      : (await User.findOne({ user: filter.author }))?._id;
    if (!query.author) {
      throw new NotFoundError("User not found!");
    }
  }

  let queryExec = Transaction.find(query)
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

  const transactions = await queryExec.lean();
  const total = await Transaction.countDocuments(query);
  return { transactions, total };
};

export const Transaction = connection.model<
  TransactionSchema,
  TransactionModel
>("transaction", transactionSchema);
