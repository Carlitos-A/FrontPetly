import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ubicacionCoord, ubicacionCoord2 } from '../ubicacionService'

describe('ubicacionService', () => {
  beforeEach(() => { vi.stubGlobal('fetch', vi.fn()) })
  afterEach(() => { vi.unstubAllGlobals() })

  describe('ubicacionCoord', () => {
    it('retorna place_name en respuesta exitosa', async () => {
      globalThis.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ features: [{ place_name: 'Calle 123, Santiago' }] }),
      })
      expect(await ubicacionCoord(-33.45, -70.65)).toBe('Calle 123, Santiago')
    })

    it('retorna "Ubicación no informada" para coordenadas inválidas, respuesta no ok o features vacío', async () => {
      expect(await ubicacionCoord(NaN, -70.65)).toBe('Ubicación no informada')
      globalThis.fetch.mockResolvedValue({ ok: false })
      expect(await ubicacionCoord(-33.45, -70.65)).toBe('Ubicación no informada')
      globalThis.fetch.mockResolvedValue({ ok: true, json: async () => ({ features: [] }) })
      expect(await ubicacionCoord(-33.45, -70.65)).toBe('Ubicación no informada')
    })
  })

  describe('ubicacionCoord2', () => {
    it('retorna dirección formateada en respuesta exitosa', async () => {
      globalThis.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          features: [{ text: 'Av. Providencia 123', context: [{ id: 'locality.1', text: 'Providencia' }] }],
        }),
      })
      expect(await ubicacionCoord2(-33.43, -70.61)).toBe('Av. Providencia, Providencia')
    })

    it('retorna "Ubicación no informada" para coordenadas inválidas o respuesta fallida', async () => {
      expect(await ubicacionCoord2(NaN, -70.65)).toBe('Ubicación no informada')
      globalThis.fetch.mockResolvedValue({ ok: false })
      expect(await ubicacionCoord2(-33.43, -70.61)).toBe('Ubicación no informada')
    })

    it('re-lanza AbortError', async () => {
      const abortError = Object.assign(new Error('Aborted'), { name: 'AbortError' })
      globalThis.fetch.mockRejectedValue(abortError)
      await expect(ubicacionCoord2(-33.43, -70.61)).rejects.toThrow('Aborted')
    })
  })
})
