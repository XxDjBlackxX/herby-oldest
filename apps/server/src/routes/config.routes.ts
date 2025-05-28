import Controller from "../controllers/config";

import type { Router } from "@xjectro/express/types";

export default class Routes {
  private controller = new Controller();

  constructor(private router: Router) {
    this.router.get("/", this.controller.index);
    this.router.put("/currencies", this.controller.currencies);
    this.router.put("/orbits", this.controller.orbits);
  }
}
