import Controller from "@/controllers/broadcast";
import { verifyPermission } from "@/middleware";

import { PERMISSIONS } from "@repo/permission-utils";
import { BadRequestError } from "@xjectro/express/exceptions";
import { wrapHandler } from "@xjectro/express/handlers";
import type { Router } from "@xjectro/express/types";

type TargetKey = "soundbite";
type ActionKey = "prod" | "test";

export default class Routes {
  private controller = new Controller();

  onTarget({ target }: { target: TargetKey }) {
    return wrapHandler(async (req, res) => {
      const ACTIONS: ActionKey[] = ["prod", "test"];
      const action = req.body.action as ActionKey;
      if (req.body.target !== target || !ACTIONS.includes(action)) {
        throw new BadRequestError("The destination you entered is incorrect.");
      }

      if (!this.controller.trigger?.[target]?.[action]) {
        throw new BadRequestError(`Invalid trigger: ${target}.${action}`);
      }

      return this.controller.trigger[target][action](req, res);
    });
  }

  constructor(private router: Router) {
    this.router.post(
      "/:broadcaster/trigger/:soundbite",
      verifyPermission(PERMISSIONS.broadcaster),
      this.onTarget({ target: "soundbite" }),
    );
  }
}
