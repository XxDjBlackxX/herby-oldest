import { User, UserPayment } from "@repo/user-db";
import { NotFoundError } from "@xjectro/express/exceptions";
import { wrapHandler } from "@xjectro/express/handlers";
import {
  combinePermissions,
  getPermissions,
  PERMISSIONS,
} from "@repo/permission-utils";

export default class AdminManageUsersController {
  permission = wrapHandler(async (req) => {
    const user = await User.findOne({ id: req.params.id });
    if (!user) {
      throw new NotFoundError("User is not found");
    }

    const perm = PERMISSIONS[req.params.perm as "admin"];
    if (!perm) {
      throw new NotFoundError("Permission not found");
    }

    const currentPermissions = getPermissions(user.permission).map(
      (v) => PERMISSIONS[v],
    );

    let hasPermission = currentPermissions.includes(perm);
    if (hasPermission) {
      user.permission = combinePermissions(
        ...currentPermissions.filter((v) => v !== perm),
      );
    } else {
      user.permission = combinePermissions(...currentPermissions, perm);
    }

    await user.save();

    hasPermission = !hasPermission;

    return {
      message: "User's authorization was updated successfully",
      data: hasPermission,
    };
  });

  comission = wrapHandler(async (req) => {
    const user = await User.findOne({ id: req.params.id });
    if (!user) {
      throw new NotFoundError("User is not found");
    }

    const currency = req.params.currency;
    const method = req.params.method;
    const commission = req.body.commission;

    await UserPayment.updateOne(
      { user: user._id },
      { $set: { [`commission.${currency}.${method}`]: commission } },
    );

    return { message: "New commission added successfully" };
  });
}
