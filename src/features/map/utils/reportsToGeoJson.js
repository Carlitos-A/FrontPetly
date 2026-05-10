export function reportsToGeoJson(reports = []) {
  return {
    type: "FeatureCollection",
    features: reports
      .map((report) => {
        const latitud = report.latitud ?? report.lat ?? report.latitude;
        const longitud = report.longitud ?? report.lng ?? report.lon ?? report.longitude;

        return {
          ...report,
          latitud,
          longitud,
        };
      })
      .filter((report) => report.latitud != null && report.longitud != null)
      .map((report) => ({
        type: "Feature",
        properties: {
          id: report.id || report.idreporte,
          tipo_reporte: report.tipoReporte || report.tipo_reporte,
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
          latitud: report.latitud,
          longitud: report.longitud,
          sector: report.sector,
          comuna: report.comuna,
          ubicacion: report.ubicacion || report.direccion || report.resolvedPlace,
        },
        geometry: {
          type: "Point",
          coordinates: [Number(report.longitud), Number(report.latitud)],
        },
      })),
  };
}
