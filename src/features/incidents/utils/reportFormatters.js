export function formatType(type) {
  const labels = {
    PERDIDA: "Perdida",
    LOST: "Perdida",
    ENCONTRADA: "Encontrada",
    FOUND: "Encontrada",
    AVISTAMIENTO: "Avistamiento",
  };

  return labels[String(type || "").toUpperCase()] || "Reporte";
}

export function formatSpecies(species) {
  const labels = { dog: "Perro", cat: "Gato", other: "Mascota" };
  return labels[species] || species || "Mascota";
}

// Formato relativo: "Ahora", "Hace 3 h", "Hace 2 d" — para vistas compactas
export function formatTimeRelative(value) {
  if (!value) return "Reciente";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Reciente";

  const hours = Math.max(0, Math.floor((Date.now() - date.getTime()) / 3600000));
  if (hours < 1) return "Ahora";
  if (hours < 24) return `Hace ${hours} h`;

  return `Hace ${Math.floor(hours / 24)} d`;
}

// Formato absoluto: "10 may. 2026" — para tarjetas detalladas
export function formatDate(value) {
  if (!value) return "recientemente";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
