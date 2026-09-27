import { Incident } from "../models/incident.model";

export const incidents: Incident[] = [
  {
    id: 1,
    title: "Proyector sin señal",
    description: "El proyector no reconoce ningún computador conectado.",
    reporter: "Carlos Díaz",
    location: "Aula 201",
    priority: "MEDIUM",
    status: "OPEN",
    estimatedMinutes: 30,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Pantalla azul (BSOD) en equipo",
    description: "El equipo de contabilidad se reinicia constantemente mostrando un error de memoria.",
    reporter: "María López",
    location: "Oficina 102",
    priority: "HIGH",
    status: "OPEN",
    estimatedMinutes: 60,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "Teclado no responde",
    description: "Varias teclas del teclado no funcionan tras derramar líquido.",
    reporter: "Juan Pérez",
    location: "Recepción",
    priority: "LOW",
    status: "OPEN",
    estimatedMinutes: 15,
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    title: "Fallo masivo de red",
    description: "No hay conexión a Internet ni acceso a los servidores locales en todo el piso.",
    reporter: "Ana Gómez",
    location: "Sistemas",
    priority: "CRITICAL",
    status: "IN_PROGRESS",
    estimatedMinutes: 45,
    createdAt: new Date().toISOString()
  },
  {
    id: 5,
    title: "Impresora láser atascada",
    description: "La impresora principal tiene papel atascado en el fusor y marca error.",
    reporter: "Luis Torres",
    location: "Sala de profesores",
    priority: "MEDIUM",
    status: "RESOLVED",
    estimatedMinutes: 20,
    createdAt: new Date().toISOString()
  }
];