import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      requestInfo?: {
        timestamp: string;
        method: string;
        path: string;
      };
    }
  }
}

export const requestInfo = (req: Request, res: Response, next: NextFunction): void => {
  req.requestInfo = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path
  };
  next();
};