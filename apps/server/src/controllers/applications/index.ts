import { Application } from "@repo/content-db";
import { DuplicatedDataError } from "@xjectro/express/exceptions";
import { wrapHandler } from "@xjectro/express/handlers";
import { generateHash } from "@xjectro/express-crypto";

export default class Controller {
  create = wrapHandler(async (req) => {
    const exists = await Application.exists({
      $or: [
        { status: "pending", author: req.user._id },
        { status: "in-progress", author: req.user._id },
        { status: "success", author: req.user._id },
      ],
    });
    if (exists) {
      throw new DuplicatedDataError("You already have an application");
    }

    await Application.create({
      author: req.user._id,
      id: generateHash("hex", {
        author: req.user.id,
        type: req.body.type,
        detail: req.body.detail,
        status: "pending",
      }),
      ...req.body,
    });

    return { message: "Application successfully created" };
  });
}
