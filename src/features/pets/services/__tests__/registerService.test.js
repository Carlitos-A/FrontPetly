import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { registerService } from '../registerService'

const petData = { chip: '123456', name: 'Firulais', gender: 'M', type: 'perro', color: 'negro', breed: 'labrador' }

describe('registerService', () => {
  beforeEach(() => { vi.stubGlobal('fetch', vi.fn()); localStorage.clear() })
  afterEach(() => { vi.unstubAllGlobals() })

  it('retorna { success: true, data } en respuesta exitosa', async () => {
    localStorage.setItem('token', 'tok')
    globalThis.fetch.mockResolvedValue({ ok: true, json: async () => ({ id: 1 }) })
    expect(await registerService(petData)).toEqual({ success: true, data: { id: 1 } })
  })

  it('retorna { success: false } en error de respuesta o red', async () => {
    localStorage.setItem('token', 'tok')
    globalThis.fetch.mockResolvedValue({ ok: false, text: async () => 'Error' })
    expect((await registerService(petData)).success).toBe(false)
  })

  it('envía POST con FormData y Authorization a /petly/mascotas/registrar', async () => {
    localStorage.setItem('token', 'tok')
    globalThis.fetch.mockResolvedValue({ ok: true, json: async () => ({}) })
    await registerService(petData)
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/petly/mascotas/registrar'),
      expect.objectContaining({ method: 'POST', body: expect.any(FormData) })
    )
  })
})
