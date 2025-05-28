import * as z from "zod";

export const soundbite = {
  isAudio: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "Audio is required",
      message: "The audio url you entered is incorrect.",
      ...messages,
    };

    return z.string({ required_error }).min(1, message);
  },
  isThumbnail: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "Thumbnail is required",
      message: "The thumbnail url you entered is incorrect.",
      ...messages,
    };

    return z.string({ required_error }).min(1, message);
  },
  isOrbit: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "Orbit entry is required",
      message: "Orbit can be minimum 10 and maximum 10000",
      ...messages,
    };

    return z
      .number({ required_error })
      .min(10, message)
      .max(10000, message)
      .positive({ message });
  },
  isTitle: (messages?: { required_error?: string; message?: string }) => {
    const { required_error, message } = {
      required_error: "Soundbite title is required",
      message: "Soundbite title must be between 2 and 46 characters",
      ...messages,
    };

    return z.string({ required_error }).min(2, message).max(50, message);
  },
  isTags: (messages?: {
    required_error?: string;
    message?: string;
    item_message?: string;
  }) => {
    const { required_error, message, item_message } = {
      required_error: "At least one tag is required",
      message: "Tags array must contain between 1 and 20 tags",
      item_message: "Each tag must be between 1 and 16 characters long",
      ...messages,
    };

    return z
      .array(
        z.string({ required_error }).min(1, item_message).max(50, item_message),
      )
      .min(1, message)
      .max(50, message);
  },
  isVisibility: (messages?: { required_error?: string }) => {
    const { required_error } = {
      required_error: "Soundbite visibility is required",
      ...messages,
    };

    return z.enum(["public", "private"], { required_error });
  },
};
