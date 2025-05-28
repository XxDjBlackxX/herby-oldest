import { User, UserPayment } from "@repo/user-db";
import { wrapHandler } from "@xjectro/express/handlers";
import AdminDataUsersController from "./users";
import { Application } from "@repo/content-db";
import { Transaction } from "@repo/financial-db";

export default class AdminDataController {
  users = new AdminDataUsersController();

  applications = wrapHandler(async (req) => {
    const applicationResponse = await Application.listApplications({
      limit: req.limit,
      filter: {
        status: req.params.status,
      },
      populate: ["author", "supervisory"],
    });

    return {
      message: "Applications successfully pulled",
      data: applicationResponse,
    };
  });

  transactions = wrapHandler(async (req) => {
    const transactionResponse = await Transaction.listTransactions({
      limit: req.limit,
      filter: {
        status: req.params.status as "pending",
        priority: req.params.priority as "low",
      },
      populate: ["author"],
    });

    return {
      message: "Transactions successfully pulled",
      data: transactionResponse,
    };
  });

  analytics = {
    payments: wrapHandler(async () => {
      const payments = await UserPayment.aggregate([
        {
          $lookup: {
            from: User.collection.name,
            localField: "user",
            foreignField: "_id",
            as: "userInfo",
          },
        },
        {
          $unwind: {
            path: "$userInfo",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 0,
            name: { $ifNull: ["$userInfo.username", "Unknown"] },
            "orbit.available": { $ifNull: ["$orbit.available", 0] },
            "orbit.pending": { $ifNull: ["$orbit.pending", 0] },
            "orbit.withdrawable": { $ifNull: ["$orbit.withdrawable", 0] },
          },
        },
        {
          $group: {
            _id: null,
            orbit: {
              $push: {
                name: "$name",
                available: "$orbit.available",
                pending: "$orbit.pending",
                withdrawable: "$orbit.withdrawable",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            orbit: 1,
          },
        },
      ]);

      return {
        message: "Payment analytics successfully pulled",
        data: payments.length ? payments[0] : { orbit: [] },
      };
    }),
  };
}
