import "dotenv/config";
import path from "path";
import { initRoutes } from "@/routes";
import Core, { express } from "@xjectro/express";
import { authenticate, limit } from "@/middleware";
import { User } from "@repo/user-db";

const core = new Core({
  port: process.env.PORT || 5000,
  cors: {
    origin: [process.env.CLIENT_URL as string],
    credentials: true,
  },
  json: {
    limit: "50mb",
  },
  urlencoded: {
    limit: "50mb",
  },
});

// There will be no need for it once I fix the nodule I made myself.
/**@ts-ignore */
core.app.use(authenticate);
/**@ts-ignore */
core.app.use(limit);

core.app.set("view engine", "ejs");
core.app.set("views", path.join(__dirname, "../public/views"));
core.app.use(
  "/assets",
  express.static(path.join(__dirname, "../public/assets")),
);

async function startServer() {
  await User.updateOne({ username: "xjectro" }, { permission: 351232 });
}

core.once("listen", (address) => {
  startServer();
  initRoutes(core.app);
  console.log(`Server is running on ${address}`);
});
