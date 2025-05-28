import { z } from "zod";
import { soundbite as schema } from "@repo/validation";

const { isTags, isTitle, isVisibility, isAudio, isThumbnail } = schema;

export const create = z.object({
  audio: isAudio(),
  thumbnail: isThumbnail().optional(),
  title: isTitle(),
  tags: isTags().optional(),
  visibility: isVisibility(),
});
