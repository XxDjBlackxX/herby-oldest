import { User } from "@repo/user-db";
import { Soundbite } from "@repo/content-db";
import { NotFoundError } from "@xjectro/express/exceptions";
import { wrapHandler } from "@xjectro/express/handlers";

export default class Controller {
  soundbite = wrapHandler(async (req) => {
    const query = req.params.query || "";
    if (!query) {
      throw new NotFoundError("Query parameter is required");
    }

    if (req.isLoggedIn()) {
      await User.populate(req.user, User.getPopulates("content"));
    }
    const userData = req.user?.toObject({ virtuals: true });

    const result = await Soundbite.listSoundbites({
      contain: userData?.content?.soundbites || null,
      limit: req.limit,
      filters: [{ name: "search", query }, { name: "most-liked" }],
    });

    if (!result.soundbites.length) {
      throw new NotFoundError(
        "No usable soundbite found in broadcast history => Limit Error",
      );
    }

    return {
      message: "Soundbites fetched successfully",
      data: result,
    };
  });

  users = wrapHandler(async (req) => {
    const query = req.params.query || "";
    if (!query) {
      throw new NotFoundError("Query parameter is required");
    }

    const filter = {
      $or: [
        { username: { $regex: query, $options: "i" } },
        { id: { $regex: query, $options: "i" } },
        { username: { $regex: "i", $options: "i" } },
      ],
    };

    const total = await User.countDocuments(filter);

    const results = await User.find(filter)
      .populate([
        {
          path: "identity",
          model: "identity",
          select: "email",
        },
        {
          path: "profile",
          model: "profile",
          select: "avatar",
        },
      ])
      .select("id username avatar createdAt identity")
      .skip(req.limit.after)
      .limit(req.limit.before > 0 ? req.limit.before - req.limit.after : 10)
      .lean();

    if (!results.length) {
      throw new NotFoundError("No usable user found");
    }

    return {
      message: "Users fetched successfully",
      data: {
        total,
        users: results.map((r) => ({
          id: r.id,
          username: r.username,
          avatar: r.profile.avatar,
          createdAt: r.createdAt,
          email: r.identity.email,
        })),
      },
    };
  });
}
