import Controller from "@/controllers/payments";
import { verifyPermission } from "@/middleware";

import { PERMISSIONS } from "@repo/permission-utils";
import type { Router } from "@xjectro/express/types";

export default class Routes {
  private controller = new Controller();

  constructor(private router: Router) {
    this.router.get(
      "/:id",
      verifyPermission(PERMISSIONS.user),
      this.controller.index,
    );

    this.router.post(
      "/",
      verifyPermission(PERMISSIONS.user),
      this.controller.create,
    );
    this.router.post(
      "/:id/iyzico",
      verifyPermission(PERMISSIONS.user),
      this.controller.iyzico.pay,
    );
  }
}
