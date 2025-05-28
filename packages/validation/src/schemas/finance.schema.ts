import * as z from "zod";

export const finance = {
  isIban: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "IBAN is required",
      message: "IBAN must be a valid format",
      ...messages,
    };

    return z
      .string({ required_error })
      .regex(/^[A-Z]{2}\d{2}[A-Z0-9]{4,30}$/, {
        message: "IBAN must follow the international IBAN format",
      })
      .min(15, message)
      .max(34, message);
  },
  currency: {
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
  },
};
