import type { Document, Model, Types } from "mongoose";

import type { UserSchema } from "@repo/user-db";

export interface InteractionTokenSchema extends Document {
  used: boolean;
  expiration: Date;
  token: string;
  interaction: string;
  detail: any;
  author: UserSchema | Types.ObjectId;
}

export interface InteractionTokenModel extends Model<InteractionTokenSchema> {
  checkInteraction({
    token,
  }: {
    token: InteractionTokenSchema["token"];
  }): Promise<InteractionTokenSchema>;
  createInteraction({
    author,
    format,
    interaction,
    detail,
  }: {
    author: InteractionTokenSchema["author"];
    format?: "jwt";
    interaction: InteractionTokenSchema["interaction"];
    detail?: object;
  }): Promise<{ token: string; expiration: Date; tfa: InteractionTokenSchema }>;
}
