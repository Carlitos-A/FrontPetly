import { describe, it, expect } from 'vitest'
import { normalizeReport } from '../normalizeReport'

describe('normalizeReport', () => {

  //1
  it('retorna null si el input es null o undefined', () => {
    expect(normalizeReport(null)).toBeNull()
    expect(normalizeReport(undefined)).toBeNull()
  })

  //2
  it('mapea correctamente un reporte con claves camelCase del backend', () => {
    const raw = {
      id: 1,
      nombre: 'Fido',
      especie: 'Perro',
      raza: 'Labrador',
      colorPrincipal: 'Amarillo',
      tamanio: 'Grande',
      sexo: 'Macho',
      edadAproximada: '2 años',
      tipoReporte: 'Perdido',
      estadoMascota: 'Activo',
      descripcion: 'Tiene collar azul',
      imagenUrl: 'https://example.com/foto.jpg',
      latitud: 4.711,
      longitud: -74.072,
      fechaReporte: '2024-01-01',
    }

    const result = normalizeReport(raw)

    expect(result.id).toBe(1)
    expect(result.name).toBe('Fido')
    expect(result.species).toBe('Perro')
    expect(result.breed).toBe('Labrador')
    expect(result.color).toBe('Amarillo')
    expect(result.tipoReporte).toBe('Perdido')
    expect(result.status).toBe('Activo')
    expect(result.photo).toBe('https://example.com/foto.jpg')
    expect(result.latitud).toBe(4.711)
  })

  //3
  it('usa "Sin nombre" como fallback y no rompe con campos inesperados', () => {
    expect(normalizeReport({ id: 5 }).name).toBe('Sin nombre')
    expect(() => normalizeReport({ campoRaro: true })).not.toThrow()
  })
})
