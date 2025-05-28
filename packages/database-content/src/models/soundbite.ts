import { Schema, Types } from "mongoose";

import { connection } from "@repo/content-db/connection";
import type {
  SoundbiteModel,
  SoundbiteSchema,
  FormatSoundbiteData,
  ListSoundbites,
} from "@repo/content-db/types";

import { UserProfile, User } from "@repo/user-db";
import { NotFoundError } from "@xjectro/express/exceptions";

const visibilitiesEnum = new Set(["public", "private"] as const);

const soundbiteSchema = new Schema<SoundbiteSchema>(
  {
    author: { type: Schema.Types.ObjectId, required: true },
    id: {
      type: String,
      required: true,
    },
    audio: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default: `${process.env.CLIENT_URL}/assets/character/04.svg`,
    },
    title: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    visibility: {
      type: String,
      required: true,
      enum: Array.from(visibilitiesEnum),
    },
    likers: [
      {
        user: {
          type: Types.ObjectId,
          ref: "user",
        },
        insertedAt: {
          type: Date,
          default: () => new Date(),
        },
      },
    ],
    broadcasters: [
      {
        user: {
          type: Types.ObjectId,
          ref: "user",
        },
        insertedAt: {
          type: Date,
          default: () => new Date(),
        },
      },
    ],
  },
  { timestamps: true },
);

soundbiteSchema.virtual("likeCount").get(function (this: SoundbiteSchema) {
  return this.likers.length;
});
soundbiteSchema.virtual("broadcasterCount").get(function (
  this: SoundbiteSchema,
) {
  return this.broadcasters.length;
});

soundbiteSchema.index({ title: "text" });
soundbiteSchema.index({ tags: 1 });
soundbiteSchema.index({ "broadcasters.insertedAt": 1 });
soundbiteSchema.index({ "likers.insertedAt": 1 });

soundbiteSchema.statics.validateVisibility = function (visibility: string) {
  if (
    !visibilitiesEnum.has(
      visibility as typeof visibilitiesEnum extends Set<infer T> ? T : never,
    )
  ) {
    throw new NotFoundError("The entered visibility is invalid");
  }
};

soundbiteSchema.statics.getPopulates = function (...args: string[]) {
  const populates = new Map([
    [
      "author",
      {
        path: "author",
        model: User,
        select: "id username",
      },
    ],
    [
      "likers",
      {
        path: "likers.user",
        model: User,
        select: "id username",
      },
    ],
    [
      "broadcasters",
      {
        path: "broadcasters.user",
        model: User,
        select: "id username",
        populate: [
          {
            path: "profile",
            model: UserProfile,
            select: "avatar",
          },
        ],
      },
    ],
  ]);

  return args.map((arg) => populates.get(arg));
};

soundbiteSchema.statics.formatSoundbiteData = function formatSoundbiteData({
  item,
  contain,
  custom,
}: FormatSoundbiteData) {
  let payload = {
    ...item,
    requesting: {
      isBroadcast: contain?.broadcast
        ? contain?.broadcast.some((v) =>
            Types.ObjectId.isValid(v) ? v.equals(item._id) : v.id === item.id,
          )
        : false,
      isLiked: contain?.liked
        ? contain?.liked.some((v) =>
            Types.ObjectId.isValid(v) ? v.equals(item._id) : v.id === item.id,
          )
        : false,
      owner: contain?.created
        ? contain?.created.some((v) =>
            Types.ObjectId.isValid(v) ? v.equals(item._id) : v.id === item.id,
          )
        : false,
    },
  };

  if (
    !Types.ObjectId.isValid(payload.author) &&
    typeof payload.author == "object"
  ) {
    delete payload.author._id;
  }

  if (payload.broadcasters) {
    payload.broadcasters = payload.broadcasters.sort(
      (a: any, b: any) => b.date - a.date,
    );
    payload.broadcasters = payload.broadcasters
      .filter(
        (v: any) =>
          !Types.ObjectId.isValid(v.user) && typeof v.user == "object",
      )
      .map((v: any) => ({
        user: {
          id: v.user.id,
          avatar: v.user.profile.avatar,
          username: v.user.username,
        },
        date: v.date,
      }));
    payload.broadcasters = payload.broadcasters.slice(0, 10);
  }

  if (payload.likers) {
    payload.likeCount = (payload.likers || []).length;
    delete payload.likers;
  }
  if (payload.tags) {
    delete payload.tags;
  }
  if (payload.visibility) {
    delete payload.visibility;
  }
  delete payload._id;
  if (payload.updatedAt) {
    delete payload.updatedAt;
  }

  if (custom) {
    for (const [name, value] of Object.entries(custom) as [
      keyof typeof custom,
      boolean,
    ][]) {
      if (typeof value === "boolean") {
        payload.requesting[name] = value;
      }
    }
  }

  return payload;
};

