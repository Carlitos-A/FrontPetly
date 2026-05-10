import { useMemo } from "react";
import { usePets } from "./usePets";
import { formatDate, formatType } from "../utils/reportFormatters";

export function useReportes({ activeFilter, search }) {
  const filters = useMemo(
    () => ({
      tipo_reporte: activeFilter === "TODOS" ? null : activeFilter,
      search,
    }),
    [activeFilter, search]
  );

  const { pets, loading } = usePets(filters);

  const reports = useMemo(
    () =>
      pets.map((pet) => ({
        id: pet.id,
        titulo: pet.name,
        tipoReporte: pet.tipoReporte,
        tipoLabel: formatType(pet.tipoReporte),
        especie: pet.species || "Sin dato",
        raza: pet.breed || "Sin dato",
        color: pet.color || "Sin dato",
        tamanio: pet.size || "Sin dato",
        sexo: pet.sex || "Sin dato",
        edad: pet.approximateAge || "Sin dato",
        descripcion: pet.description || "Sin descripción",
        imagen: pet.photo || "",
        fecha: formatDate(pet.fechaReporte),
        latitud: pet.latitud,
        longitud: pet.longitud,
      })),
    [pets]
  );

  return { reports, loading };
}

