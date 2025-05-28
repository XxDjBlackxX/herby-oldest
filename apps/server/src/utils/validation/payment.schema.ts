import { z } from "zod";

export const cryptomus = {
  payment: z.object({
    amount: z
      .number({ required_error: "Amount is required" })
      .min(4, { message: "Amount must be at least 4." })
      .max(500, { message: "Amount must not exceed 500." }),
  }),
};

export const payout = z.object({
  destination: z.string(),
  category: z.string(),
});
