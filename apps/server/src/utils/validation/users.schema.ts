import { z } from "zod";
import {
  user as userSchema,
  soundbite as soundbiteSchema,
} from "@repo/validation";

const { isUsername, isDescription, isAvatar, isBanner } = userSchema;
const { isOrbit } = soundbiteSchema;

export const update = z.object({
  username: isUsername().optional(),
  description: isDescription().optional(),
  avatar: isAvatar().optional(),
  banner: isBanner().optional(),
});

export const content = {
  op: {
    soundbites: {
      edit: z.object({
        orbit: isOrbit(),
      }),
    },
  },
};
