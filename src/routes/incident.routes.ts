import { Router } from "express";
import { incidentController } from "../controllers/incident.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { validateId } from "../middlewares/validate-id.middleware";
import { validateIncident } from "../middlewares/validate-incident.middleware";
import { validatePriority } from "../middlewares/validate-priority.middleware";
import { validateTime } from "../middlewares/validate-time.middleware";

const router = Router();

// Rutas de los Retos Adicionales
router.get("/critical", incidentController.getCritical);
router.get("/pending", incidentController.getPending);
router.get("/stats", incidentController.getStats);

// Rutas Públicas (Sin Token)
router.get("/", incidentController.getAll);
router.get("/:id", validateId, incidentController.getById);

// Rutas Protegidas (Requieren Token)
router.post("/", authMiddleware, validateIncident, validatePriority, validateTime, incidentController.create);
router.put("/:id", authMiddleware, validateId, validateIncident, validatePriority, validateTime, incidentController.update);
router.patch("/:id/status", authMiddleware, validateId, incidentController.updateStatus);

// Ruta Restringida (Solo Admin / instructor-token)
router.delete("/:id", authMiddleware, adminMiddleware, validateId, incidentController.delete);

export default router;