import * as z from "zod";

export const application = {
  isType: (messages?: { required_error?: string }) => {
    const { required_error } = {
      required_error: "Application type is required",
      ...messages,
    };

    return z.enum(["broadcaster"], { required_error });
  },
};
