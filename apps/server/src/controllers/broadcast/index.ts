import { User, UserAnalytical, UserHistory, UserPayment } from "@repo/user-db";
import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "@xjectro/express/exceptions";
import { wrapHandler } from "@xjectro/express/handlers";
import { PERMISSIONS, hasPermission } from "@repo/permission-utils";
import { ORBIT_CURRENCY } from "@repo/platform-config";
import { Transaction } from "@repo/financial-db";

const BROADCASTER_POPULATES = User.getPopulates("content.soundbites.broadcast");
const BROADCASTER_PAYMENT_POPULATES = User.getPopulates(
  "content.soundbites.broadcast",
  "payment",
);

export default class Controller {
  trigger = {
    soundbite: {
      test: wrapHandler(async (req, res) => {
        let broadcaster;

        if (req.params.broadcaster == req.user.id) {
          await User.populate(req.user, BROADCASTER_POPULATES);
          broadcaster = req.user;
        } else {
          if (!hasPermission(req.user.permission, PERMISSIONS.admin)) {
            throw new UnauthorizedError(
              "You do not have the authority to perform this action.",
            );
          }
          broadcaster = await User.findOne({
            $or: [
              { username: req.params.broadcaster },
              { id: req.params.broadcaster },
            ],
          }).populate(BROADCASTER_POPULATES);
        }
        if (
          !broadcaster ||
          !broadcaster.verifyPermission(PERMISSIONS.broadcaster)
        ) {
          throw new UnauthorizedError("No broadcaster found");
        }

        const broadcasterData = broadcaster.toObject({ virtuals: true });
        const soundbite = broadcasterData.content.soundbites.broadcast.find(
          (v: any) => v.id == req.params.soundbite,
        );
        if (!soundbite) {
          throw new UnauthorizedError(
            "This soundbite is not in your broadcast content.",
          );
        }

        const io = req.app.get("socketio");

        const data = {
          ...soundbite,
          env: "test",
          sender: broadcaster.username,
        };

        io.emit(`/webhook/${broadcaster.id}/soundbites`, {
          ...data,
        });

        await Promise.all([
          UserAnalytical.updateOne(
            {
              user: broadcaster._id,
              "soundbites.broadcast.name": soundbite.title,
            },
            {
              $inc: { "soundbites.broadcast.$.testCount": 1 },
              $set: { "soundbites.broadcast.$.updatedAt": new Date() },
            },
          ),
          UserAnalytical.updateOne(
            {
              user: broadcaster._id,
              "soundbites.broadcast.name": { $ne: soundbite.title },
            },
            {
              $push: {
                "soundbites.broadcast": {
                  name: soundbite.title,
                  saleCount: 0,
                  testCount: 1,
                  updatedAt: new Date(),
                },
              },
            },
          ),
          UserHistory.updateOne(
            { user: broadcaster._id },
            {
              $push: {
                "soundbites.broadcast": {
                  ...data,
                  orbit: null,
                  createdAt: new Date(),
                },
              },
            },
            { upsert: true, new: true },
          ),
        ]);

        return { message: "Successfully send soundbite" };
      }),
      prod: wrapHandler(async (req, res) => {
        const { orbit } = req.body;

        const broadcaster = await User.findOne({
          $or: [
            { username: req.params.broadcaster },
            { id: req.params.broadcaster },
          ],
        });
        if (
          !broadcaster ||
          req.user.id == broadcaster.id ||
          !broadcaster.verifyPermission(PERMISSIONS.broadcaster)
        ) {
          throw new NotFoundError("Broadcaster not found");
        }

        await broadcaster.populate(BROADCASTER_PAYMENT_POPULATES);

        const broadcasterData = broadcaster.toObject({ virtuals: true });
        const soundbite = broadcasterData.content.soundbites.broadcast.find(
          (v) => v.id == req.params.soundbite,
        );
        if (!soundbite) {
          throw new UnauthorizedError(
            "This soundbite is not in your broadcast content.",
          );
        }

        const io = req.app.get("socketio");

        const data = {
          ...soundbite,
          env: "sale",
          sender: req.user.username,
        };

        io.emit(`/webhook/${broadcaster.id}/soundbites`, {
          ...data,
        });

        await req.user.populate("payment");

        if (req.user.payment.orbit.available < orbit) {
          throw new InternalServerError("Your balance is insufficient");
        }

        await Promise.all([
          UserAnalytical.updateOne(
            {
              user: req.user._id,
              "soundbites.broadcast.name": soundbite.title,
            },
            {
              $inc: { "soundbites.broadcast.$.saleCount": 1 },
              $set: { "soundbites.broadcast.$.updatedAt": new Date() },
            },
          ),
          UserAnalytical.updateOne(
            {
              user: req.user._id,
              "soundbites.broadcast.name": { $ne: soundbite.title },
            },
            {
              $push: {
                "soundbites.broadcast": {
                  name: soundbite.title,
                  saleCount: 1,
                  testCount: 0,
                  updatedAt: new Date(),
                },
              },
            },
          ),
          UserPayment.bulkWrite([
            {
              updateOne: {
                filter: { user: req.user._id },
                update: {
                  $inc: {
                    "orbit.available": -orbit,
                  },
                },
              },
            },
            {
              updateOne: {
                filter: { user: broadcaster._id },
                update: {
                  $inc: {
                    "orbit.withdrawable": orbit,
                  },
                },
              },
            },
          ]),
          UserHistory.updateOne(
            { user: broadcaster._id },
            {
              $push: {
                "soundbites.broadcast": {
                  ...data,
                  orbit,
                  createdAt: new Date(),
                },
              },
            },
            { upsert: true, new: true },
          ),
          Transaction.createTransaction({
            author: req.user._id,
            amount: orbit,
            currency: ORBIT_CURRENCY,
            type: "expense",
            status: "success",
          }),
          Transaction.createTransaction({
            author: broadcaster._id,
            amount: orbit,
            currency: ORBIT_CURRENCY,
            type: "income",
            status: "success",
          }),
        ]);

        return {
          message: "Successfully send soundbite",
        };
      }),
    },
  };
}
