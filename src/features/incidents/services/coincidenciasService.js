const COINCIDENCIAS_BASE_URL =
    import.meta.env.VITE_COINCIDENCIAS_BASE_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8080";

function bearerHeader() {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return { Authorization: `Bearer ${token}` };
}

async function parseResponse(res) {
    if (res.status === 204) return null;
    const text = await res.text();
    if (!text) return null;
    try { return JSON.parse(text); } catch { return text; }
}

export async function getCoincidenciasDeReporte(reporteId) {
    try {
        const headers = bearerHeader();
        if (!headers) return { success: false, error: "Debes iniciar sesión." };

        const res = await fetch(`${COINCIDENCIAS_BASE_URL}/petly/coincidencias/reporte/${reporteId}`, { headers });
        if (!res.ok) throw new Error(await res.text());
        return { success: true, data: await parseResponse(res) };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function actualizarEstadoCoincidencia(coincidenciaId, estado) {
    try {
        const headers = bearerHeader();
        if (!headers) return { success: false, error: "Debes iniciar sesión." };

        const res = await fetch(
            `${COINCIDENCIAS_BASE_URL}/petly/coincidencias/${coincidenciaId}/estado/${estado}`,
            { method: "PATCH", headers }
        );
        if (!res.ok) throw new Error(await res.text());
        return { success: true, data: await parseResponse(res) };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
