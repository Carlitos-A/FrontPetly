import { useCallback, useEffect, useState } from "react";
import {
    eliminarNotificacion,
    getMisNotificaciones,
    marcarComoLeida,
    marcarTodasComoLeidas,
} from "../services/notificacionService";

export function useNotificaciones() {
    const [notificaciones, setNotificaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState("todas");

    const cargar = useCallback(async () => {
        setLoading(true);
        setError(null);
        const result = await getMisNotificaciones();
        if (result.success) {
setNotificaciones(Array.isArray(result.data) ? result.data : []);
        } else {
            setError(result.error);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        cargar();
    }, [cargar]);

    async function leerUna(id) {
        const result = await marcarComoLeida(id);
        if (result.success) {
            setNotificaciones((prev) =>
                prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
            );
        }
    }

    async function leerTodas() {
        const result = await marcarTodasComoLeidas();
        if (result.success) {
            setNotificaciones((prev) => prev.map((n) => ({ ...n, leida: true })));
        }
    }

    async function eliminar(id) {
        const result = await eliminarNotificacion(id);
        if (result.success) {
            setNotificaciones((prev) => prev.filter((n) => n.id !== id));
        }
    }

    const noLeidasCount = notificaciones.filter((n) => !n.leida).length;

    const notificacionesFiltradas =
        filtro === "no-leidas"
            ? notificaciones.filter((n) => !n.leida)
            : notificaciones;

    return {
        notificaciones: notificacionesFiltradas,
        loading,
        error,
        noLeidasCount,
        filtro,
        setFiltro,
        leerUna,
        leerTodas,
        eliminar,
        recargar: cargar,
    };
}
