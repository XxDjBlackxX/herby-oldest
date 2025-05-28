import Controller from "@/controllers/cdn";
import { verifyPermission, upload } from "@/middleware";

import { PERMISSIONS } from "@repo/permission-utils";
import type { Router } from "@xjectro/express/types";

export default class Routes {
  private controller = new Controller();

  constructor(private router: Router) {
    this.router.post(
      "/upload/file",
      verifyPermission(PERMISSIONS.user),
      upload.fields([
        {
          name: "attachment",
        },
      ]),
      this.controller.uploadFile,
    );
    this.router.get(
      "/download/file/:path/:fileName",
      this.controller.downloadFile,
    );
  }
}
