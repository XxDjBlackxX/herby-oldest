import { generateHash } from "@xjectro/express-crypto";
import { User, UserContent } from "@repo/user-db";
import { Soundbite } from "@repo/content-db";
import { NotFoundError } from "@xjectro/express/exceptions";
import { wrapHandler } from "@xjectro/express/handlers";

export default class Controller {
  index = wrapHandler(async (req) => {
    const soundbite = await Soundbite.findOne({ id: req.params.id })
      .populate(Soundbite.getPopulates("author", "broadcasters"))
      .select([
        "audio",
        "thumbnail",
        "title",
        "visibility",
        "id",
        "likers",
        "broadcasters",
        "author",
      ]);

    if (!soundbite) {
      throw new NotFoundError("Soundbite is not found!");
    }

    let soundbiteData = soundbite.toObject({ virtuals: true });
    if (req.isLoggedIn()) {
      await User.populate(req.user, User.getPopulates("content"));
    }
    const userData = req.user?.toObject({ virtuals: true });
    const data = Soundbite.formatSoundbiteData({
      item: soundbiteData,
      contain: userData?.content?.soundbites,
    });
    delete data._id;

    return {
      message: "Successfully retrieved soundbite",
      data,
    };
  });

  create = wrapHandler(async (req) => {
    const { visibility, title } = req.body;

    Soundbite.validateVisibility(visibility);

    const soundbite = await Soundbite.create({
      author: req.user._id,
      id: generateHash("hex", { author: req.user.id, title }),
      tags: req.body.tags.length ? req.body.tags : req.body.title.split(" "),
      ...req.body,
    });

    await UserContent.updateOne(
      { user: req.user._id },
      { $push: { "soundbites.created": soundbite._id } },
      { upsert: true, new: true },
    );

    return {
      code: 200,
      success: true,
      message: "Soundbite successfully created",
    };
  });

  delete = wrapHandler(async (req) => {
    const soundbite = await Soundbite.findOneAndDelete({
      id: req.params.id,
    });

    if (!soundbite) {
      throw new NotFoundError("Soundbite is not found!");
    }

    await UserContent.updateOne(
      { user: req.user._id, "soundbites.created": soundbite._id },
      {
        $pull: {
          "soundbites.created": soundbite._id,
          "soundbites.liked": soundbite._id,
        },
      },
      { upsert: true, new: true },
    );

    await soundbite.deleteOne();

    await UserContent.updateOne(
      { "soundbites.liked": soundbite._id },
      { $pull: { "soundbites.liked": soundbite._id } },
    );

    return {
      message: "Soundbite successfully deleted",
    };
  });

  liking = wrapHandler(async (req) => {
    const { id } = req.params;

    const soundbite = await Soundbite.findOne({ id });
    if (!soundbite) {
      throw new NotFoundError("Soundbite not found!");
    }

    let liked = soundbite.likers.some((v: any) => v.user.equals(req.user._id));

    const updatedSoundbite = await Soundbite.findOneAndUpdate(
      { id },
      liked
        ? { $pull: { likers: { user: req.user._id } } }
        : { $push: { likers: { user: req.user._id, date: new Date() } } },
      { new: true },
    );

    if (!updatedSoundbite) {
      throw new NotFoundError("Failed to update Soundbite");
    }

    const userContentUpdate = {
      [liked ? "$pull" : "$push"]: { "soundbites.liked": updatedSoundbite._id },
    };

    await UserContent.updateOne({ user: req.user._id }, userContentUpdate, {
      upsert: true,
    });

    liked = !liked;

    let likeCount = soundbite.likers.length;

    if (liked) {
      likeCount = likeCount + 1;
    } else {
      likeCount = likeCount - 1;
    }

    return {
      message: `Soundbite ${liked ? "liked" : "disliked"} successfully`,
      data: { likeCount, liked: liked },
    };
  });
}
