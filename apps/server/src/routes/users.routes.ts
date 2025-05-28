import Controller from "@/controllers/users";
import * as schema from "@/utils/validation/users.schema";
import { verifyPermission } from "@/middleware";

import { PERMISSIONS } from "@repo/permission-utils";
import { validate } from "@xjectro/express/middleware/validate";
import type { Router } from "@xjectro/express/types";

export default class Routes {
  controller = new Controller();

  constructor(private router: Router) {
    this.router.get("/:id", this.controller.index);
    this.router.get(
      "/:id/following",
      verifyPermission(PERMISSIONS.user),
      this.controller.following,
    );

    this.router.put(
      "/:id",
      validate(schema.update, "body"),
      verifyPermission({
        perms: [PERMISSIONS.user],
        dynamicPermissions: [
          { key: "id", value: "me", permission: PERMISSIONS.admin },
        ],
      }),
      this.controller.update,
    );
    this.router.put(
      "/:id/analytics/soundbites/:type",
      verifyPermission(PERMISSIONS.broadcaster),
      this.controller.analytics.soundbites,
    );
    this.router.put(
      "/:id/history/soundbites/broadcast",
      verifyPermission(PERMISSIONS.broadcaster),
      this.controller.history.soundbites.broadcast,
    );
    this.router.put(
      "/:id/content/soundbites/:type",
      this.controller.content.soundbites,
    );
    this.router.put(
      "/:id/content/applications",
      verifyPermission({
        perms: [PERMISSIONS.user],
        dynamicPermissions: [
          { key: "id", value: "me", permission: PERMISSIONS.supervisory },
        ],
      }),
      this.controller.content.applications,
    );
    this.router.put(
      "/:id/financial/payments",
      verifyPermission({
        perms: [PERMISSIONS.user],
        dynamicPermissions: [
          { key: "id", value: "me", permission: PERMISSIONS.financier },
        ],
      }),
      this.controller.financial.payments,
    );
    this.router.put(
      "/:id/financial/transactions",
      verifyPermission({
        perms: [PERMISSIONS.user],
        dynamicPermissions: [
          { key: "id", value: "me", permission: PERMISSIONS.financier },
        ],
      }),
      this.controller.financial.transactions,
    );

    this.router.post(
      "/content/manage/soundbites/:id/broadcast/edit",
      validate(schema.content.op.soundbites.edit, "body"),
      verifyPermission(PERMISSIONS.broadcaster),
      this.controller.content.manage.soundbites.broadcast.edit,
    );
    this.router.post(
      "/content/manage/soundbites/:id/broadcast",
      verifyPermission(PERMISSIONS.broadcaster),
      this.controller.content.manage.soundbites.broadcast.index,
    );
    this.router.post(
      "/me/withdraw",
      verifyPermission(PERMISSIONS.broadcaster),
      this.controller.withdraw,
    );
    this.router.post(
      "/me/change-currency/:id",
      verifyPermission(PERMISSIONS.user),
      this.controller.changeCurrency,
    );
  }
}
