import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  getMisNotificaciones,
  getContadorNoLeidas,
  marcarComoLeida,
  marcarTodasComoLeidas,
  eliminarNotificacion,
} from '../notificacionService'

describe('notificacionService', () => {
  beforeEach(() => { vi.stubGlobal('fetch', vi.fn()); localStorage.clear() })
  afterEach(() => { vi.unstubAllGlobals() })

  const jsonRes = (data, status = 200) => ({
    ok: status >= 200 && status < 300, status,
    text: async () => JSON.stringify(data),
  })

  it('retorna error de autenticación si no hay token (getMisNotificaciones)', async () => {
    expect((await getMisNotificaciones()).success).toBe(false)
    expect(globalThis.fetch).not.toHaveBeenCalled()
  })

  it('getMisNotificaciones retorna datos con token válido', async () => {
    localStorage.setItem('token', 'tok')
    globalThis.fetch.mockResolvedValue(jsonRes([{ id: 1 }]))
    const result = await getMisNotificaciones()
    expect(result.success).toBe(true)
    expect(Array.isArray(result.data)).toBe(true)
  })

  it('getContadorNoLeidas llama al endpoint /contador', async () => {
    localStorage.setItem('token', 'tok')
    globalThis.fetch.mockResolvedValue(jsonRes({ count: 3 }))
    await getContadorNoLeidas()
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/petly/notificaciones/contador'),
      expect.any(Object)
    )
  })

  it('marcarComoLeida envía PATCH con el id correcto', async () => {
    localStorage.setItem('token', 'tok')
    globalThis.fetch.mockResolvedValue(jsonRes({}))
    await marcarComoLeida(99)
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/notificaciones/99/leer'),
      expect.objectContaining({ method: 'PATCH' })
    )
  })

  it('marcarTodasComoLeidas y eliminarNotificacion envían el método correcto', async () => {
    localStorage.setItem('token', 'tok')
    globalThis.fetch.mockResolvedValue(jsonRes({}))
    await marcarTodasComoLeidas()
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/leer-todas'),
      expect.objectContaining({ method: 'PATCH' })
    )

    globalThis.fetch.mockResolvedValue({ ok: true, status: 204, text: async () => '' })
    await eliminarNotificacion(7)
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/notificaciones/7'),
      expect.objectContaining({ method: 'DELETE' })
    )
  })
})
