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
  
  function handleSubmit(data) {
    submitReport(data, tipoReporte)
      .then(() => {
        setModalOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return {
    submitReport,
    loading,
    error,
  };
}