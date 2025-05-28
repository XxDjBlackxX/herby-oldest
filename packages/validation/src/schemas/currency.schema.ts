import * as z from "zod";

export const currency = {
  isCode: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "Currency code is required",
      message: "Currency code cannot be empty",
      ...messages,
    };
    return z.string({ required_error }).min(1, { message });
  },
  isSymbol: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "Currency symbol is required",
      message: "Currency symbol cannot be empty",
      ...messages,
    };
    return z.string({ required_error }).min(1, { message });
  },
  isName: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "Currency name is required",
      message: "Currency name cannot be empty",
      ...messages,
    };
    return z.string({ required_error }).min(1, { message });
  },
  isRate: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "Currency rate is required",
      message: "Currency rate must be a positive number",
      ...messages,
    };
    return z.preprocess((val) => {
      if (val === null) return null;
      if (typeof val === "string") {
        return val.trim() === "" ? undefined : Number(val);
      }
      return val;
    }, z.number({ required_error, message }).positive({ message }).nullable());
  },
};
