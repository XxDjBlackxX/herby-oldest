import type { Document, Model, Types } from "mongoose";

import type { CurrencyType } from "@repo/financial-db/types";

import type { UserSchema } from "@repo/user-db";

export interface TransactionPayeeSchema extends Document {
  iban: string;
  fullName: string;
}

export interface TransactionSchema extends Document {
  id: string;
  author: UserSchema | Types.ObjectId;
  amount: number;
  type: "income" | "expense" | "withdraw";
  status: "success" | "pending" | "failed" | "canceled";
  currency: CurrencyType;
  payee?: TransactionPayeeSchema;
  priority: "high" | "normal" | "low";
}

export interface TransactionCreateFunction {
  author: TransactionSchema["author"];
  amount: TransactionSchema["amount"];
  type: TransactionSchema["type"];
  currency: TransactionSchema["currency"];
  status?: TransactionSchema["status"];
  payee?: TransactionSchema["payee"];
  priority?: TransactionSchema["priority"];
}

export interface ListTransactions {
  limit: { after: number; before: number };
  filter: {
    status?: TransactionSchema["status"];
    author?: any;
    priority?: TransactionSchema["priority"];
  };
  populate?: "author"[];
}

export interface TransactionModel extends Model<TransactionSchema> {
  createTransaction(
    data: TransactionCreateFunction,
  ): Promise<TransactionSchema>;
  getTransaction(id: string): Promise<TransactionSchema>;
  listTransactions(
    options: ListTransactions,
  ): Promise<{ transactions: TransactionSchema[]; total: number }>;
}
