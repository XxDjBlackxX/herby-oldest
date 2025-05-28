import { setLimitItems } from "@repo/helpers-utils";
import { User, type UserHistorySchema } from "@repo/user-db";
import { Soundbite } from "@repo/content-db";
import { NotFoundError } from "@xjectro/express/exceptions";
import { wrapHandler } from "@xjectro/express/handlers";

export default class UsersHistoryController {
  soundbites = {
    broadcast: wrapHandler(async (req) => {
      await User.populate(
        req.user,
        User.getPopulates("history", "content.soundbites.broadcast"),
      );

      const userData = req.user.toObject({ virtuals: true });
      const soundbites: UserHistorySchema["soundbites"]["broadcast"] =
        userData.history?.soundbites?.broadcast ?? [];

      if (!soundbites.length) {
        throw new NotFoundError(
          "No usable soundbite found in broadcast history.",
        );
      }

      const soundbiteData = soundbites.map((item) =>
        Soundbite.formatSoundbiteData({ item }),
      );
      soundbiteData.sort((a, b) => b.createdAt - a.createdAt);

      const limited = setLimitItems({
        ...req.limit,
        i: soundbiteData,
      });

      if (!limited.length) {
        throw new NotFoundError(
          "No usable soundbite found in broadcast history with the specified limits.",
        );
      }

      return {
        message: `Successfully retrieved soundbites.`,
        data: { soundbites: limited, total: soundbiteData.length },
      };
    }),
  };
}
