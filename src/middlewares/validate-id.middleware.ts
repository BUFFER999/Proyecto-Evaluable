import { Request, Response, NextFunction } from "express";

export const validateId = (req: Request, res: Response, next: NextFunction): void => {
  const id = Number(req.params.id);
  
  if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
    res.status(400).json({
      ok: false,
      message: "Invalid incident id"
    });
    return;
  }
  
  next(); // Si todo está bien, lo deja pasar al siguiente nivel
};