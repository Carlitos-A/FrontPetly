import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../auth/context/authContext";
import { getReportService } from "../services/ReportService";

export function useMyReport() {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const runCandidates = useMemo(() => getRunCandidates(user), [user]);

  useEffect(() => {
    let ignore = false;

    async function fetchReports() {
      setLoading(true);
      setError("");

      const result = await getReportService(runCandidates);

      if (ignore) return;

      if (result.success) {
        setReports(Array.isArray(result.data) ? result.data : []);
      } else {
        setReports([]);
        setError(result.error);
      }

      setLoading(false);
    }

    fetchReports();

    return () => {
      ignore = true;
    };
  }, [runCandidates]);

  return {
    reports,
    loading,
    error,
  };
}

function getRunCandidates(user) {
  const storedUser = getStoredUser();
  const tokenPayload = getTokenPayload();

  return unique([
    ...getRunsFromObject(user),
    ...getRunsFromObject(storedUser),
    ...getRunsFromObject(tokenPayload),
  ]);
}

function getRunsFromObject(source) {
  if (!source) return [];

  const run = firstValue([
    source.run,
    source.RUN,
    source.Run,
    source.runUsuario,
    source.usuarioRun,
    source.run_usuario,
    source.rutUsuario,
    source.usuario?.run,
    source.usuario?.RUN,
    source.usuario?.runUsuario,
    source.usuario?.run_usuario,
    source.user?.run,
  ]);

  if (!run) return [];

  return [String(run).trim()];
}

function firstValue(values) {
  return values.find((value) => value !== undefined && value !== null && value !== "");
}

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("usuario") || "null");
  } catch {
    return null;
  }
}

function getTokenPayload() {
  const payload = localStorage.getItem("token")?.split(".")?.[1];
  if (!payload) return null;

  try {
    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(normalizedPayload));
  } catch {
    return null;
  }
}

function unique(values) {
  return [...new Set(values.map((value) => String(value).trim()).filter(Boolean))];
}
