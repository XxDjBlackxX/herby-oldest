import { KickAuthClient } from "kick-auth";

export default class Helpers {
  kickAuth = new KickAuthClient({
    clientId: process.env.KICK_CLIENT_ID!,
    clientSecret: process.env.KICK_CLIENT_SECRET!,
    redirectUri: process.env.KICK_REDIRECT_URI!,
    scopes: ["user:read"],
  });
}
