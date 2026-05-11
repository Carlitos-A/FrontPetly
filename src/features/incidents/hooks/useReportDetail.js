import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { fetchPetById } from "../services/fetchPets";
import { ubicacionCoord } from "../../map/services/ubicacionService";
import { getCoincidenciasDeReporte, actualizarEstadoCoincidencia } from "../services/coincidenciasService";

export function useReportDetail(id) {
    const { state: navState } = useLocation();
    const [searchParams] = useSearchParams();
    const [reporte, setReporte] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ubicacion, setUbicacion] = useState(null);
    const [accionLoading, setAccionLoading] = useState(false);
    const [accionResultado, setAccionResultado] = useState(null);
    const [coincidencia, setCoincidencia] = useState(null);

    const tipo = searchParams.get("tipo");
    const idReporteMio = searchParams.get("idReporteMio");
    const esCoincidencia = tipo === "COINCIDENCIA_POTENCIAL" && !!idReporteMio;

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setError(null);
        setReporte(null);
        setUbicacion(null);
        setAccionResultado(null);
        setCoincidencia(null);

        fetchPetById(id)
            .then(data => {
                if (!data) throw new Error("Reporte no encontrado");
                setReporte(data);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        if (!esCoincidencia) return;

        getCoincidenciasDeReporte(idReporteMio).then(result => {
            if (!result.success || !Array.isArray(result.data)) return;
            const match = result.data.find(c =>
                String(c.reporte_perdido_id) === String(id) ||
                String(c.reporte_encontrado_id) === String(id)
            );
            if (match) {
                setCoincidencia(match);
                if (match.estado === "CONFIRMADA") {
                    setAccionResultado({ tipo: "exito", texto: "Coincidencia confirmada. Ambos reportes han sido marcados como resueltos." });
                } else if (match.estado === "DESCARTADA") {
                    setAccionResultado({ tipo: "info", texto: "Coincidencia rechazada. Seguiremos buscando coincidencias." });
                }
            }
        });
    }, [id, idReporteMio, esCoincidencia]);

    useEffect(() => {
        const lat = reporte?.latitud ?? navState?.latitud;
        const lng = reporte?.longitud ?? navState?.longitud;
        if (!lat || !lng) return;
        const controller = new AbortController();

        ubicacionCoord(lat, lng, controller.signal)
            .then(place => {
                if (place && place !== "Ubicación no informada") setUbicacion(place);
            })
            .catch(() => {});

        return () => controller.abort();
    }, [reporte?.id, reporte?.latitud, reporte?.longitud, navState?.latitud, navState?.longitud]);

    async function confirmar() {
        if (!coincidencia?.id) {
            setAccionResultado({ tipo: "error", texto: "No se encontró la coincidencia para confirmar." });
            return;
        }
        setAccionLoading(true);
        try {
            const result = await actualizarEstadoCoincidencia(coincidencia.id, "CONFIRMADA");
            if (!result.success) throw new Error(result.error);
            setReporte(r => r ? { ...r, estadoReporte: "RESUELTO" } : r);
            setCoincidencia(c => c ? { ...c, estado: "CONFIRMADA" } : c);
            setAccionResultado({ tipo: "exito", texto: "Coincidencia confirmada. Ambos reportes han sido marcados como resueltos." });
        } catch {
            setAccionResultado({ tipo: "error", texto: "Error al confirmar. Intenta de nuevo." });
        } finally {
            setAccionLoading(false);
        }
    }

    async function rechazar() {
        if (!coincidencia?.id) {
            setAccionResultado({ tipo: "error", texto: "No se encontró la coincidencia para rechazar." });
            return;
        }
        setAccionLoading(true);
        try {
            const result = await actualizarEstadoCoincidencia(coincidencia.id, "DESCARTADA");
            if (!result.success) throw new Error(result.error);
            setCoincidencia(c => c ? { ...c, estado: "DESCARTADA" } : c);
            setAccionResultado({ tipo: "info", texto: "Coincidencia rechazada. Seguiremos buscando coincidencias." });
        } catch {
            setAccionResultado({ tipo: "error", texto: "Error al rechazar. Intenta de nuevo." });
        } finally {
            setAccionLoading(false);
        }
    }

    return { reporte, loading, error, ubicacion, accionLoading, accionResultado, confirmar, rechazar, coincidencia };
}
