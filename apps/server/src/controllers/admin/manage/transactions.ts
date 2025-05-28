import { Transaction } from "@repo/financial-db";
import {
  DuplicatedDataError,
  NotFoundError,
} from "@xjectro/express/exceptions";
import { wrapHandler } from "@xjectro/express/handlers";

export default class AdminManageTransactionsController {
  status = wrapHandler(async (req) => {
    const { status } = req.params;
    const transaction = await Transaction.findOne({ id: req.params.id });
    if (!transaction) {
      throw new NotFoundError("Transaction is not found");
    }
    if (
      status == transaction.status ||
      transaction.status == "canceled" ||
      transaction.status == "success" ||
      transaction.status == "failed"
    ) {
      throw new DuplicatedDataError(
        "Status is the same as current or changes cannot be made",
      );
    }
    transaction.status = status as "canceled";
    await transaction.save();

    return {
      message: "The status of the transaction has been changed to successful",
    };
  });
}
