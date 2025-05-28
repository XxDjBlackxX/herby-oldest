import { wrapHandler } from "@xjectro/express/handlers";
import { Currency } from "@repo/financial-db";

export default class AdminManageCurrenciesController {
  create = wrapHandler(async (req) => {
    const { name, code, symbol, rate } = req.body;

    await Currency.create({
      name,
      code,
      symbol,
      rate,
    });

    return { message: "Currencies were successfully withdrawn" };
  });

  edit = wrapHandler(async (req) => {
    const id = req.params.id;

    await Currency.updateOne({ id }, { $set: req.body });

    return { message: "Currency successfully edited" };
  });

  delete = wrapHandler(async (req) => {
    const id = req.params.id;

    await Currency.deleteOne({ id });

    return { message: "Currency deleted successfully" };
  });
}
