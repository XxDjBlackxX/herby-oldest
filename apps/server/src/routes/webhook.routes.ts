import Controller from "../controllers/webhook";

import type { Router } from "@xjectro/express/types";

export default class Routes {
  private controller = new Controller();

  constructor(private router: Router) {
    this.router.get("/:id/soundbites", this.controller.soundbites);
  }
}
