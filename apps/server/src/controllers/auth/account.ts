import { UserIdentity } from "@repo/user-db";
import { InteractionToken } from "@repo/cache-db";
import { UnauthorizedError } from "@xjectro/express/exceptions";
import { wrapHandler } from "@xjectro/express/handlers";
import { createEmail } from "../../utils/helpers/email";
import { sendEmail } from "../../services/transport.services";

export default class AuthModificationController {
  email = wrapHandler(async (req) => {
    const { newEmail } = req.body;
    const user = req.user;

    const identity = await UserIdentity.findOne({ user: user._id });
    if (!identity) {
      throw new UnauthorizedError("User identity not found!");
    }

    const existing = await UserIdentity.exists({ email: newEmail }).exec();

    if (existing) {
      throw new UnauthorizedError("There is such an email!");
    }

    const { token } = await InteractionToken.createInteraction({
      author: identity.user._id,
      interaction: "change_email",
      detail: {
        newEmail,
      },
    });

    const html = await createEmail({
      name: "/auth/change-email",
      style: "html",
      params: {
        code: token,
      },
    });

    await sendEmail({
      to: identity.email,
      subject: "Change Email",
      html,
    });

    return { message: "Email change code sent successfully!" };
  });

  password = wrapHandler(async (req) => {
    const { newPassword, currentPassword } = req.body;
    const user = req.user;

    const identity = await UserIdentity.findOne({ user: user._id });
    if (!identity) {
      throw new UnauthorizedError("User identity not found!");
    }

    if (!(await identity.comparePassword(currentPassword))) {
      throw new UnauthorizedError("Your current password is incorrect!");
    }

    if (await identity.comparePassword(newPassword)) {
      throw new UnauthorizedError("Password is the same as before!");
    }

    const { token } = await InteractionToken.createInteraction({
      author: identity.user._id,
      interaction: "change_password",
      detail: {
        newPassword,
      },
    });

    const html = await createEmail({
      name: "/auth/change-password",
      style: "html",
      params: {
        code: token,
      },
    });

    await sendEmail({
      to: identity.email,
      subject: "Change Password",
      html,
    });

    return { message: "Password change code sent successfully!" };
  });
}
