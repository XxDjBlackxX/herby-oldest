import { Payment } from "@repo/financial-db";
import { NotFoundError } from "@xjectro/express/exceptions";
import { wrapHandler } from "@xjectro/express/handlers";
import Iyzipay, { type PaymentRequestData } from "iyzipay";
import { User } from "@repo/user-db";

export default class PaymentIyzicoController {
  iyzipay = new Iyzipay({
    apiKey: process.env.IYZICO_API_KEY!,
    secretKey: process.env.IYZICO_SECRET_KEY!,
    uri: process.env.IYZICO_URI!,
  });

  pay = wrapHandler(async (req) => {
    const payment = await Payment.findOne({ id: req.params.id });
    if (!payment) {
      throw new NotFoundError("Payment is not found!");
    }
    const { paymentCard, address } = req.body;

    await req.user.populate(User.getPopulates("identity", "profile"));

    const request: PaymentRequestData = {
      locale: Iyzipay.LOCALE.EN,
      conversationId: payment.id,
      installments: 0,
      price: payment.totalPrice.toString(),
      paidPrice: payment.totalPrice.toString(),
      /**@ts-ignore */
      currency: Iyzipay.CURRENCY[payment.currency.code as "USD"],
      paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      paymentCard: {
        cardHolderName: paymentCard.cardHolderName,
        cardNumber: paymentCard.cardNumber,
        expireMonth: paymentCard.expireDate.split("/")[0],
        expireYear: paymentCard.expireDate.split("/")[1],
        cvc: paymentCard.cvc,
        cardAlias: `${paymentCard.cardHolderName}`,
      },
      buyer: {
        id: req.user.id,
        name: req.user.profile.name,
        surname: req.user.profile.surname,
        gsmNumber: req.user.identity.gsm.number,
        email: req.user.identity.email,
        identityNumber: req.user.identity.identifyNumber,
        registrationAddress: address.addressLine,
        city: address.city,
        country: address.country,
        zipCode: address.zipCode,
        ip: "",
      },
      shippingAddress: {
        contactName: `${req.user.profile.name} ${req.user.profile.surname}`,
        city: address.city,
        country: address.country,
        address: address.addressLine,
        zipCode: address.zipCode,
      },
      billingAddress: {
        contactName: `${req.user.profile.name} ${req.user.profile.surname}`,
        city: address.city,
        country: address.country,
        address: address.addressLine,
        zipCode: address.zipCode,
      },
      basketItems: payment.basketItems.map((i) => ({
        id: i.id,
        name: i.name,
        itemType: Iyzipay.BASKET_ITEM_TYPE[i.type.toUpperCase() as "VIRTUAL"],
        category1: i.category,
        price: String(i.price),
      })),
    };

    const result = await new Promise<any>((resolve, reject) => {
      this.iyzipay.payment.create(request, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });

    if (result.status === "success") {
      payment.status = "success";

      await Promise.all(
        payment.basketItems.map(
          (item) =>
            /**    superServer.emit(item.event.name as any, {
              ...item.event.data,
              author: payment.author,
              user: payment.author,
            })*/
            item,
        ),
      );

      await payment.save();
      return { data: result };
    } else {
      await payment.save();
      return { data: result };
    }
  });
}
