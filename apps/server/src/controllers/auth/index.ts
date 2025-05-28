import AuthInteractionTokenController from "./interactionToken";
import { User, UserIdentity } from "@repo/user-db";
import { InteractionToken } from "@repo/cache-db";
import {
  BadRequestError,
  DuplicatedDataError,
  NotFoundError,
  UnauthorizedError,
} from "@xjectro/express/exceptions";
import { wrapHandler } from "@xjectro/express/handlers";
import AuthAccountController from "./account";
import { createEmail } from "../../utils/helpers/email";
import { sendEmail } from "../../services/transport.services";
import AuthConnectionsController from "./connections";
import { generateToken } from "@xjectro/express-jwt";

export default class Controller {
  interactionToken = new AuthInteractionTokenController();
  account = new AuthAccountController();
  connections = new AuthConnectionsController();

  login = wrapHandler(async (req) => {
    const { email, password, token } = req.body;

    const identity = await UserIdentity.findOne({ email });

    if (!identity) {
      throw new UnauthorizedError("Email is not found!");
    }

    if (!(await identity.comparePassword(password))) {
      throw new UnauthorizedError("Password is incorrect!");
    }

    const user = await User.findById(identity.user).populate("profile");

    if (!user) {
      await identity.deleteOne();
      throw new UnauthorizedError("Email or password is incorrect!");
    }

    const access_token = generateToken(
      { user: user._id },
      { expiresIn: "5d", secret: process.env.SESSION_SECRET! },
    );

    if (token) {
      const interactionToken = await InteractionToken.checkInteraction({
        token,
      });
      if (!interactionToken) {
        throw new UnauthorizedError("Usage code is incorrect");
      }

      if (interactionToken.interaction == "login") {
        return {
          message:
            "The usage code is correct, you have logged in successfully.",
          data: {
            access_token,
          },
        };
      }

      throw new BadRequestError("The usage code type is incorrect");
    }

    if (identity.protection.login) {
      const { token } = await InteractionToken.createInteraction({
        author: identity.user._id,
        interaction: "login",
      });

      const html = await createEmail({
        name: "/auth/login",
        style: "html",
        params: {
          code: token,
        },
      });

      await sendEmail({
        to: email,
        subject: `${user.profile.name} Your login code`,
        html,
      });

      return {
        code: 201,
        message: "2FA required, check your email for the code.",
      };
    }

    return {
      code: 200,
      message: "Successfully logged in",
      data: {
        access_token,
      },
    };
  });

  register = wrapHandler(async (req) => {
    const { email, username, ...rest } = req.body;

    const existsEmail = await UserIdentity.exists({ email });
    if (existsEmail) {
      throw new DuplicatedDataError("Email already exists!");
    }

    const existsUsername = await User.exists({ username });
    if (existsUsername) {
      throw new DuplicatedDataError("Username already exists!");
    }

    await User.createUser({ email, username, ...rest });

    return { message: "Successfully created user!" };
  });

  forgotPassword = wrapHandler(async (req) => {
    const { email, redirect_uri } = req.body;

    const identity = await UserIdentity.findOne({ email });

    if (!identity) {
      throw new NotFoundError("Email is incorrect!");
    }

    const { token } = await InteractionToken.createInteraction({
      author: identity.user._id,
      interaction: "forgot_password",
      format: "jwt",
    });

    const html = await createEmail({
      name: "/auth/forgot-password",
      style: "html",
      params: {
        href: redirect_uri.replace("[code]", token),
      },
    });

    await sendEmail({
      to: email,
      subject: "Password reset link",
      html,
    });

    return { message: "Password reset request success!" };
  });

  refreshPassword = wrapHandler(async (req) => {
    const { newPassword, token } = req.body;

    const interactionToken = await InteractionToken.checkInteraction({
      token,
    });

    if (!interactionToken) {
      throw new UnauthorizedError("Usage code is incorrect");
    }

    if (interactionToken.interaction !== "forgot_password") {
      throw new UnauthorizedError("interaction is not the same");
    }

    const identity = await UserIdentity.findOne({
      user: interactionToken.author,
    });
    if (!identity) throw new UnauthorizedError("User identity not found!");

    if (await identity.comparePassword(newPassword)) {
      throw new UnauthorizedError("Password is the same as before!");
    }

    identity.password = newPassword;
    await identity.save();

    return { message: "Password updated successfully!" };
  });

  protection = wrapHandler(async (req) => {
    const user = req.user;
    const { enabled } = req.body;

    const identity = await UserIdentity.findOne({ user: user._id });
    if (!identity) throw new UnauthorizedError("User identity not found!");

    identity.protection[req.params.type as "login"] = enabled;

    await identity.save();

    return { message: "Successfully update two factor." };
  });
}
