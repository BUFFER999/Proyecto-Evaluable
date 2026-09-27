export interface CreateIncidentDto {
  title: string;
  description: string;
  reporter: string;
  location: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  estimatedMinutes: number;
}