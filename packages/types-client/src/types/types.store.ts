import { CurrencySchema } from "@repo/financial-db";
import type { User } from "./types.session";

export interface PageStore {
  ui: {
    theme: string;
  };
  config: {
    currencies: CurrencySchema[];
    lastUpdate: Date;
  };
}

export interface SessionStore {
  user: User | null;
  isLoggedIn: boolean;
}
