export function normalizeReport(report) {
  if (!report) return null;

  return {
    id: report.id || report.idreporte,
    name: report.nombre || report.tipoReporte || report.tipo_reporte || "Sin nombre",
    species: report.especie || report.species,
    breed: report.raza || report.breed,
    color: report.colorPrincipal || report.color_principal || report.color,
    size: report.tamanio || report.size,
    sex: report.sexo || report.sex,
    approximateAge:
      report.edadAproximada ||
      report.edad_aproximada ||
      report.approximateAge,
    tipoReporte: report.tipoReporte || report.tipo_reporte,
    status: report.estadoMascota || report.estado_mascota || report.status,
    description: report.descripcion || report.description,
    contacto: report.contacto,
    photo: report.photo || report.imagenUrl || report.imagen_url,
    imagen_url: report.imagenUrl || report.imagen_url,
    latitud: report.latitud || report.lat || report.latitude,
    longitud: report.longitud || report.lng || report.lon || report.longitude,
    sector: report.sector,
    comuna: report.comuna,
    ubicacion: report.ubicacion || report.direccion || report.resolvedPlace,
    fechaReporte: report.fechaReporte || report.fecha_reporte,
    estadoReporte: report.estadoReporte || report.estado_reporte,
  };
}
