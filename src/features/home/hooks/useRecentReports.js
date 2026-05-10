import { useEffect, useState } from "react";

import { getMapReports } from "../../map/services/reportMapService";
import { normalizeReportPreview } from "../../report/utils/reportFormatters";
import { ubicacionCoord2 } from "../../map/services/ubicacionService";

export function useRecentReports(limit = 8) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadReports() {
      setLoading(true);
      setError("");

      try {
        const data = await getMapReports({});
        const reportsFromBackend = Array.isArray(data) ? data : [];
        const visibleReports = reportsFromBackend.slice(0, limit);

        const reportsWithPlaces = await Promise.all(
          visibleReports.map(async (report) => {
            if (hasTextLocation(report) || !hasCoordinates(report)) {
              return report;
            }

            const resolvedPlace = await ubicacionCoord2(
              report.latitud,
              report.longitud,
              controller.signal
            );

            return {
              ...report,
              resolvedPlace,
            };
          })
        );

        setReports(reportsWithPlaces.map(normalizeReportPreview));
      } catch (err) {
        if (err.name !== "AbortError") {
          setReports([]);
          setError("No se pudieron cargar los reportes del servidor.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadReports();

    return () => controller.abort();
  }, [limit]);

  return {
    reports,
    loading,
    error,
  };
}

function hasTextLocation(report) {
  return report.sector || report.comuna || report.ubicacion || report.resolvedPlace;
}

function hasCoordinates(report) {
  const latitude = Number(report.latitud);
  const longitude = Number(report.longitud);

  return Number.isFinite(latitude) && Number.isFinite(longitude);
}
