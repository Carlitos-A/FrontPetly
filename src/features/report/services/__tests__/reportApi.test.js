import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createReport } from '../reportApi'

const baseData = { lat: -33.44, lng: -70.66, descripcion: 'Perro negro', especie: 'dog' }

describe('createReport', () => {
  beforeEach(() => { vi.stubGlobal('fetch', vi.fn()); localStorage.clear() })
  afterEach(() => { vi.unstubAllGlobals() })

  it('retorna el JSON del servidor en respuesta exitosa', async () => {
    globalThis.fetch.mockResolvedValue({ ok: true, json: async () => ({ id: 42 }) })
    expect(await createReport(baseData, 'PERDIDA')).toEqual({ id: 42 })
  })

  it('incluye Authorization cuando hay token, omite cuando no hay', async () => {
    localStorage.setItem('token', 'mi-token')
    globalThis.fetch.mockResolvedValue({ ok: true, json: async () => ({}) })
    await createReport(baseData, 'PERDIDA')
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ headers: { Authorization: 'Bearer mi-token' } })
    )

    localStorage.clear()
    globalThis.fetch.mockResolvedValue({ ok: true, json: async () => ({}) })
    await createReport(baseData, 'PERDIDA')
    expect(globalThis.fetch).toHaveBeenLastCalledWith(
      expect.any(String),
      expect.objectContaining({ headers: {} })
    )
  })

  it('lanza error con timeout y con respuesta no ok', async () => {
    const abortError = Object.assign(new Error('aborted'), { name: 'AbortError' })
    globalThis.fetch.mockRejectedValue(abortError)
    await expect(createReport(baseData, 'PERDIDA')).rejects.toThrow('El servidor tardó demasiado')

    globalThis.fetch.mockResolvedValue({ ok: false, text: async () => 'Error del servidor' })
    await expect(createReport(baseData, 'PERDIDA')).rejects.toThrow('Error del servidor')
  })
})
