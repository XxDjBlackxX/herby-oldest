import { UserProfileSchema, UserSchema } from "@repo/user-db";
import { ApplicationSchema } from "@repo/content-db";

export interface Application extends Omit<ApplicationSchema, "author"> {
  author: Partial<
    Pick<UserSchema, "id" | "username"> & Pick<UserProfileSchema, "avatar">
  >;
}
