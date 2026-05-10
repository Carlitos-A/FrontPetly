const REPORTS_API_URL =
  import.meta.env.VITE_REPORTS_MAP_URL || "http://localhost:8080/petly/reportes";

export async function getReports(signal) {
  const response = await fetch(REPORTS_API_URL, { signal });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();

  return Array.isArray(data) ? data : [];
}
