import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchPets, fetchPetById } from '../fetchPets'

vi.mock('../data/MockPets', () => ({
  mockPets: [{ id: '1', tipoReporte: 'PERDIDA', latitud: -33, longitud: -70 }],
}))

describe('fetchPets', () => {
  beforeEach(() => { vi.stubGlobal('fetch', vi.fn()) })
  afterEach(() => { vi.unstubAllGlobals() })

  it('retorna reportes normalizados en respuesta exitosa', async () => {
    globalThis.fetch.mockResolvedValue({ ok: true, json: async () => [{ id: 1, nombre: 'Rex' }] })
    const result = await fetchPets()
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(1)
  })

  it('cae a datos mock cuando fetch falla o respuesta no es ok', async () => {
    globalThis.fetch.mockRejectedValue(new Error('Network error'))
    expect(Array.isArray(await fetchPets())).toBe(true)

    globalThis.fetch.mockResolvedValue({ ok: false, status: 503 })
    expect(Array.isArray(await fetchPets())).toBe(true)
  })

  it('usa URL con filtro por tipo cuando se pasa tipoReporte', async () => {
    globalThis.fetch.mockResolvedValue({ ok: true, json: async () => [] })
    await fetchPets({ tipoReporte: 'PERDIDA' })
    expect(globalThis.fetch.mock.calls[0][0]).toContain('PERDIDA')
  })
})

describe('fetchPetById', () => {
  beforeEach(() => { vi.stubGlobal('fetch', vi.fn()) })
  afterEach(() => { vi.unstubAllGlobals() })

  it('retorna reporte normalizado con coordenadas cuando ambas peticiones son exitosas', async () => {
    globalThis.fetch
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: 1, nombre: 'Rex' }) })
      .mockResolvedValueOnce({ ok: true, json: async () => [{ id: 1, latitud: -33.4, longitud: -70.6 }] })
    const result = await fetchPetById('1')
    expect(result).not.toBeNull()
    expect(result.latitud).toBe(-33.4)
  })

  it('retorna null cuando la petición de detalle falla', async () => {
    globalThis.fetch.mockResolvedValueOnce({ ok: false, status: 404 })
    expect(await fetchPetById('999')).toBeNull()
  })
})
