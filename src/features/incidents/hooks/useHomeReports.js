import { useEffect, useMemo, useState } from "react";
import { ubicacionCoord2 } from "../../map/services/ubicacionService";
import { fetchPets } from "../services/fetchPets";
import { formatSpecies, formatTimeRelative, formatType } from "../utils/reportFormatters";

export function useHomeReports() {
  const [rawReports, setRawReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const pets = await fetchPets();
        const enriched = await enrichWithPlaces(pets.slice(0, 8), controller.signal);

        if (!controller.signal.aborted) setRawReports(enriched);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("No se pudieron cargar los reportes.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  const reports = useMemo(() => rawReports.map(toReportViewModel), [rawReports]);

  return { reports, loading, error };
}

async function enrichWithPlaces(pets, signal) {
  return Promise.all(
    pets.map(async (pet) => {
      if (pet.sector || pet.comuna || pet.ubicacion) return pet;
      if (!pet.latitud || !pet.longitud) return pet;

      try {
        const place = await ubicacionCoord2(pet.latitud, pet.longitud, signal);
        return { ...pet, resolvedPlace: place !== "Ubicación no informada" ? place : null };
      } catch (err) {
        if (err.name === "AbortError") throw err;
        return pet;
      }
    })
  );
}

function toReportViewModel(pet) {
  const type = String(pet.tipoReporte || "").toUpperCase();

  return {
    id: pet.id,
    type,
    typeLabel: formatType(type),
    speciesLabel: formatSpecies(pet.species),
    breed: pet.breed || "",
    color: pet.color || "Sin color",
    sector: pet.resolvedPlace || pet.sector || pet.comuna || pet.ubicacion || "Sector no informado",
    photo: pet.photo || "",
    timeLabel: formatTimeRelative(pet.fechaReporte),
  };
}
