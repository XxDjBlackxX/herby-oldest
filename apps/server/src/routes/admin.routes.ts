import Controller from "@/controllers/admin";
import { verifyPermission } from "@/middleware/authenticate";

import { PERMISSIONS } from "@repo/permission-utils";
import { Router } from "@xjectro/express/types";

export default class Routes {
  private controller = new Controller();

  constructor(private router: Router) {
    this.router.put(
      "/data/analytics/payments",
      verifyPermission(PERMISSIONS.financier),
      // @ts-ignore - Ignore type errors for Request object custom properties
      this.controller.data.analytics.payments,
    );
    this.router.put(
      "/data/users/:id",
      verifyPermission([PERMISSIONS.moderator, PERMISSIONS.admin]),
      this.controller.data.users.index,
    );
    this.router.put(
      "/data/applications/:status",
      verifyPermission(PERMISSIONS.supervisory),
      this.controller.data.applications,
    );
    this.router.put(
      "/data/transactions/:status/:priority",
      verifyPermission(PERMISSIONS.financier),
      this.controller.data.transactions,
    );

    this.router.post(
      "/manage/users/:id/permission/:perm",
      verifyPermission(PERMISSIONS.admin),
      this.controller.manage.users.permission,
    );
    this.router.post(
      "/manage/users/:id/commission/:currency/:method",
      verifyPermission(PERMISSIONS.admin),
      this.controller.manage.users.comission,
    );
    this.router.post(
      "/manage/applications/:id/status/:status",
      verifyPermission(PERMISSIONS.supervisory),
      this.controller.manage.applications.status,
    );
    this.router.post(
      "/manage/transactions/:id/status/:status",
      verifyPermission(PERMISSIONS.financier),
      this.controller.manage.transactions.status,
    );
    this.router.post(
      "/manage/currencies",
      verifyPermission(PERMISSIONS.financier),
      this.controller.manage.currencies.create,
    );
    this.router.post(
      "/manage/currencies/:id/edit",
      verifyPermission(PERMISSIONS.financier),
      this.controller.manage.currencies.edit,
    );

    this.router.delete(
      "/manage/currencies/:id",
      verifyPermission(PERMISSIONS.financier),
      this.controller.manage.currencies.delete,
    );
  }
}
