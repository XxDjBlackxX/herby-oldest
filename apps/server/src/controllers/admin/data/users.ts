import { User } from "@repo/user-db";
import { wrapHandler } from "@xjectro/express/handlers";
import { NotFoundError } from "@xjectro/express/exceptions";

export default class AdminDataUsersController {
  index = wrapHandler(async (req) => {
    const user = await User.findOne({ id: req.params.id })
      .select("-history -content")
      .populate(["identity", "profile", "payment"]);
    if (!user) {
      throw new NotFoundError("User is not found");
    }

    const { identity, profile, ...userData } = user.toObject({
      virtuals: true,
    });

    return {
      success: true,
      message: "User successfully pulled",
      data: {
        ...userData,
        email: identity.email,
        name: profile.name,
        surname: profile.surname,
        description: profile.description,
      },
    };
  });
}
