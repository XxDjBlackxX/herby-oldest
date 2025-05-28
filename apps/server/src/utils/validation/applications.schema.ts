import { z } from "zod";
import { application as schema } from "@repo/validation";

const { isType } = schema;

export const create = z.object({
  type: isType(),
  detail: z.object({}).optional(),
});
