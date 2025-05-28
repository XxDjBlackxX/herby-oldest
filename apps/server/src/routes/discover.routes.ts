import Controller from "../controllers/discover";

import { BadRequestError } from "@xjectro/express/exceptions";
import type { Router } from "@xjectro/express/types";

const TARGETS = ["soundbite"];

export default class Routes {
  private controller = new Controller();

  constructor(private router: Router) {
    this.router.put("/:type", (req, res) => {
      const target = (req.body.target || "soundbite") as "soundbite";
      if (!TARGETS.includes(target)) {
        throw new BadRequestError("The destination you entered is incorrect.");
      }

      return this.controller[target](req, res);
    });
  }
}
