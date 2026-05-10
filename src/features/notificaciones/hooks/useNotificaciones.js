import { useCallback, useEffect, useState } from "react";
import {
    eliminarNotificacion,
    getMisNotificaciones,
    marcarComoLeida,
    marcarTodasComoLeidas,
} from "../services/notificacionService";
import { NOTIFICACIONES_UPDATED_EVENT } from "./useNotificacionesCount";

function notificarCambioContador() {
    window.dispatchEvent(new Event(NOTIFICACIONES_UPDATED_EVENT));
}

function normalizeNotificaciones(data) {
    if (Array.isArray(data)) return data;

    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.notificaciones)) return data.notificaciones;
    if (Array.isArray(data?.content)) return data.content;
    if (Array.isArray(data?.items)) return data.items;

    return [];
}

export function useNotificaciones() {
    const [notificaciones, setNotificaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState("todas");

    const cargar = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setNotificaciones([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        const result = await getMisNotificaciones();
        if (result.success) {
            setNotificaciones(normalizeNotificaciones(result.data));
        } else {
            setError(result.error);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        const timeoutId = window.setTimeout(cargar, 0);
        return () => window.clearTimeout(timeoutId);
    }, [cargar]);

    async function leerUna(id) {
        const result = await marcarComoLeida(id);
        if (result.success) {
            setNotificaciones((prev) =>
                prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
            );
            notificarCambioContador();
        }
    }

    async function leerTodas() {
        const result = await marcarTodasComoLeidas();
        if (result.success) {
            setNotificaciones((prev) => prev.map((n) => ({ ...n, leida: true })));
            notificarCambioContador();
            return;
        }

        const noLeidas = notificaciones.filter((n) => !n.leida);
        const resultados = await Promise.all(
            noLeidas.map((n) => marcarComoLeida(n.id))
        );
        const idsLeidas = noLeidas
            .filter((_, index) => resultados[index].success)
            .map((n) => n.id);

        if (idsLeidas.length > 0) {
            setNotificaciones((prev) =>
                prev.map((n) => (idsLeidas.includes(n.id) ? { ...n, leida: true } : n))
            );
            notificarCambioContador();
        } else {
            setError(result.error || "No se pudieron marcar las notificaciones como leidas.");
        }
    }

    async function eliminar(id) {
        const result = await eliminarNotificacion(id);
        if (result.success) {
            setNotificaciones((prev) => prev.filter((n) => n.id !== id));
            notificarCambioContador();
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
