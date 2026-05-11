export function normalizeReportPreview(report) {
  const type = report.tipoReporte || report.tipo_reporte || "REPORTE";
  const normalizedType = String(type).toUpperCase();

  return {
    id: report.id || report.idreporte || report.name,
    title:
      report.estadoReporte ||
      report.estado_reporte ||
      report.name ||
      report.nombre ||
      "Mascota reportada",
    type: normalizedType,
    typeLabel: formatType(normalizedType),
    speciesLabel: formatSpecies(report.species || report.especie),
    breed: report.breed || report.raza || "",
    color: report.color || report.colorPrincipal || report.color_principal || "Sin color",
    sector:
      report.sector ||
      report.comuna ||
      report.ubicacion ||
      report.resolvedPlace ||
      "Sector no informado",
    photo: report.photo || report.imagenUrl || report.imagen_url || "",
    timeLabel: formatTime(report.fechaReporte || report.fecha_reporte || report.reportedAt),
  };
}

function formatType(type) {
  const labels = {
    PERDIDA: "Perdida",
    LOST: "Perdida",
    ENCONTRADA: "Encontrada",
    FOUND: "Encontrada",
    AVISTAMIENTO: "Avistamiento",
  };

  return labels[type] || "Reporte";
}

function formatSpecies(species) {
  const labels = {
    dog: "Perro",
    cat: "Gato",
    other: "Mascota",
  };

  return labels[species] || species || "Mascota";
}

function formatTime(value) {
  if (!value) return "Reciente";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Reciente";

  const hours = Math.max(0, Math.floor((Date.now() - date.getTime()) / 3600000));

  if (hours < 1) return "Ahora";
  if (hours < 24) return `Hace ${hours} h`;

  const days = Math.floor(hours / 24);
  return `Hace ${days} d`;
}
