export function reportsToGeoJson(reports = []) {
  return {
    type: "FeatureCollection",
    features: reports
      .filter((report) => report.latitud != null && report.longitud != null)
      .map((report) => ({
        type: "Feature",
        properties: {
          id: report.id || report.idreporte,
          tipo_reporte: report.tipoReporte || report.tipo_reporte,
          estado_mascota: report.estadoMascota || report.estado_mascota,
          especie: report.especie,
          raza: report.raza,
          color_principal: report.colorPrincipal || report.color_principal,
          tamanio: report.tamanio,
          sexo: report.sexo,
          edad_aproximada: report.edadAproximada || report.edad_aproximada,
          fecha_reporte: report.fechaReporte || report.fecha_reporte,
          descripcion: report.descripcion,
          contacto: report.contacto,
          imagen_url: report.imagenUrl || report.imagen_url,
          estado_reporte: report.estadoReporte || report.estado_reporte,
        },
        geometry: {
          type: "Point",
          coordinates: [report.longitud, report.latitud],
        },
      })),
  };
}
