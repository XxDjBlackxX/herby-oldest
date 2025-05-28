import { UserAnalytical } from "@repo/user-db";
import { NotFoundError } from "@xjectro/express/exceptions";
import { wrapHandler } from "@xjectro/express/handlers";

export default class UsersAnalyticsController {
  soundbites = wrapHandler(async (req) => {
    const type = req.params.type;
    const analytics = await UserAnalytical.findOne({ user: req.user._id });
    if (!analytics) {
      throw new NotFoundError("Analytics is not found.");
    }

    const analyticsData = analytics.toObject({ virtuals: true });
    const soundbites = analyticsData.soundbites?.[type as "broadcast"] ?? [];

    if (!soundbites.length) {
      throw new NotFoundError("Soundbite is not found!");
    }

    soundbites.sort((a: any, b: any) => b.updatedAt - a.updatedAt);

    return {
      message: "Successfully get soundbites",
      data: soundbites.map((i) => ({
        name: i.name,
        saleCount: i.saleCount,
        testCount: i.testCount,
      })),
    };
  });
}
