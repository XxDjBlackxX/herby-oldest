import {
  UnauthorizedError,
  ForbiddenAccessError,
} from "@xjectro/express/exceptions";
import { wrapHandler } from "@xjectro/express/handlers";
import { hasPermission } from "@repo/permission-utils";
import { verifyToken } from "@xjectro/express-jwt";
import { User } from "@repo/user-db";
import { Request, Response, NextFunction } from "@xjectro/express/types";
import { exceptionResponse } from "@xjectro/express/response";

export const authenticate = wrapHandler(async (req, _, next) => {
  req.isLoggedIn = () => req.loggedIn;
  const access_token = req.headers["authorization"]?.split("Bearer ")[1];
  if (access_token) {
    const decoded: any = verifyToken(access_token, {
      secret: process.env.SESSION_SECRET!,
    });
    if (!decoded) {
      throw new UnauthorizedError("Access token is incorrect");
    }
    const user = await User.findById(decoded.user);
    if (!user) {
      throw new UnauthorizedError("User not found");
    }
    req.user = user;
    req.loggedIn = true;
    next ? next() : void 0;
  } else {
    req.loggedIn = false;
    next ? next() : void 0;
  }
});

export const verifyPermission = (
  permissionConfig?:
    | {
        perms: number[];
        dynamicPermissions?: {
          key: string;
          value: string;
          permission: number;
        }[];
      }
    | number
    | number[],
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let permissions: number[] = [];

      if (Array.isArray(permissionConfig)) {
        permissions = permissionConfig;
      } else if (typeof permissionConfig === "number") {
        permissions = [permissionConfig];
      } else if (permissionConfig && "perms" in permissionConfig) {
        permissions = permissionConfig.perms;
      }

      if (req.isLoggedIn() && hasPermission(req.user.permission, permissions)) {
        if (
          typeof permissionConfig === "object" &&
          "dynamicPermissions" in permissionConfig
        ) {
          const { dynamicPermissions } = permissionConfig;

          if (dynamicPermissions && dynamicPermissions.length > 0) {
            for (const condition of dynamicPermissions) {
              const paramValue = req.params[condition.key];

              if (
                paramValue !== condition.value &&
                !hasPermission(req.user.permission, condition.permission)
              ) {
                throw new ForbiddenAccessError(
                  `You do not have the required permission for parameter: ${condition.key}`,
                );
              }
            }
          }
        }

        next();
      } else {
        throw new ForbiddenAccessError(
          "You are not allowed to access this resource!",
        );
      }
    } catch (err) {
      exceptionResponse(res, err);
    }
  };
};
