const REPORTES_BASE_URL =
  import.meta.env.VITE_REPORTES_BASE_URL || "http://localhost:8080/petly/reportes";

function getToken() {
  return sessionStorage.getItem("token");
}

export async function getReportService(runCandidates) {
  const token = getToken();
  const runs = Array.isArray(runCandidates)
    ? runCandidates
    : [runCandidates].filter(Boolean);

  if (!token) {
    return {
      success: false,
      error: "Debes iniciar sesion para ver tus reportes.",
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
        `${REPORTES_BASE_URL}/filtrar/${encodeURIComponent(run)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const reports = normalizeReportsResponse(await response.json());

        if (reports.length > 0) {
          return {
            success: true,
            data: reports,
          };
        }

        continue;
      }

      if (response.status === 400 || response.status === 404) {
        continue;
      }

      return {
        success: false,
        error: "No se pudieron cargar tus reportes.",
      };
    }

    return {
      success: true,
      data: [],
    };
  } catch {
    return {
      success: false,
      error: "No se pudieron cargar tus reportes.",
    };
  }
}

function normalizeReportsResponse(data) {
  if (Array.isArray(data)) return data;

  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.reportes)) return data.reportes;
  if (Array.isArray(data?.reports)) return data.reports;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.items)) return data.items;

  if (data?.data && typeof data.data === "object") return [data.data];
  if (data?.reporte && typeof data.reporte === "object") return [data.reporte];
  if (data && typeof data === "object" && !isBackendError(data)) return [data];

  return [];
}

function isBackendError(data) {
  return Boolean(data.status && data.error && data.path);
}
