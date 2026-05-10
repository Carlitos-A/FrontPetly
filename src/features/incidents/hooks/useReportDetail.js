import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchPetById } from "../services/fetchPets";
import { ubicacionCoord } from "../../map/services/ubicacionService";

export function useReportDetail(id) {
    const { state: navState } = useLocation();
    const [reporte, setReporte] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ubicacion, setUbicacion] = useState(null);
    const [accionLoading, setAccionLoading] = useState(false);
    const [accionResultado, setAccionResultado] = useState(null);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setError(null);
        setReporte(null);
        setUbicacion(null);
        setAccionResultado(null);

        fetchPetById(id)
            .then(data => {
                if (!data) throw new Error("Reporte no encontrado");
                setReporte(data);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

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
        setAccionLoading(true);
        try {
            // TODO: await confirmarCoincidencia(id)
            setAccionResultado({ tipo: "exito", texto: "Coincidencia confirmada correctamente." });
        } catch {
            setAccionResultado({ tipo: "error", texto: "Error al confirmar. Intenta de nuevo." });
        } finally {
            setAccionLoading(false);
        }
    }

    async function rechazar() {
        setAccionLoading(true);
        try {
            // TODO: await rechazarCoincidencia(id)
            setAccionResultado({ tipo: "info", texto: "Coincidencia rechazada." });
        } catch {
            setAccionResultado({ tipo: "error", texto: "Error al rechazar. Intenta de nuevo." });
        } finally {
            setAccionLoading(false);
        }
    }

    return { reporte, loading, error, ubicacion, accionLoading, accionResultado, confirmar, rechazar };
}
