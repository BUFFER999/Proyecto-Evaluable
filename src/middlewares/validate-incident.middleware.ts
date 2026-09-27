import { Request, Response, NextFunction } from "express";

export const validateIncident = (req: Request, res: Response, next: NextFunction): void => {
  const { title, description, reporter, location, priority, estimatedMinutes } = req.body;

  if (!title || !description || !reporter || !location || !priority || estimatedMinutes === undefined) {
    res.status(400).json({
      ok: false,
      message: "Faltan campos obligatorios en el incidente"
    });
    return;
  }

  next();
};