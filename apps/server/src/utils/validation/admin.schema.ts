import { z } from "zod";
import { isNumberCommission } from "@repo/validation";

export const manage = {
  users: {
    commission: z.object({
      commission: isNumberCommission(),
    }),
  },
};
