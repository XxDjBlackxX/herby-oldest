import {
  CurrencySchema,
  PaymentSchema,
  TransactionSchema,
} from "@repo/financial-db";

export interface Payment extends PaymentSchema {}
export interface Transaction extends TransactionSchema {}
export interface Currency extends CurrencySchema {}
