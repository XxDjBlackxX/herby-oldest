import {
  User,
  UserPayment,
  UserProfile,
  type UserConnectionSchema,
} from "@repo/user-db";
import UsersContentController from "./content";
import { ALLOWED_USER_FIELDS } from "../../api";
import UsersAnalyticsController from "./analytics";
import UsersHistoryController from "./history";
import {
  NotFoundError,
  UnauthorizedError,
  InternalServerError,
} from "@xjectro/express/exceptions";
import { wrapHandler } from "@xjectro/express/handlers";
import UsersFinancialController from "./financial";
import {
  createAvatarURL,
  createBannerURL,
  flattenObject,
  prepareStateUpdates,
} from "@repo/helpers-utils";
import { Currency, Transaction } from "@repo/financial-db";
import { ORBIT_CURRENCY } from "@repo/platform-config";

export default class Controller {
  content = new UsersContentController();
  analytics = new UsersAnalyticsController();
  history = new UsersHistoryController();
  financial = new UsersFinancialController();

  index = wrapHandler(async (req) => {
    const id = req.params.id;
    let responseData: any;
    const fields = ((req.query.fields as string) || "")?.split(",") || [];

    if (id == "me") {
      if (!req.isLoggedIn()) {
        throw new UnauthorizedError("User is not logged in");
      }
      await req.user.populate(
        User.getPopulates("profile", "identity", "payment", "connections"),
      );

      const userData = req.user.toObject({ virtuals: true });
      userData.connections = userData.connections.map(
        (connection: UserConnectionSchema) => ({
          id: connection.data.id,
          name: connection.data.name,
          username: connection.data.username,
          type: connection.type,
        }),
      );
      responseData = userData;
    } else {
      const user = await User.findOne({
        $or: [{ username: req.params.id }, { id: req.params.id }],
      })
        .populate(User.getPopulates("profile"))
        .select("username connections profile permission id");
      if (!user) {
        throw new NotFoundError("User is not found!");
      }

      await user.populate(
        fields.filter((scope) => ALLOWED_USER_FIELDS.includes(scope)),
      );

      const { profile, ...userData }: any = user.toObject({ virtuals: true });

      if (fields.includes("connections") && userData.connections?.length) {
        userData.connections = userData.connections.map(
          (connection: UserConnectionSchema) => ({
            id: connection.data.id,
            name: connection.data.name,
            username: connection.data.username,
            type: connection.type,
          }),
        );
      }

      if (req.isLoggedIn()) {
        userData.requesting = {
          isFollowing: (profile.followers || []).some((v: any) =>
            v.user.equals(req.user?._id),
          ),
          avatar: req.user.profile.avatar,
          banner: req.user.profile.banner,
          username: req.user.username,
          permission: req.user.permission,
        };
      } else {
        userData.requesting = {
          isFollowing: false,
          avatar: null,
          banner: null,
          username: null,
          permission: null,
        };
      }

      userData.followerCount = profile.followers.length;

      const { description, avatar, banner } = profile;
      responseData = { ...userData, description, avatar, banner };
    }

    return {
      message: "Successfully retrieved user",
      data: responseData,
    };
  });

  following = wrapHandler(async (req) => {
    const user = await User.findOne({
      $or: [{ username: req.params.id }, { id: req.params.id }],
    }).populate(User.getPopulates("profile"));
    if (!user) {
      throw new NotFoundError("User is not found!");
    }
    if (user._id == req.user._id) {
      throw new UnauthorizedError("You can't follow yourself");
    }

    let following = user.profile.followers.some((v: any) =>
      v.user.equals(req.user?._id),
    );

    await UserProfile.updateOne(
      { user: user._id },
      following
        ? { $pull: { followers: { user: req.user._id } } }
        : {
            $push: {
              followers: { user: req.user._id, date: new Date() },
            },
          },
    );

    following = !following;

    let followerCount = user.profile.followers.length;

    if (following) {
      followerCount = followerCount + 1;
    } else {
      followerCount = followerCount - 1;
    }

    return {
      message: following ? "Unfollowed successfully" : "Followed successfully",
      data: { following, followerCount },
    };
  });

  update = wrapHandler(async (req) => {
    let userId;
    if (req.params.id == "me") {
      userId = req.user._id;
    } else {
      const user = await User.findByIdOrUsername(req.params.id, {
        throwError: true,
      });
      userId = user?._id;
    }

    let { id, createdAt, updatedAt, email, username, ...updateData } = req.body;

    if (updateData.avatar && updateData.avatar.url === null) {
      updateData.avatar.url = createAvatarURL();
    }

    if (updateData.banner && updateData.banner.url === null) {
      updateData.banner.url = createBannerURL();
    }

    const flattenedData = flattenObject(updateData);

    const result = await UserProfile.findOneAndUpdate(
      { user: userId },
      { $set: prepareStateUpdates(flattenedData) },
      { runValidators: true },
    );

    if (!result) throw new NotFoundError("User not found!");

    return {
      message: "Successfully updated user profile",
      data: result.toObject({ virtuals: true }),
    };
  });
  withdraw = wrapHandler(async (req) => {
    await req.user.populate("payment");

    const { withdrawable } = req.user.payment.orbit;

    if (withdrawable < parseInt(process.env.MIN_WITHDRAWABLE_ORBIT!)) {
      throw new InternalServerError(
        "You have insufficient orbits for the pull request",
      );
    }

    const { convertedAmount, baseCurrency } = await Currency.convertToBaseRate({
      rate: ORBIT_CURRENCY.rate,
      amount: withdrawable,
    });

    await Transaction.createTransaction({
      currency: baseCurrency,
      type: "withdraw",
      status: "pending",
      author: req.user._id,
      amount: convertedAmount,
      payee: req.body,
      priority: "high",
    });
    await UserPayment.updateOne(
      { user: req.user._id },
      {
        $inc: {
          "orbit.pending": withdrawable,
          "orbit.withdrawable": -withdrawable,
        },
      },
    );

    return {
      message: "Orbit withdrawal request received successfully",
    };
  });

  changeCurrency = wrapHandler(async (req) => {
    const currency = await Currency.findOne({ id: req.params.id });
    if (!currency) {
      throw new NotFoundError("Currency is not found!");
    }

    await UserPayment.updateOne(
      { user: req.user._id },
      { $set: { currency: currency._id } },
    );

    return {
      message: "Currency changed successfully",
    };
  });
}
