import * as z from "zod";

export const paymentCard = {
  isCardHolderName: (messages?: {
    required_error?: string;
    message?: string;
  }) => {
    const { required_error, message } = {
      required_error: "Holder name is required.",
      message: "Holder name must be at least 3 characters long.",
      ...messages,
    };

    return z.string({ required_error }).min(3, message).max(100, message);
  },
  isCardNumber: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "Card number is required.",
      message: "Card number must be exactly 16 digits.",
      ...messages,
    };

    return z.string({ required_error }).regex(/^\d{16}$/, message);
  },
  isExpireMonth: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "Expiration month is required.",
      message: "Expiration month must be between 1 and 12.",
      ...messages,
    };

    return z.string({ required_error }).regex(/^(0?[1-9]|1[0-2])$/, message);
  },
  isExpireDate: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "Expiration date is required.",
      message: "Expiration date must be in MM/YY format with a valid month.",
      ...messages,
    };

    return z
      .string({ required_error })
      .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, message);
  },
  isExpireYear: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "Expiration year is required.",
      message: "Expiration year must be a valid year (e.g., 2023).",
      ...messages,
    };

    return z.string({ required_error }).regex(/^(20[2-9]\d|2100)$/, message);
  },
  isCvc: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "CVC code is required.",
      message: "CVC code must be 3 or 4 digits.",
      ...messages,
    };

    return z.string({ required_error }).regex(/^\d{3,4}$/, message);
  },
};
