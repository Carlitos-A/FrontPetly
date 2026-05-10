const MASCOTAS_BASE_URL =
    import.meta.env.VITE_MASCOTAS_BASE_URL || "http://localhost:8080/petly/mascotas";

export async function getMisMascotas(runCandidates) {
    const token = sessionStorage.getItem("token");
    const runs = Array.isArray(runCandidates)
        ? runCandidates
        : [runCandidates].filter(Boolean);

    if (!token) {
        return {
            success: false,
            error: "Debes iniciar sesion para ver tus mascotas.",
        };
    }

    if (runs.length === 0) {
        return {
            success: false,
            error: "No se encontro el RUN del usuario activo.",
        };
    }

    try {
        for (const run of runs) {
            const response = await fetch(
                `${MASCOTAS_BASE_URL}/filtrar/${encodeURIComponent(run)}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                const pets = normalizePetsResponse(await response.json());

                if (pets.length > 0) {
                    return {
                        success: true,
                        data: pets,
                    };
                }

                continue;
            }

            if (response.status === 400 || response.status === 404) {
                continue;
            }

            return {
                success: false,
                error: "No se pudieron cargar tus mascotas.",
            };
        }

        return {
            success: true,
            data: [],
        };
    } catch {
        return {
            success: false,
            error: "No se pudieron cargar tus mascotas.",
        };
    }
}

function normalizePetsResponse(data) {
    if (Array.isArray(data)) return data;

    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.mascotas)) return data.mascotas;
    if (Array.isArray(data?.pets)) return data.pets;
    if (Array.isArray(data?.content)) return data.content;
    if (Array.isArray(data?.items)) return data.items;

    if (data?.data && typeof data.data === "object") return [data.data];
    if (data?.mascota && typeof data.mascota === "object") return [data.mascota];
    if (data && typeof data === "object" && !isBackendError(data)) return [data];

    return [];
}

function isBackendError(data) {
    return Boolean(data.status && data.error && data.path);
}
