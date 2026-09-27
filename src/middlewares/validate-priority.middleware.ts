import { Request, Response, NextFunction } from "express";

export const validatePriority = (req: Request, res: Response, next: NextFunction): void => {
  const { priority } = req.body;
  const validPriorities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

  if (priority && !validPriorities.includes(priority)) {
    res.status(400).json({
      ok: false,
      message: "Prioridad inválida. Solo se permite LOW, MEDIUM, HIGH o CRITICAL"
    });
    return;
  }

  next();
};