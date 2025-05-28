import { User, UserContent } from "@repo/user-db";
import { Application, Soundbite } from "@repo/content-db";
import { capitalizeString, setLimitItems } from "@repo/helpers-utils";
import { NotFoundError } from "@xjectro/express/exceptions";
import { wrapHandler } from "@xjectro/express/handlers";

const GET_SOUNDS_POPULATE = User.getPopulates(
  "content.soundbites.broadcast",
  "content.soundbites.created",
  "content.soundbites.liked",
);

export default class UsersContentController {
  soundbites = wrapHandler(async (req) => {
    const type = req.params.type;
    let requestUser;

    if (
      req.isLoggedIn() &&
      (req.user.username === req.params.id ||
        req.user.id === req.params.id ||
        req.params.id === "me")
    ) {
      req.user =
        (await User.findById(req.user._id).populate(GET_SOUNDS_POPULATE)) ??
        req.user;
      requestUser = req.user;
    } else {
      requestUser = await User.findOne({
        $or: [{ username: req.params.id }, { id: req.params.id }],
      }).populate(GET_SOUNDS_POPULATE);
      await User.populate(req.user, GET_SOUNDS_POPULATE);
    }

    if (!requestUser) {
      throw new NotFoundError("User is not found!");
    }

    const requestUserData = requestUser.toObject({ virtuals: true });

    const soundbites = requestUserData.content.soundbites[type] ?? [];
    if (soundbites.length === 0) {
      throw new NotFoundError(`${capitalizeString(type)} soundbites not found`);
    }

    const userData = req.user?.toObject({ virtuals: true });

    const soundbiteData = soundbites.map((item: any) =>
      Soundbite.formatSoundbiteData({
        item,
        contain: userData?.content?.soundbites,
        custom: {
          owner: type == "broadcast" ? false : null,
        },
      }),
    );

    return {
      message: `Successfully retrieved ${type} soundbites`,
      data: {
        total: soundbiteData.length,
        soundbites: setLimitItems({ ...req.limit, i: soundbiteData }),
      },
    };
  });

  applications = wrapHandler(async (req) => {
    const applicationResponse = await Application.listApplications({
      limit: req.limit,
      filter: {
        author: req.params.id == "me" ? req.user._id : req.params.id,
      },
      populate: ["supervisory"],
    });

    return {
      message: "Applications successfully pulled",
      data: applicationResponse,
    };
  });

  manage = {
    soundbites: {
      broadcast: {
        edit: wrapHandler(async (req) => {
          const { orbit } = req.body;

          const soundbite = await Soundbite.findOne({ id: req.params.id });
          if (!soundbite) {
            throw new NotFoundError("Soundbite not found");
          }

          await UserContent.updateOne(
            { user: req.user._id, "soundbites.broadcast.id": soundbite.id },
            { $set: { "soundbites.broadcast.$.orbit": orbit } },
            { new: true },
          );

          return {
            message:
              "Soundbite content in the feed has been successfully updated.",
          };
        }),
        index: wrapHandler(async (req) => {
          const soundbite = await Soundbite.findOne({ id: req.params.id });
          if (!soundbite) {
            throw new NotFoundError("Soundbite not found");
          }

          await User.populate(
            req.user,
            User.getPopulates("content.soundbites.broadcast"),
          );
          const userData = req.user.toObject({ virtuals: true });
          let isFound = userData.content.soundbites.broadcast.some(
            (h: { id: string }) => h.id == soundbite.id,
          );

          await UserContent.findOneAndUpdate(
            {
              user: req.user._id,
            },
            isFound
              ? { $pull: { "soundbites.broadcast": { id: soundbite.id } } }
              : {
                  $push: {
                    "soundbites.broadcast": {
                      ...soundbite,
                      orbit: 50,
                      createdAt: new Date(),
                    },
                  },
                },
            { upsert: true, new: true },
          );

          isFound = !isFound;

          if (isFound) {
            soundbite.broadcasters.push({
              user: req.user._id,
              insertedAt: new Date(),
            });
          } else {
            soundbite.broadcasters = soundbite.broadcasters.filter(
              /**@ts-ignore */
              (s) => !s.user.equals(req.user._id),
            );
          }

          await soundbite.save();

          return {
            message: `Soundbite content successfully ${isFound ? "added" : "removed"} to the broadcast.`,
            data: isFound,
          };
        }),
      },
    },
  };
}
