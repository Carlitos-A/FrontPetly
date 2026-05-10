import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../auth/context/authContext";
import { getMisMascotas } from "../services/misMascotasService";

export function useMisMascotas() {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const runCandidates = useMemo(() => getRunCandidates(user), [user]);

  useEffect(() => {
    let ignore = false;

    async function fetchPets() {
      setLoading(true);
      setError("");

      const result = await getMisMascotas(runCandidates);

      if (ignore) return;

      if (result.success) {
        setPets(Array.isArray(result.data) ? result.data : []);
      } else {
        setPets([]);
        setError(result.error);
      }

      setLoading(false);
    }

    fetchPets();

    return () => {
      ignore = true;
    };
  }, [runCandidates]);

  return {
    pets,
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
    source.rut,
    source.RUN,
    source.Run,
    source.runUsuario,
    source.usuarioRun,
    source.run_usuario,
    source.rutUsuario,
    source.usuario?.run,
    source.usuario?.rut,
    source.usuario?.RUN,
    source.usuario?.runUsuario,
    source.usuario?.run_usuario,
    source.user?.run,
    source.user?.rut,
    source.persona?.run,
    source.persona?.rut,
  ]);

  return run ? [String(run).trim()] : [];
}

function firstValue(values) {
  return values.find((value) => value !== undefined && value !== null && value !== "");
}

function getStoredUser() {
  try {
    return JSON.parse(sessionStorage.getItem("usuario") || "null");
  } catch {
    return null;
  }
}

function getTokenPayload() {
  const payload = sessionStorage.getItem("token")?.split(".")?.[1];
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
