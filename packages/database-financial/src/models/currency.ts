import { Schema, Types } from "mongoose";
import { v4 as uuidV4 } from "uuid";

import { connection } from "@repo/financial-db/connection";
import type {
  CurrencySchema,
  CurrencyModel,
  CheckCurrencyPluginOptions,
  ConvertToBaseRate,
} from "@repo/financial-db/types";

const currencySchema = new Schema(
  {
    id: { type: String, default: uuidV4 },
    code: { type: String, required: true, unique: true },
    symbol: { type: String, required: true },
    name: { type: String, required: true },
    rate: { type: Number, required: true },
  },
  { timestamps: true },
);

currencySchema.statics.getCurrencies = async function () {
  const currencies = await this.find();
  if (!currencies || currencies.length === 0) return [];
  const baseCurrency = currencies.find((c: CurrencySchema) => c.rate === 1);
  if (!baseCurrency) return [];
  return { currencies: currencies, total: currencies.length, baseCurrency };
};

currencySchema.statics.getBaseCurrency = async function () {
  const baseCurrency = await this.findOne({ rate: 1 });
  if (!baseCurrency) return null;
  return baseCurrency;
};

currencySchema.statics.convertToBaseRate = async function ({
  rate,
  amount,
}: ConvertToBaseRate) {
  const baseCurrency = await Currency.getBaseCurrency();
  const convertedAmount = (amount * (rate / baseCurrency.rate)).toFixed(2);
  return { convertedAmount, baseCurrency };
};

currencySchema.statics.hasCurrency = async function (_id: any) {
  if (!Types.ObjectId.isValid(_id)) {
    return false;
  }
  try {
    return await this.exists({ _id });
  } catch {
    return false;
  }
};

currencySchema.statics.checkCurrencyPlugin = function (
  schema: Schema,
  options: CheckCurrencyPluginOptions,
) {
  schema.pre("init", async function (doc: any) {
    const has = await Currency.hasCurrency(doc[options.location]);
    if (doc && !has) {
      const baseCurrency = await Currency.getBaseCurrency();
      if (!baseCurrency) return;
      this[options.location] = baseCurrency._id;
      await this.save();
    }
  });
};

export const Currency = connection.model<CurrencySchema, CurrencyModel>(
  "currency",
  currencySchema,
);
