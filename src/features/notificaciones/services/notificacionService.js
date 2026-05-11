const API_URLS = [
    import.meta.env.VITE_NOTIFICACIONES_BASE_URL,
    import.meta.env.VITE_API_BASE_URL,
    "http://localhost:8086",
    "http://localhost:8080",
].filter((url, index, urls) => url && urls.indexOf(url) === index);

function bearerHeader() {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return { Authorization: `Bearer ${token}` };
}

async function parseResponse(res) {
    if (res.status === 204) return null;

    const text = await res.text();
    if (!text) return null;

    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
}

function authError() {
    return { success: false, error: "Debes iniciar sesion para ver tus notificaciones." };
}

async function requestNotificaciones(path, options = {}) {
    let lastError = null;

    for (const baseUrl of API_URLS) {
        try {
            const res = await fetch(`${baseUrl}${path}`, options);

            if (res.ok || (res.status !== 404 && res.status !== 0)) {
                return res;
            }

            lastError = new Error(await res.text());
        } catch (error) {
            lastError = error;
        }
    }

    throw lastError ?? new Error("No se pudo conectar con el servicio de notificaciones.");
}

export async function getMisNotificaciones() {
    try {
        const headers = bearerHeader();
        if (!headers) return authError();

        const res = await requestNotificaciones("/petly/notificaciones", {
            headers,
        });
        if (!res.ok) throw new Error(await res.text());
        return { success: true, data: await parseResponse(res) };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function getContadorNoLeidas() {
    try {
        const headers = bearerHeader();
        if (!headers) return authError();

        const res = await requestNotificaciones("/petly/notificaciones/contador", {
            headers,
        });
        if (!res.ok) throw new Error(await res.text());
        return { success: true, data: await parseResponse(res) };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function marcarComoLeida(id) {
    try {
        const headers = bearerHeader();
        if (!headers) return authError();

        const res = await requestNotificaciones(`/petly/notificaciones/${id}/leer`, {
            method: "PATCH",
            headers,
        });
        if (!res.ok) throw new Error(await res.text());
        return { success: true, data: await parseResponse(res) };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function marcarTodasComoLeidas() {
    try {
        const headers = bearerHeader();
        if (!headers) return authError();

        const res = await requestNotificaciones("/petly/notificaciones/leer-todas", {
            method: "PATCH",
            headers,
        });
        if (!res.ok) throw new Error(await res.text());
        return { success: true, data: await parseResponse(res) };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function eliminarNotificacion(id) {
    try {
        const headers = bearerHeader();
        if (!headers) return authError();

        const res = await requestNotificaciones(`/petly/notificaciones/${id}`, {
            method: "DELETE",
            headers,
        });
        if (!res.ok) throw new Error(await res.text());
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
