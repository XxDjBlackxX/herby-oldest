import { UserIdentity } from "@repo/user-db";
import { InteractionToken } from "@repo/cache-db";
import {
  InternalServerError,
  UnauthorizedError,
} from "@xjectro/express/exceptions";
import { wrapHandler } from "@xjectro/express/handlers";

export default class AuthInteractionTokenController {
  verify = wrapHandler(async (req) => {
    const { token } = req.body;
    const interactionToken = await InteractionToken.checkInteraction({
      token,
    });

    return {
      code: 200,
      success: true,
      message: "Usage code is correct",
      data: {
        expiration: interactionToken.expiration,
      },
    };
  });
  use = wrapHandler(async (req) => {
    const { token, interaction } = req.body;

    const interactionToken = await InteractionToken.checkInteraction({
      token,
    });

    if (!interactionToken || interactionToken.interaction !== interaction) {
      throw new UnauthorizedError("Token or interaction is incorrect");
    }

    const identity = await UserIdentity.findOne({
      user: interactionToken.author,
    });
    if (!identity) throw new UnauthorizedError("User identity not found!");

    if (interaction == "change_email") {
      if (!interactionToken.detail.newEmail) {
        throw new InternalServerError("No new email found");
      }
      identity.email = interactionToken.detail.newEmail;
    }

    if (interaction == "change_password") {
      if (!interactionToken.detail.newPassword) {
        throw new InternalServerError("No new password found");
      }
      identity.password = interactionToken.detail.newPassword;
    }

    await identity.save();

    return {
      message: "Token is correct",
      data: {
        expiration: interactionToken.expiration,
      },
    };
  });
}
