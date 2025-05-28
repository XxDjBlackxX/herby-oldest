import crypto from "crypto";
import { Schema, Types } from "mongoose";

import { connection } from "@repo/cache-db/connection";

import { generateToken } from "@xjectro/express-jwt";

import type {
  InteractionTokenModel,
  InteractionTokenSchema,
} from "@repo/cache-db/types";

const interactionTokenSchema = new Schema<InteractionTokenSchema>(
  {
    author: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    interaction: {
      type: String,
      required: true,
    },
    used: {
      type: Boolean,
      required: false,
      default: false,
    },
    token: {
      type: String,
      required: true,
    },
    detail: {
      type: Object,
      default: {},
    },
    expiration: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

interactionTokenSchema.statics.checkInteraction =
  async function checkInteraction({
    token,
  }: {
    token: InteractionTokenSchema["token"];
  }) {
    const interactionToken = await InteractionToken.findOne({ token });

    if (!interactionToken || interactionToken.expiration <= new Date())
      return false;

    interactionToken.used = true;
    await interactionToken.save();

    return interactionToken;
  };

interactionTokenSchema.statics.createInteraction =
  async function createInteraction({
    author,
    format,
    interaction,
    detail,
  }: {
    author: InteractionTokenSchema["author"];
    format: "jwt";
    interaction: InteractionTokenSchema["interaction"];
    detail?: object;
  }) {
    let token = "";
    const expiration = new Date(Date.now() + 180 * 1000);

    switch (format) {
      case "jwt":
        token = generateToken(
          { author, interaction },
          {
            expiresIn: 180,
            secret:
              "this_is_a_secret_key_for_interaction_token_A-!23s.ds543çc.!'^+%&/(sdas312'+d",
          },
        );
        break;
      case undefined:
        token = crypto
          .randomBytes(64)
          .toString("base64")
          .replace(/[^a-zA-Z0-9]/g, "")
          .slice(0, 5);
        break;
    }

    const interactionToken = await InteractionToken.create({
      author,
      interaction,
      token,
      expiration,
      detail,
    });

    return { token, expiration, interactionToken };
  };

export const InteractionToken = connection.model<
  InteractionTokenSchema,
  InteractionTokenModel
>("interactionToken", interactionTokenSchema);
