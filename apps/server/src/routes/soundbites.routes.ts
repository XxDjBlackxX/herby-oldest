import Controller from "@/controllers/soundbites";
import * as schema from "@/utils/validation/soundbite.schema";
import { verifyPermission } from "@/middleware";

import { PERMISSIONS } from "@repo/permission-utils";
import { validate } from "@xjectro/express/middleware/validate";
import type { Router } from "@xjectro/express/types";

export default class Routes {
  private controller = new Controller();

  constructor(private router: Router) {
    this.router.post(
      "/",
      validate(schema.create, "body"),
      verifyPermission(PERMISSIONS.user),
      this.controller.create,
    );
    this.router.put("/:id", this.controller.index);
    this.router.delete(
      "/:id",
      verifyPermission(PERMISSIONS.user),
      this.controller.delete,
    );
    this.router.get(
      "/:id/liking",
      verifyPermission(PERMISSIONS.user),
      this.controller.liking,
    );
  }
}
