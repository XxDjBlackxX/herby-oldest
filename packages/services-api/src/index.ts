import axios from "axios";

const {
  DISCORD_CLIENT_SECRET,
  DISCORD_CLIENT_ID,
  DISCORD_REDIRECT_URI,
  TWITCH_CLIENT_ID,
  TWITCH_CLIENT_SECRET,
  TWITCH_REDIRECT_URI,
  GIT_CLIENT_ID,
  GIT_CLIENT_SECRET,
  GIT_REDIRECT_URI,
  KICKPOINT_TOKEN,
} = process.env;

export async function kick_getUserInfo(token: string) {
  return await axios("https://api.kick.com/public/v1/users", {
    headers: { authorization: token },
  });
}

export async function github_getAccessToken(code: string) {
  return await axios({
    method: "post",
    url: "https://github.com/login/oauth/access_token",
    data: {
      client_id: GIT_CLIENT_ID,
      client_secret: GIT_CLIENT_SECRET,
      code,
      redirect_uri: GIT_REDIRECT_URI,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

export async function github_getUserInfo(token: string) {
  return await axios("https://api.github.com/user", {
    headers: { authorization: token },
  });
}

export async function twitch_getAccessToken(code: string) {
  return await axios({
    method: "post",
    url: "https://id.twitch.tv/oauth2/token",
    data: {
      client_id: TWITCH_CLIENT_ID,
      client_secret: TWITCH_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: TWITCH_REDIRECT_URI,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

export async function kickpoint_getChannels() {
  return await axios("https://api.kickpoint.xyz/channels", {
    headers: {
      Authorization: `Token ${KICKPOINT_TOKEN}`,
    },
  });
}
export async function kickpoint_getMessages({
  query,
  key,
}: {
  query:
    | "channel_id"
    | "channel_name"
    | "user_id"
    | "user_name"
    | "message"
    | "message_id";
  key: string;
}) {
  return await axios.get("https://api.kickpoint.xyz/messages/", {
    params: { [query]: key },
    headers: {
      Authorization: `Token ${KICKPOINT_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  });
}

export async function twitch_refreshAccessToken(refreshToken: string) {
  return await axios.post("https://id.twitch.tv/oauth2/token", null, {
    params: {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: TWITCH_CLIENT_ID,
      client_secret: TWITCH_CLIENT_SECRET,
    },
  });
}

export async function twitch_getUserInfo(token: string) {
  return await axios("https://api.twitch.tv/helix/users", {
    headers: { authorization: token, "Client-ID": TWITCH_CLIENT_ID },
  });
}

export async function discord_getAccessToken(code: string) {
  return await axios({
    method: "post",
    url: "https://discord.com/api/oauth2/token",
    data: {
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: DISCORD_REDIRECT_URI,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

export async function discord_getUserInfo(token: string) {
  return await axios("https://discord.com/api/users/@me", {
    headers: { authorization: token },
  });
}
