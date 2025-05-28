import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "@xjectro/express/exceptions";
import { wrapHandler } from "@xjectro/express/handlers";
import Helpers from "./helpers.utils";
import fs from "fs/promises";
import { CDN_UPLOAD_ACTIONS } from "../../api";
import { Delivery } from "@herbycat/delivery";

const {
  DO_CDN_URL,
  DO_ENDPOINT,
  DO_REGION,
  DO_BUCKET_NAME,
  DO_SECRET_KEY,
  DO_ACCESS_KEY,
} = process.env;

export default class Controller {
  helpers = new Helpers();
  delivery = new Delivery({
    region: DO_REGION!,
    endpoint: DO_ENDPOINT!,
    credentials: {
      accessKeyId: DO_ACCESS_KEY!,
      secretAccessKey: DO_SECRET_KEY!,
    },
    bucketName: DO_BUCKET_NAME!,
    cdnUrl: DO_CDN_URL!,
  });

  uploadFile = wrapHandler(async (req) => {
    const attachment = (req.files as { attachment?: Express.Multer.File[] })
      ?.attachment?.[0];
    const action = req.query.action as string;
    const startTimeStr = req.query.startTime as string;
    const durationStr = req.query.duration as string;

    try {
      if (!attachment) {
        throw new InternalServerError("No file uploaded");
      }

      if (!CDN_UPLOAD_ACTIONS.includes(action)) {
        throw new InternalServerError("Action input is incorrect");
      }

      const fileType =
        req.query.type || attachment.originalname.split(".").pop();
      const originalname = `${attachment.originalname.split(".")[0]}.${fileType}`;

      let buffer: Buffer;

      if (action === "trim-and-upload") {
        const startTime = parseInt(startTimeStr, 10);
        const duration = parseInt(durationStr, 10);

        if (isNaN(startTime) || isNaN(duration)) {
          throw new UnauthorizedError(
            "Invalid query parameters: startTime and duration must be valid numbers.",
          );
        }
        buffer = await this.delivery.extractMediaSegment({
          originalname,
          startTime,
          endTime: duration,
          inputPath: attachment.path,
        });
      } else if (action === "upload") {
        buffer = await fs.readFile(attachment.path);
      } else {
        throw new NotFoundError("Action is incorrect or not supported!");
      }

      const uploadResponse = await this.delivery.persistFile({
        attachment: {
          buffer,
          originalname,
        },
        childrenDirs: this.helpers.getChildrenDirs(req),
      });

      if (!uploadResponse) {
        throw new InternalServerError("File could not be loaded");
      }

      return {
        message: "File uploaded successfully.",
        data: uploadResponse,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: "File upload failed.",
      };
    } finally {
      if (attachment?.path) {
        await fs.unlink(attachment.path).catch(console.error);
      }
    }
  });

  downloadFile = wrapHandler(async (req, res) => {
    const { path: filePath, fileName } = req.params;

    if (!filePath || !fileName) {
      throw new NotFoundError("File path or name missing.");
    }

    const fileData = await this.delivery.retrieveFile(filePath, fileName);

    if (!fileData || !fileData.Body) {
      throw new NotFoundError("File not found or unable to download");
    }

    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader(
      "Content-Type",
      fileData.ContentType || "application/octet-stream",
    );
    if (fileData.Body instanceof require("stream").Readable) {
      (fileData.Body as NodeJS.ReadableStream).pipe(res);
    } else if (Buffer.isBuffer(fileData.Body)) {
      res.send(fileData.Body);
    } else {
      console.error("Unexpected file data body type:", typeof fileData.Body);
      throw new InternalServerError("Unexpected file data format.");
    }
  });
}
