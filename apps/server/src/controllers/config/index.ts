import { wrapHandler } from "@xjectro/express/handlers";
import { Currency } from "@repo/financial-db";
import { User, type UserPaymentSchema } from "@repo/user-db";
import { ORBIT_CURRENCY, ORBIT_TIERS } from "@repo/platform-config";

export default class Controller {
  index = wrapHandler(async () => {
    const { currencies } = await Currency.getCurrencies();

    return { data: { currencies } };
  });

  currencies = wrapHandler(async () => {
    const { currencies, total } = await Currency.getCurrencies();

    return {
      code: 200,
      success: true,
      data: { currencies, total },
    };
  });

  orbits = wrapHandler(async (req) => {
    await req.user.populate(User.getPopulates("payment"));

    const payment = req.user.payment as UserPaymentSchema;
    const currency = payment.currency;

    const orbits = ORBIT_TIERS.map(({ orbit, popular = false, bonus = 0 }) => {
      const basePrice = Number(
        (orbit * ORBIT_CURRENCY.rate * currency.rate).toFixed(2),
      );
      const bonusOrbits = Math.floor(orbit * (bonus / 100));

      return {
        id: `ORBIT-${orbit}`,
        orbit,
        bonusOrbits: bonusOrbits,
        totalOrbits: orbit + bonusOrbits,
        totalPrice: basePrice,
        popular,
      };
    });

    return {
      data: {
        orbits,
        total: orbits.length,
      },
    };
  });
}
