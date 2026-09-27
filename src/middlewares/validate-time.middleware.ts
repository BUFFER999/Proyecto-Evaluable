import { Request, Response, NextFunction } from "express";

export const validateTime = (req: Request, res: Response, next: NextFunction): void => {
  const { estimatedMinutes, priority } = req.body;

  if (estimatedMinutes !== undefined) {
    if (typeof estimatedMinutes !== "number" || estimatedMinutes <= 0 || estimatedMinutes > 480) {
      res.status(400).json({
        ok: false,
        message: "Tiempo estimado inválido. Debe ser un número mayor a 0 y máximo de 480 minutos"
      });
      return;
    }

    // Solución al Reto 4: Incidentes críticos máximo 60 min
    if (priority === "CRITICAL" && estimatedMinutes > 60) {
      res.status(400).json({
        ok: false,
        message: "Un incidente CRITICAL no puede tener un tiempo estimado mayor a 60 minutos"
      });
      return;
    }
  }

  next();
};