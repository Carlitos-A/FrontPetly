import { useEffect, useState } from "react";

import { fetchPetById } from "../services/fetchPets";

export function useReportDetail(id) {
  const [reporte, setReporte] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function cargarReporte() {
      setLoading(true);
      setError("");

      try {
        const data = await fetchPetById(id);

        if (ignore) return;

        if (!data) {
          throw new Error("Reporte no encontrado");
        }

        setReporte(data);
      } catch (err) {
        if (!ignore) {
          setReporte(null);
          setError(err.message || "No se pudo cargar el reporte.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    cargarReporte();

    return () => {
      ignore = true;
    };
  }, [id]);

  return {
    reporte,
    loading,
    error,
  };
}
