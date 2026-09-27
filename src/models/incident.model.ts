export interface Incident {
  id: number;
  title: string;
  description: string;
  reporter: string;
  location: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  estimatedMinutes: number;
  createdAt: string;
}