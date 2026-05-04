export function reportsToGeoJson(reports = []) {
  return {
    type: "FeatureCollection",
    features: reports
      .filter((report) => report.latitud != null && report.longitud != null)
      .map((report) => ({
        type: "Feature",
        properties: {
          id: report.id,
          tipo_reporte: report.tipo_reporte,
          estado_mascota: report.estado_mascota,
          especie: report.especie,
          raza: report.raza,
          color_principal: report.color_principal,
          tamanio: report.tamanio,
          sexo: report.sexo,
          edad_aproximada: report.edad_aproximada,
          fecha_reporte: report.fecha_reporte,
          descripcion: report.descripcion,
          contacto: report.contacto,
          imagen_url: report.imagen_url,
          estado_reporte: report.estado_reporte,
        },
        geometry: {
          type: "Point",
          coordinates: [report.longitud, report.latitud],
        },
      })),
  };
}
