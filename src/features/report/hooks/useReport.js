import { createIncident } from "../services/reportApi";

export function useReport() {
  async function submitReport(data) {
    console.log("Enviando reporte...", data);

    await createIncident(data);
  }

  return { submitReport };
}