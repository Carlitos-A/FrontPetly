import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getCoincidenciasDeReporte, actualizarEstadoCoincidencia } from '../coincidenciasService'

describe('coincidenciasService', () => {
  beforeEach(() => { vi.stubGlobal('fetch', vi.fn()); localStorage.clear() })
  afterEach(() => { vi.unstubAllGlobals() })

  it('retorna error de autenticación si no hay token', async () => {
    expect((await getCoincidenciasDeReporte(1)).success).toBe(false)
    expect(globalThis.fetch).not.toHaveBeenCalled()
  })

  it('getCoincidenciasDeReporte retorna datos en respuesta exitosa', async () => {
    localStorage.setItem('token', 'tok')
    const data = [{ id: 1, score: 0.95 }]
    globalThis.fetch.mockResolvedValue({ ok: true, status: 200, text: async () => JSON.stringify(data) })
    const result = await getCoincidenciasDeReporte(42)
    expect(result.success).toBe(true)
    expect(result.data).toEqual(data)
  })

  it('actualizarEstadoCoincidencia envía PATCH con estado correcto', async () => {
    localStorage.setItem('token', 'tok')
    globalThis.fetch.mockResolvedValue({ ok: true, status: 200, text: async () => '{}' })
    await actualizarEstadoCoincidencia(12, 'ACEPTADA')
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/coincidencias/12/estado/ACEPTADA'),
      expect.objectContaining({ method: 'PATCH' })
    )
  })
})
