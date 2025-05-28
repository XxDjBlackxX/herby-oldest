import {
  BadRequestError,
  UnauthorizedError,
} from "@xjectro/express/exceptions";
import { Request } from "@xjectro/express/types";
import {
  discord_getAccessToken,
  discord_getUserInfo,
  github_getAccessToken,
  github_getUserInfo,
  twitch_getAccessToken,
  twitch_getUserInfo,
  kick_getUserInfo,
} from "@repo/api-services";
import Helpers from "./helpers.utils";

interface T {
  data: { email?: string; username?: string; name: string; id: string };
  access_token: string;
  refresh_token?: string;
}

export default class AuthConnectionsProviders {
  helpers = new Helpers();
  async discord(req: Request): Promise<T> {
    const { code } = req.query;
    const response = await discord_getAccessToken(code as string);

    if (!response?.data?.access_token) {
      throw new UnauthorizedError("Error connecting to Discord");
    }

    const userInfo = await discord_getUserInfo(
      `Bearer ${response.data.access_token} `,
    );

    if (!userInfo.data) {
      throw new UnauthorizedError("Error connecting to Discord 2");
    }

    return {
      data: {
        email: userInfo.data.email,
        username: userInfo.data.username,
        name: userInfo.data.global_name,
        id: userInfo.data.id,
      },
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
    };
  }

  async twitch(req: Request): Promise<T> {
    const { code } = req.query;
    const response = await twitch_getAccessToken(code as string);

    if (!response?.data?.access_token) {
      throw new UnauthorizedError("Error connecting to Twitch");
    }

    const userInfo = await twitch_getUserInfo(
      `Bearer ${response.data.access_token} `,
    );

    if (!userInfo.data) {
      throw new UnauthorizedError("Error connecting to Twitch 2");
    }

    return {
      data: {
        id: userInfo.data.data[0].id,
        name: userInfo.data.data[0].login,
        username: userInfo.data.data[0].display_name,
      },
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
    };
  }

  async github(req: Request): Promise<T> {
    const { code } = req.query;
    const response = await github_getAccessToken(code as string);

    const access_token = response?.data
      ?.split("access_token=")?.[1]
      ?.split("&scope=")?.[0];

    if (!access_token) {
      throw new UnauthorizedError("Error connecting to Github");
    }

    const userInfo = await github_getUserInfo(`token ${access_token} `);

    if (!userInfo.data) {
      throw new UnauthorizedError("Error connecting to Github 2");
    }

    return {
      data: {
        id: userInfo.data.id,
        name: userInfo.data.login,
        username: userInfo.data.name,
      },
      access_token,
    };
  }
  async kick(req: Request): Promise<T> {
    const { code, state } = req.query;

    if (state !== req.session.kickState) {
      throw new BadRequestError("Invalid state parameter");
    }

    const tokens = await this.helpers.kickAuth.getAccessToken(
      code as string,
      req.session.kickCodeVerifier!,
    );

    if (!tokens?.access_token) {
      throw new UnauthorizedError("Error connecting to Kick");
    }

    const userInfo = await kick_getUserInfo(`Bearer ${tokens.access_token} `);

    if (!userInfo.data) {
      throw new UnauthorizedError("Error connecting to Kick 2");
    }

    return {
      data: {
        id: userInfo.data.data[0].user_id,
        name: userInfo.data.data[0].name,
        username: userInfo.data.data[0].name,
        email: userInfo.data.data[0].email,
      },
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  }
}
