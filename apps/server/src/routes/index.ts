import CdnRoutes from "./cdn.routes";
import AuthRoutes from "./auth.routes";
import UsersRoutes from "./users.routes";
import SoundbitesRoutes from "./soundbites.routes";
import PaymentsRoutes from "./payments.routes";
import DiscoverRoutes from "./discover.routes";
import SearchRoutes from "./search.routes";
import WebhookRoutes from "./webhook.routes";
import BroadcastRoutes from "./broadcast.routes";
import AdminRoutes from "./admin.routes";
import ApplicationsRoutes from "./applications.routes";
import ConfigRoutes from "./config.routes";
import type { Application } from "@xjectro/express/types";
import { RoutesHandler } from "@xjectro/express/handlers";

export function initRoutes(app: Application) {
  new RoutesHandler({
    app,
    routes: [
      { prefix: "/v1/users", handlerClass: UsersRoutes },
      { prefix: "/v1/soundbites", handlerClass: SoundbitesRoutes },
      { prefix: "/v1/cdn", handlerClass: CdnRoutes },
      { prefix: "/v1/payments", handlerClass: PaymentsRoutes },
      { prefix: "/v1/discover", handlerClass: DiscoverRoutes },
      { prefix: "/v1/search", handlerClass: SearchRoutes },
      { prefix: "/v1/webhook", handlerClass: WebhookRoutes },
      { prefix: "/v1/broadcast", handlerClass: BroadcastRoutes },
      { prefix: "/v1/admin", handlerClass: AdminRoutes },
      { prefix: "/v1/applications", handlerClass: ApplicationsRoutes },
      { prefix: "/v1/config", handlerClass: ConfigRoutes },
      { prefix: "/v1/auth", handlerClass: AuthRoutes },
    ],
  });
}
