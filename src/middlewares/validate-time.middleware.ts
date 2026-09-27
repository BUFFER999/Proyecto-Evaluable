import { Request, Response, NextFunction } from "express";

export const validateTime = (req: Request, res: Response, next: NextFunction): void => {
  const { estimatedMinutes } = req.body;

  if (estimatedMinutes !== undefined) {
    if (typeof estimatedMinutes !== "number" || estimatedMinutes <= 0 || estimatedMinutes > 480) {
      res.status(400).json({
        ok: false,
        message: "Tiempo estimado inválido. Debe ser un número mayor a 0 y máximo de 480 minutos"
      });
      return;
    }
  }

  next();
};