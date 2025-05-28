import type { Request } from "@xjectro/express/types";

export default class Helpers {
  getChildrenDirs(req: Request): string[] {
    const childrenDirs: string[] = [];

    if (req.isLoggedIn() && req.user?.id) {
      childrenDirs.push(String(req.user.id));
    }

    const childrenQuery = req.query.childrens as string | undefined;
    const defaultChildren = "attachments";

    const childrenToAdd = (childrenQuery || defaultChildren)
      .split(",")
      .map((dir) => dir.trim())
      .filter((dir) => dir.length > 0);

    childrenDirs.push(...childrenToAdd);

    return childrenDirs;
  }
}
