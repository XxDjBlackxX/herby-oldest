import Controller from "@/controllers/applications";
import * as schema from "@/utils/validation/applications.schema";
import { verifyPermission } from "@/middleware";

import { PERMISSIONS } from "@repo/permission-utils";
import { Router } from "@xjectro/express/types";
import { validate } from "@xjectro/express/middleware/validate";

export default class Routes {
  private controller = new Controller();

  constructor(private router: Router) {
    this.router.post(
      "/",
      validate(schema.create, "body"),
      verifyPermission(PERMISSIONS.user),
      this.controller.create,
    );
  }
}
