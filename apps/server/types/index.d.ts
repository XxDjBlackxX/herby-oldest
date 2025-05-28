import type { UserSchema } from "@repo/user-db";

declare global {
  namespace Express {
    interface Request {
      user: UserSchema;
      limit: {
        before: number;
        after: number;
      };
      isLoggedIn(): boolean;
      loggedIn: boolean;
      session: {
        kickState: string;
        kickCodeVerifier: string;
      };
    }
  }
}

/**
 *     user: UserSchema;
    limit: {
      before: number;
      after: number;
    };
    isLoggedIn(): boolean;
    loggedIn: boolean;
    session: {
      kickState: string;
      kickCodeVerifier: string;
    };
 */
