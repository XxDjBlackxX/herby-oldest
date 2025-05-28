import { User } from "@repo/user-db";
import { Soundbite } from "@repo/content-db";
import { NotFoundError } from "@xjectro/express/exceptions";
import { wrapHandler } from "@xjectro/express/handlers";

export default class Controller {
  soundbite = wrapHandler(async (req) => {
    if (req.isLoggedIn()) {
      await User.populate(req.user, User.getPopulates("content"));
    }
    const userData = req.user?.toObject({ virtuals: true });

    const result = await Soundbite.listSoundbites({
      contain: userData?.content?.soundbites || null,
      limit: req.limit,
      filters: [req.params.type],
    });

    if (!result.soundbites.length) {
      throw new NotFoundError(
        "No usable soundbite found in broadcast history => Limit Error",
      );
    }

    return {
      code: 200,
      success: true,
      message: "Soundbites fetched successfully",
      data: result,
    };
  });
}
