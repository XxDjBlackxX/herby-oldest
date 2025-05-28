import { User } from "@repo/user-db";
import { PERMISSIONS } from "@repo/permission-utils";

import { UnauthorizedError } from "@xjectro/express/exceptions";
import { wrapHandler } from "@xjectro/express/handlers";

export default class Controller {
  soundbites = wrapHandler(async (req, res) => {
    const user = await User.findOne({ id: req.params.id });
    if (!user || !user.verifyPermission(PERMISSIONS.broadcaster)) {
      throw new UnauthorizedError("The information is incorrect");
    }

    return res.render("webhook/soundbites", {
      id: req.params.id,
      SERVER_URL: process.env.SERVER_URL,
    });
  });
}
