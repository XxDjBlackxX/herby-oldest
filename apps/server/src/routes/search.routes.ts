import Controller from "@/controllers/search";
import { verifyPermission } from "@/middleware";

import { PERMISSIONS } from "@repo/permission-utils";
import { BadRequestError } from "@xjectro/express/exceptions";
import type { Router } from "@xjectro/express/types";

const TARGETS = ["soundbite", "users"];

export default class Routes {
  private controller = new Controller();

  constructor(private router: Router) {
    this.router.put("/:query", (req, res) => {
      const target = (req.body.target || "soundbite") as "soundbite" | "users";
      if (!TARGETS.includes(target)) {
        throw new BadRequestError("The destination you entered is incorrect.");
      }

      if (target == "users") {
        return verifyPermission(PERMISSIONS.admin)(req, res, () =>
          this.controller[target](req, res),
        );
      }

      return this.controller[target](req, res);
    });
  }
}
