import { useState } from "react";
import { createReport } from "../services/reportApi";

export function useReport() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function submitReport(data, tipoReporte) {
    setLoading(true);
    setError(null);

    try {
      const result = await createReport(data, tipoReporte);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }
  return {
    submitReport,
    loading,
    error,
  };
}
