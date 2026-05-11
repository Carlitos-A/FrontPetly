import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../auth/context/authContext";
import { getContadorNoLeidas } from "../services/notificacionService";

export const NOTIFICACIONES_UPDATED_EVENT = "petly:notificaciones-updated";

function normalizeCount(data) {
    if (typeof data === "number") return data;
    if (!data || typeof data !== "object") return 0;

    return Number(
        data.noLeidas ??
        data.no_leidas ??
        data.count ??
        data.contador ??
        data.total ??
        0
    );
}

export function useNotificacionesCount() {
    const { user } = useAuth();
    const [count, setCount] = useState(0);

    const fetchCount = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setCount(0);
            return;
        }

        const result = await getContadorNoLeidas();
        if (result.success) {
            setCount(normalizeCount(result.data));
        }
    }, []);

    useEffect(() => {
        const timeoutId = window.setTimeout(fetchCount, 0);
        return () => window.clearTimeout(timeoutId);
    }, [fetchCount, user]);

    useEffect(() => {
        window.addEventListener(NOTIFICACIONES_UPDATED_EVENT, fetchCount);
        return () => window.removeEventListener(NOTIFICACIONES_UPDATED_EVENT, fetchCount);
    }, [fetchCount]);

    return { count, refetch: fetchCount };
}
