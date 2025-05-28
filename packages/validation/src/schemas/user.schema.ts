import * as z from "zod";
import { REGEX_NAME, REGEX_USERNAME } from "..";

export const user = {
  isUsername: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "Username is required",
      message:
        "Username must be between 3 and 20 characters and contain valid characters",
      ...messages,
    };

    return z
      .string({ required_error })
      .min(3, message)
      .max(20, message)
      .regex(REGEX_USERNAME, { message: message });
  },
  isFullName: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "Full Name is required",
      message:
        "Full Name must be between 3 and 50 characters and contain valid characters",
      ...messages,
    };

    return z
      .string({ required_error })
      .min(3, message)
      .max(50, message)
      .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, {
        message: "Full Name can only contain letters and spaces",
      });
  },
  isEmail: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "Email is required",
      message: "Invalid email address",
      ...messages,
    };

    return z.string({ required_error }).email(message);
  },
  isPassword: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "Password is required",
      message: "Password must be between 8 and 20 characters",
      ...messages,
    };

    return z.string({ required_error }).min(8, message).max(20, message);
  },
  isName: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "First name is required",
      message:
        "First name must be between 3 and 20 characters and contain only letters",
      ...messages,
    };

    return z
      .string({ required_error })
      .min(3, message)
      .max(20, message)
      .regex(REGEX_NAME, { message: message });
  },
  isSurname: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "Last name is required",
      message:
        "Last name must be between 3 and 20 characters and contain only letters",
      ...messages,
    };

    return z
      .string({ required_error })
      .min(3, message)
      .max(20, message)
      .regex(REGEX_NAME, { message: message });
  },
  isDescription: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "Description is required",
      message: "Description must be between 10 and 200 characters",
      ...messages,
    };

    return z.string({ required_error }).min(10, message).max(200, message);
  },
  isBanner: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "Banner is required",
      message: "The banner url you entered is incorrect.",
      ...messages,
    };

    return z.object({
      url: z.string({ required_error }).min(1, message),
    });
  },
  isAvatar: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "Avatar is required",
      message: "The avatar url you entered is incorrect.",
      ...messages,
    };

    return z.object({
      url: z.string({ required_error }).min(1, message),
    });
  },
  isGsmNumber: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "Gsm number is required",
      message:
        "The gsm number you entered is incorrect. It should be in international format, e.g., +1XXXXXXXXXX or +90XXXXXXXXXX.",
      ...messages,
    };

    return z.string({ required_error }).refine(
      (val) => {
        return /^\+[1-9]\d{1,14}$/.test(val);
      },
      { message },
    );
  },
  isIdentityNumber: (messages?: {
    required_error?: string;
    message?: string;
  }) => {
    const { required_error, message } = {
      required_error: "Identity number is required",
      message:
        "The identity number you entered is incorrect. It should match a valid format for supported countries (e.g., Turkish, US, Chinese) or a generic alphanumeric pattern.",
      ...messages,
    };

    const validateTurkishID = (val: string): boolean => {
      if (!/^\d{11}$/.test(val)) return false;
      const digits = val.split("").map(Number);
      if (digits[0] === 0) return false;
      const sumOdd = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
      const sumEven = digits[1] + digits[3] + digits[5] + digits[7];
      const check10 = (sumOdd * 7 - sumEven) % 10;
      if (check10 !== digits[9]) return false;
      const sumFirst10 = digits.slice(0, 10).reduce((acc, d) => acc + d, 0);
      return sumFirst10 % 10 === digits[10];
    };

    const validateUSSSN = (val: string): boolean => {
      return /^\d{9}$/.test(val) || /^\d{3}-\d{2}-\d{4}$/.test(val);
    };

    const validateChineseID = (val: string): boolean => {
      return /^(\d{15}|\d{17}[\dXx])$/.test(val);
    };

    const validateGenericID = (val: string): boolean => {
      return /^[A-Za-z0-9\-]{5,20}$/.test(val);
    };

    return z.string({ required_error }).refine(
      (val) => {
        if (validateTurkishID(val)) return true;
        if (validateUSSSN(val)) return true;
        if (validateChineseID(val)) return true;
        if (validateGenericID(val)) return true;
        return false;
      },
      { message },
    );
  },
};
