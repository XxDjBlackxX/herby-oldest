import { Application } from "@repo/content-db";
import {
  DuplicatedDataError,
  NotFoundError,
} from "@xjectro/express/exceptions";
import { wrapHandler } from "@xjectro/express/handlers";

export default class AdminManageApplicationsController {
  status = wrapHandler(async (req) => {
    const { status } = req.params;
    const application = await Application.findOne({ id: req.params.id });
    if (!application) {
      throw new NotFoundError("Application is not found");
    }

    if (
      status == application.status ||
      application.status == "canceled" ||
      application.status == "success" ||
      status == "pending"
    ) {
      throw new DuplicatedDataError(
        "Status is the same as current or changes cannot be made",
      );
    }

    switch (status) {
      case "in-progress":
        application.status = "in-progress";
        break;
      case "canceled":
        application.status = "canceled";
        break;
      case "success":
        application.status = "success";
        break;
      case undefined:
        throw new NotFoundError("The status you entered is incorrect.");
    }

    /**@ts-ignore */
    application.supervisory = req.user._id;

    await application.save();

    return { message: "The status of the application has been changed" };
  });
}
