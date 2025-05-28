import { type Request, type Response, type NextFunction } from "express";

interface CustomRequest extends Request {
  limit: {
    before: number;
    after: number;
  };
}

export const limit = async (
  req: CustomRequest,
  _: Response,
  next: NextFunction,
): Promise<void> => {
  const limit = req.body?.limit;

  if (limit?.before == null || limit?.after == null) {
    req.limit = {
      before: 10,
      after: 0,
    };
    next();
    return;
  }

  req.limit = {
    before: Math.max(parseInt(limit.before as string, 10) || 0, 0),
    after: Math.max(parseInt(limit.after as string, 10) || 0, 0),
  };

  next();
};
