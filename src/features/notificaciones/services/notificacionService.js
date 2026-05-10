const API_URL = "http://localhost:8086";

function bearerHeader() {
    const token = sessionStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
}

export async function getMisNotificaciones() {
    try {
        const res = await fetch(`${API_URL}/petly/notificaciones`, {
            headers: bearerHeader(),
        });
        if (!res.ok) throw new Error(await res.text());
        return { success: true, data: await res.json() };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function getContadorNoLeidas() {
    try {
        const res = await fetch(`${API_URL}/petly/notificaciones/contador`, {
            headers: bearerHeader(),
        });
        if (!res.ok) throw new Error(await res.text());
        return { success: true, data: await res.json() };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function marcarComoLeida(id) {
    try {
        const res = await fetch(`${API_URL}/petly/notificaciones/${id}/leer`, {
            method: "PATCH",
        });
        if (!res.ok) throw new Error(await res.text());
        return { success: true, data: await res.json() };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function marcarTodasComoLeidas() {
    try {
        const res = await fetch(`${API_URL}/petly/notificaciones/leer-todas`, {
            method: "PATCH",
            headers: bearerHeader(),
        });
        if (!res.ok) throw new Error(await res.text());
        return { success: true, data: await res.json() };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function eliminarNotificacion(id) {
    try {
        const res = await fetch(`${API_URL}/petly/notificaciones/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) throw new Error(await res.text());
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
