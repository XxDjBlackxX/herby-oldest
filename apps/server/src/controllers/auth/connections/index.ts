import { User, UserIdentity, UserConnection } from "@repo/user-db";
import ConnectionsProviders from "./providers.utils";
import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "@xjectro/express/exceptions";
import { wrapHandler } from "@xjectro/express/handlers";
import { createUsername } from "@repo/helpers-utils";
import {
  AUTH_CONNECTION_TYPES,
  AUTH_CONNECTION_ACTIONS,
  AUTH_CONNECTION_ALLOWED_OAUTH_ACTION_TYPES,
} from "../../../api";
import { generateToken } from "@xjectro/express-jwt";
import Helpers from "./helpers.utils";

export default class AuthConnectionsController {
  helpers = new Helpers();
  private providers: ConnectionsProviders = new ConnectionsProviders();

  index = wrapHandler(async (req) => {
    const type = req.params.type as "github";
    const action = req.body.action as string;

    if (!AUTH_CONNECTION_TYPES.includes(type)) {
      throw new InternalServerError("Invalid authentication type");
    }
    if (!AUTH_CONNECTION_ACTIONS.includes(action)) {
      throw new InternalServerError("Invalid authentication action");
    }

    if (
      action === "oauth" &&
      !AUTH_CONNECTION_ALLOWED_OAUTH_ACTION_TYPES.includes(type)
    ) {
      throw new InternalServerError("Invalid OAuth action type");
    }

    const provideResponse = await this.providers[type](req);

    let userId = req.user?._id;

    const attachConnection = async () => {
      if (userId) {
        await UserConnection.connect({
          type,
          user: userId,
          ...provideResponse,
        });
      }
    };

    const attachLogIn = () => {
      const access_token = generateToken(
        { user: userId },
        { expiresIn: "5d", secret: process.env.SESSION_SECRET! },
      );

      return {
        message: "Login successful!",
        data: { access_token, isLoggedIn: true },
      };
    };

    if (!req.isLoggedIn() && action == "oauth") {
      const identity = await UserIdentity.findOne({
        email: provideResponse.data.email,
      });
      if (identity) {
        const user = await User.findById(identity.user);
        if (!user) throw new UnauthorizedError("User not found");
        userId = user._id;
        await attachConnection();
        return attachLogIn();
      } else {
        const usernameExists = await User.exists({
          username: provideResponse.data.username,
        });
        if (provideResponse.data.email) {
          userId = await User.createUser({
            email: provideResponse.data.email,
            username: (usernameExists
              ? createUsername()
              : provideResponse.data.username) as string,
            name: "New",
            surname: "Account",
          });
          const user = await User.findById(userId);
          if (!user) throw new UnauthorizedError("User not found");
          await attachConnection();
          return attachLogIn();
        } else {
          throw new UnauthorizedError("Account creation failed");
        }
      }
    }

    if (userId && req.isLoggedIn()) await attachConnection();

    return {
      message: "Successfully connected to Discord",
      data: { ...provideResponse, isLoggedIn: false },
    };
  });

  disconnect = wrapHandler(async (req) => {
    const { type } = req.query;

    if (!type || typeof type !== "string") {
      throw new NotFoundError("Type is not found!");
    }

    await UserConnection.disconnect({ user: req.user._id, type });

    return { message: "Disconnected successfully." };
  });

  redirect = wrapHandler(async (req, res) => {
    let url = "/";
    switch (req.params.type) {
      case "kick":
        const {
          url: kickUrl,
          state,
          codeVerifier,
        } = await this.helpers.kickAuth.getAuthorizationUrl();

        req.session.kickState = state;
        req.session.kickCodeVerifier = codeVerifier;

        url = kickUrl;
        break;
      case "discord":
        url = process.env.DISCORD_OAUTH_URI!;
        break;
      case "twitch":
        url = process.env.TWITCH_OAUTH_URI!;
        break;
      case "github":
        url = process.env.GIT_OAUTH_URI!;
        break;
      case undefined:
        url = process.env.CLIENT_URL!;
    }

    res.redirect(url);

    return { message: "Redirecting to OAuth provider", data: { url } };
  });
}
