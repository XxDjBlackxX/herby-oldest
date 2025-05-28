import type { Schema, Document, Model, Types } from "mongoose";

export interface CurrencyType {
  code: string;
  symbol: string;
  name: string;
  rate: number;
}

export interface CurrencySchema extends CurrencyType, Document {
  id: string;
  _id: Types.ObjectId;
}

export interface CheckCurrencyPluginOptions {
  location: string;
}

export interface ConvertToBaseRate {
  rate: CurrencyType["rate"];
  amount: number;
}

export interface ConvertToBaseResponse {
  convertedAmount: number;
  baseCurrency: CurrencySchema;
}

export interface CurrencyModel extends Model<CurrencySchema> {
  getCurrencies(): Promise<{
    currencies: CurrencySchema[];
    total: number;
    baseCurrency: CurrencySchema;
  }>;
  getBaseCurrency(): Promise<CurrencySchema>;
  getPlatformCurrency(): Promise<CurrencySchema>;
  hasCurrency(_id: any): Promise<boolean>;
  checkCurrencyPlugin(
    schema: Schema,
    options: CheckCurrencyPluginOptions,
  ): void;
  convertToBaseRate({}: ConvertToBaseRate): Promise<ConvertToBaseResponse>;
}
