import { wrapHandler } from "@xjectro/express/handlers";
import PaymentIyzicoController from "./iyzico";

import { Payment } from "@repo/financial-db";
import { User } from "@repo/user-db";

export default class PaymentController {
  iyzico = new PaymentIyzicoController();

  index = wrapHandler(async (req) => {
    const payment = await Payment.checkPayment({
      id: req.params.id,
      requester: req.user._id,
    });
    return {
      data: payment.toObject({ virtuals: true }),
    };
  });
  create = wrapHandler(async (req) => {
    await req.user.populate(User.getPopulates("payment"));

    const payment = await Payment.createPayment({
      basketItems: req.body.basketItems,
      author: req.user._id,
      currency: req.user.payment.currency._id,
    });

    return {
      data: payment.toObject({ virtuals: true }),
    };
  });
}
