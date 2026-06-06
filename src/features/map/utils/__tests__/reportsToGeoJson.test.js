import { describe, it, expect } from 'vitest'
import { reportsToGeoJson } from '../reportsToGeoJson'

describe('reportsToGeoJson', () => {
  it('retorna FeatureCollection vacía sin argumentos o con array vacío', () => {
    expect(reportsToGeoJson()).toEqual({ type: 'FeatureCollection', features: [] })
    expect(reportsToGeoJson([])).toEqual({ type: 'FeatureCollection', features: [] })
  })

  it('filtra reportes sin coordenadas e incluye los válidos', () => {
    expect(reportsToGeoJson([{}]).features).toHaveLength(0)
    expect(reportsToGeoJson([{ latitud: -33.4, longitud: -70.6 }]).features).toHaveLength(1)
  })

  it('coloca [longitud, latitud] en coordinates y acepta aliases', () => {
    const [lon, lat] = reportsToGeoJson([{ latitud: -33.4, longitud: -70.6 }]).features[0].geometry.coordinates
    expect(lon).toBe(-70.6)
    expect(lat).toBe(-33.4)

    const [lon2] = reportsToGeoJson([{ lat: -33.4, lng: -70.6 }]).features[0].geometry.coordinates
    expect(lon2).toBe(-70.6)
  })

  it('estructura correcta de Feature con propiedades mapeadas', () => {
    const base = { latitud: -33.4, longitud: -70.6, id: 1, tipoReporte: 'PERDIDA', imagenUrl: 'https://x.com/img.jpg' }
    const feature = reportsToGeoJson([base]).features[0]
    expect(feature.type).toBe('Feature')
    expect(feature.geometry.type).toBe('Point')
    expect(feature.properties.id).toBe(1)
    expect(feature.properties.tipo_reporte).toBe('PERDIDA')
    expect(feature.properties.imagen_url).toBe('https://x.com/img.jpg')
  })

  it('genera un Feature por cada reporte válido (incluye solo los que tienen coords)', () => {
    const reports = [{ latitud: -33, longitud: -70 }, {}, { latitud: -34, longitud: -71 }]
    expect(reportsToGeoJson(reports).features).toHaveLength(2)
  })
})
