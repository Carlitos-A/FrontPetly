import { useCallback, useEffect, useState } from "react";
import { getContadorNoLeidas } from "../services/notificacionService";

export function useNotificacionesCount() {
    const [count, setCount] = useState(0);

    const fetchCount = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        const result = await getContadorNoLeidas();
        if (result.success) {
            setCount(result.data?.noLeidas ?? 0);
        }
    }, []);

    useEffect(() => {
        fetchCount();
    }, [fetchCount]);

    return { count, refetch: fetchCount };
}