soundbiteSchema.statics.listSoundbites = async function listSoundbites({
  limit,
  filters,
  contain,
}: ListSoundbites) {
  const { before, after } = limit;
  const pipeline: any[] = [];

  for (const filter of filters) {
    if (
      typeof filter == "object" &&
      filter.name == "search" &&
      filter.query?.length
    ) {
      pipeline.push(
        {
          $addFields: {
            matchScore: {
              $size: {
                $filter: {
                  input: "$tags",
                  as: "tag",
                  cond: {
                    $regexMatch: {
                      input: "$$tag",
                      regex: filter.query,
                      options: "i",
                    },
                  },
                },
              },
            },
          },
        },
        { $match: { matchScore: { $gt: 0 } } },
      );
    }

    if (
      (typeof filter == "object" && filter.name == "most-liked") ||
      filter == "most-liked"
    ) {
      pipeline.push(
        {
          $addFields: {
            weightedLikeCount: {
              $let: {
                vars: {
                  lastLiked: {
                    $filter: {
                      input: "$likers",
                      as: "liker",
                      cond: {
                        $gte: [
                          "$$liker.insertedAt",
                          new Date(
                            new Date().setDate(new Date().getDate() - 30),
                          ),
                        ],
                      },
                    },
                  },
                },
                in: { $size: "$$lastLiked" },
              },
            },
          },
        },
        { $sort: { weightedLikeCount: -1, "likers.insertedAt": -1 } },
      );
    }

    if (
      (typeof filter == "object" &&
        filter.name == "most-added-broadcast-content") ||
      filter == "most-added-broadcast-content"
    ) {
      pipeline.push(
        {
          $addFields: {
            weightedBroadcasterCount: {
              $let: {
                vars: {
                  lastAdded: {
                    $filter: {
                      input: "$broadcasters",
                      as: "broadcaster",
                      cond: {
                        $gte: [
                          "$$broadcaster.insertedAt",
                          new Date(
                            new Date().setDate(new Date().getDate() - 30),
                          ),
                        ],
                      },
                    },
                  },
                },
                in: { $size: "$$lastAdded" },
              },
            },
          },
        },
        {
          $sort: {
            weightedBroadcasterCount: -1,
            "broadcasters.insertedAt": -1,
          },
        },
      );
    }

    if (
      (typeof filter == "object" && filter.name == "new-uploads") ||
      filter == "new-uploads"
    ) {
      pipeline.push({ $sort: { createdAt: -1 } });
    }
  }

  pipeline.push({ $skip: after }, { $limit: before > 0 ? before - after : 10 });

  const total = await Soundbite.countDocuments(pipeline);
  if (total == 0) {
    return {
      total: 0,
      soundbites: [],
    };
  }

  let soundbites = await Soundbite.aggregate(pipeline);

  await Soundbite.populate(soundbites, Soundbite.getPopulates("author"));

  soundbites = soundbites.map((item) =>
    Soundbite.formatSoundbiteData({ item, contain }),
  );

  return {
    soundbites,
    total,
  };
};

export const Soundbite = connection.model<SoundbiteSchema, SoundbiteModel>(
  "soundbite",
  soundbiteSchema,
);
