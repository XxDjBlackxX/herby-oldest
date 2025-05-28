export * from "./config";
export * from "./schemas/user.schema";
export * from "./schemas/soundbite.schema";
export * from "./schemas/application.schema";
export * from "./schemas/address.schema";
export * from "./schemas/paymentCard.schema";
export * from "./schemas/currency.schema";
export * from "./schemas/finance.schema";

import { z } from "zod";

export const isNumberCommission = (messages?: {
  required_error?: string;
  message?: string;
}) => {
  const { required_error, message } = {
    required_error: "You have to enter commission",
    message: "The commission number you enter can be 1 or 0.",
    ...messages,
  };

  return z.number({ required_error }).min(0, message).max(1, message);
};
