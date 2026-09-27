import express from "express";
import incidentRoutes from "./routes/incident.routes";
import { logger } from "./middlewares/logger.middleware";
import { requestInfo } from "./middlewares/request-info.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";

const app = express();

// 1. Middlewares Globales
app.use(express.json());
app.use(logger);
app.use(requestInfo);

// 2. Rutas Principales
app.use("/api/incidents", incidentRoutes);

// 3. Middleware 404 (Si la ruta no existe)
app.use(notFoundMiddleware);

// 4. Middleware Manejador de Errores (Siempre va al final)
app.use(errorMiddleware);

export default app;
