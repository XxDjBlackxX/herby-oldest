import { Payment, Transaction } from "@repo/financial-db";
import { wrapHandler } from "@xjectro/express/handlers";

export default class UsersFinancialController {
  payments = wrapHandler(async (req) => {
    const paymentResponse = await Payment.listPayments({
      limit: req.limit,
      filter: {
        author: req.params.id == "me" ? req.user._id : req.params.id,
      },
    });

    return {
      message: "Payments successfully pulled",
      data: paymentResponse,
    };
  });
  transactions = wrapHandler(async (req) => {
    const transactionResponse = await Transaction.listTransactions({
      limit: req.limit,
      filter: {
        author: req.params.id == "me" ? req.user._id : req.params.id,
      },
    });

    return {
      message: "Payments successfully pulled",
      data: transactionResponse,
    };
  });
}
