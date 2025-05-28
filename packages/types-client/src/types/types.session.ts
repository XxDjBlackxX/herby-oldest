import type {
  UserSchema,
  UserConnectionSchema,
  UserProfileSchema,
  UserIdentitySchema,
} from "@repo/user-db";

export interface Connection {
  id: UserConnectionSchema["data"]["id"];
  type: "discord" | "github" | "twitch";
  name: UserConnectionSchema["data"]["name"];
  username: UserConnectionSchema["data"]["username"];
}

/**@ts-ignore */
export interface User extends UserSchema {
  description: UserProfileSchema["description"];
  name: UserProfileSchema["name"];
  surname: UserProfileSchema["surname"];
  avatar: UserProfileSchema["avatar"];
  banner: UserProfileSchema["banner"];
  createdAt: UserSchema["createdAt"];
  updatedAt: UserSchema["updatedAt"];
  email: UserIdentitySchema["email"];
  connections: Connection[];
  followers: { id: string }[];
  requesting: {
    isFollowing: boolean;
  };
  followerCount: number;
}
