import Controller from "@/controllers/auth";
import * as schema from "@/utils/validation/auth.schema";
import { verifyPermission } from "@/middleware";

import { PERMISSIONS } from "@repo/permission-utils";
import { Router } from "@xjectro/express/types";
import { validate } from "@xjectro/express/middleware/validate";

export default class Routes {
  private controller = new Controller();

  constructor(private router: Router) {
    this.router.get(
      "/connections/:type/redirect",
      this.controller.connections.redirect,
    );

    this.router.delete(
      "/connections/disconnect",
      verifyPermission(PERMISSIONS.user),
      this.controller.connections.disconnect,
    );

    this.router.post("/login", this.controller.login);
    this.router.post(
      "/register",
      validate(schema.register, "body"),
      this.controller.register,
    );
    this.router.post(
      "/forgot-password",
      validate(schema.forgot_password, "body"),
      this.controller.forgotPassword,
    );
    this.router.post(
      "/refresh-password",
      validate(schema.refresh_password, "body"),
      this.controller.refreshPassword,
    );
    this.router.post(
      "/protection/:type",
      validate(schema.protection, "body"),
      verifyPermission(PERMISSIONS.user),
      this.controller.protection,
    );
    this.router.post(
      "/interaction-token/verify",
      validate(schema.interactionToken.verify, "body"),
      this.controller.interactionToken.verify,
    );
    this.router.post(
      "/interaction-token/use",
      validate(schema.interactionToken.use, "body"),
      this.controller.interactionToken.use,
    );
    this.router.post("/connections/:type", this.controller.connections.index);

    this.router.patch(
      "/account/email",
      validate(schema.account.email, "body"),
      verifyPermission(PERMISSIONS.user),
      this.controller.account.email,
    );
    this.router.patch(
      "/account/password",
      validate(schema.account.password, "body"),
      verifyPermission(PERMISSIONS.user),
      this.controller.account.password,
    );
  }
}
