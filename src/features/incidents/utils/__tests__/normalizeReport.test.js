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
  it('mapea correctamente un reporte con claves snake_case del backend', () => {
    const raw = {
      idreporte: 42,
      tipo_reporte: 'Encontrado',
      color_principal: 'Negro',
      edad_aproximada: '1 año',
      estado_mascota: 'Resuelto',
      imagen_url: 'https://example.com/img.jpg',
      lat: 6.244,
      lng: -75.581,
    }

    const result = normalizeReport(raw)

    expect(result.id).toBe(42)
    expect(result.tipoReporte).toBe('Encontrado')
    expect(result.color).toBe('Negro')
    expect(result.approximateAge).toBe('1 año')
    expect(result.status).toBe('Resuelto')
    expect(result.latitud).toBe(6.244)
    expect(result.longitud).toBe(-75.581)
  })

  //4
  it('usa "Sin nombre" como fallback cuando no hay nombre', () => {
    const result = normalizeReport({ id: 5 })
    expect(result.name).toBe('Sin nombre')
  })
  
  //5
  it('no rompe con campos inesperados', () => {
    expect(() => normalizeReport({ campoRaro: true })).not.toThrow()
  })
})
