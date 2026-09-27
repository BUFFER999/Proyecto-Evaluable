import { Request, Response } from "express";
import { incidents } from "../data/incidents.data";
import { AppError } from "../errors/app-error";
import { CreateIncidentDto } from "../dtos/incident.dto";
import { Incident } from "../models/incident.model";

export const incidentController = {
  // GET /api/incidents
  getAll(req: Request, res: Response) {
    res.status(200).json({
      ok: true,
      total: incidents.length,
      data: incidents
    });
  },

  // GET /api/incidents/:id
  getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const incident = incidents.find(i => i.id === id);
    
    if (!incident) throw new AppError(404, "Incident not found");
    
    res.status(200).json({ ok: true, data: incident });
  },

  // POST /api/incidents
  create(req: Request, res: Response) {
    const data: CreateIncidentDto = req.body;
    const newId = incidents.length > 0 ? Math.max(...incidents.map(i => i.id)) + 1 : 1;
    
    const newIncident: Incident = {
      id: newId,
      ...data,
      status: "OPEN",
      createdAt: new Date().toISOString()
    };
    
    incidents.push(newIncident);
    res.status(201).json(newIncident);
  },

  // PUT /api/incidents/:id
  update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const index = incidents.findIndex(i => i.id === id);
    
    if (index === -1) throw new AppError(404, "Incident not found");

    const data: Partial<CreateIncidentDto> = req.body;
    
    // Actualizamos manteniendo el ID intacto
    incidents[index] = { ...incidents[index], ...data, id: incidents[index].id };
    res.status(200).json({ ok: true, data: incidents[index] });
  },

  // PATCH /api/incidents/:id/status (Reto 5: Regla de transición)
  updateStatus(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { status } = req.body;
    const incident = incidents.find(i => i.id === id);

    if (!incident) throw new AppError(404, "Incident not found");
    
    const validStatuses = ["OPEN", "IN_PROGRESS", "RESOLVED"];
    if (!validStatuses.includes(status)) {
      throw new AppError(400, "Invalid status");
    }

    // Reglas estrictas de transición del Reto 5
    if (incident.status === "RESOLVED") {
      throw new AppError(400, "No se puede cambiar el estado de un incidente ya RESUELTO");
    }
    if (incident.status === "IN_PROGRESS" && status === "OPEN") {
      throw new AppError(400, "No se puede regresar un incidente EN PROGRESO a ABIERTO");
    }

    incident.status = status;
    res.status(200).json({ ok: true, data: incident });
  },

  // DELETE /api/incidents/:id
  delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const index = incidents.findIndex(i => i.id === id);
    
    if (index === -1) throw new AppError(404, "Incident not found");

    incidents.splice(index, 1);
    res.status(204).send();
  },

  // Reto 1: GET /api/incidents/critical
  getCritical(req: Request, res: Response) {
    const critical = incidents.filter(i => i.priority === "CRITICAL");
    res.status(200).json({ ok: true, total: critical.length, data: critical });
  },

  // Reto 2: GET /api/incidents/pending
  getPending(req: Request, res: Response) {
    const pending = incidents.filter(i => i.status === "OPEN" || i.status === "IN_PROGRESS");
    res.status(200).json({ ok: true, total: pending.length, data: pending });
  },

  // Reto 3: GET /api/incidents/stats
  getStats(req: Request, res: Response) {
    const total = incidents.length;
    const open = incidents.filter(i => i.status === "OPEN").length;
    const inProgress = incidents.filter(i => i.status === "IN_PROGRESS").length;
    const resolved = incidents.filter(i => i.status === "RESOLVED").length;
    const critical = incidents.filter(i => i.priority === "CRITICAL").length;
    
    const totalMins = incidents.reduce((acc, curr) => acc + curr.estimatedMinutes, 0);
    const averageEstimatedMinutes = total === 0 ? 0 : Math.round(totalMins / total);

    res.status(200).json({
      ok: true,
      data: { total, open, inProgress, resolved, critical, averageEstimatedMinutes }
    });
  }
};