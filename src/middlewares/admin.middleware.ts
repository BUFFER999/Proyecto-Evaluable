import { Request, Response, NextFunction } from "express";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.includes("technician-token") && req.method === "DELETE") {
    res.status(403).json({
      ok: false,
      message: "Forbidden"
    });
    return;
  }

  next();
};
