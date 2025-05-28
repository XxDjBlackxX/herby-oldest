import * as z from "zod";

export const address = {
  isAddressLine: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "Address is required.",
      message: "Address must be at least 3 characters long.",
      ...messages,
    };

    return z.string({ required_error }).min(3, message).max(100, message);
  },
  isCountry: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "Country is required.",
      message: "Country must contain at least 1 character.",
      ...messages,
    };

    return z.string({ required_error }).min(1, message).max(50, message);
  },
  isCity: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "City is required.",
      message: "City must contain at least 1 character.",
      ...messages,
    };

    return z.string({ required_error }).min(1, message).max(50, message);
  },
  isZipCode: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "Zip code is required.",
      message: "Zip code must contain only numbers.",
      ...messages,
    };

    return z
      .string({ required_error })
      .min(4, message)
      .max(10, message)
      .regex(/^\d+$/, message);
  },
};
