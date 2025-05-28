import { z } from "zod";
import { user as schema } from "@repo/validation";

const { isEmail, isName, isSurname, isPassword, isUsername } = schema;

const isToken = () => {
  return z.string().min(1, "A usage code is required. Please provide one.");
};

export const login = z.object({
  email: isEmail(),
  password: isPassword(),
});

export const register = z.object({
  username: isUsername(),
  name: isName(),
  surname: isSurname(),
  email: isEmail(),
  password: isPassword(),
});

export const forgot_password = z.object({
  email: isEmail(),
  redirect_uri: z
    .string({ required_error: "Redirect uri is required" })
    .min(1, "A redirect URI is required. Please provide a valid one."),
});

export const refresh_password = z.object({
  newPassword: isPassword(),
  token: isToken(),
});

export const account = {
  email: z.object({
    newEmail: isEmail(),
  }),
  password: z.object({
    newPassword: isPassword(),
    currentPassword: isPassword(),
  }),
};

export const interactionToken = {
  verify: z.object({
    token: isToken(),
  }),
  use: z.object({
    token: isToken(),
    interaction: z
      .string({ required_error: "interaction is required" })
      .min(1, "You must enter the interaction name."),
  }),
};

export const protection = z.object({
  enabled: z.boolean(),
});
