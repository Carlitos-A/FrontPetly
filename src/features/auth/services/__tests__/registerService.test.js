import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { registerUser } from '../registerService'

describe('registerUser', () => {
  beforeEach(() => { vi.stubGlobal('fetch', vi.fn()) })
  afterEach(() => { vi.unstubAllGlobals() })

  it('retorna { success: true, data } en respuesta exitosa', async () => {
    const mockData = { id: 1, nombre: 'Carlos' }
    globalThis.fetch.mockResolvedValue({ ok: true, json: async () => mockData })
    expect(await registerUser({ nombre: 'Carlos' })).toEqual({ success: true, data: mockData })
  })

  it('retorna { success: false } en error de respuesta o red', async () => {
    globalThis.fetch.mockResolvedValue({ ok: false, text: async () => 'Error' })
    expect((await registerUser({})).success).toBe(false)

    globalThis.fetch.mockRejectedValue(new Error('Failed to fetch'))
    expect((await registerUser({})).success).toBe(false)
  })

  it('envía POST JSON a /usuarios/registrar', async () => {
    globalThis.fetch.mockResolvedValue({ ok: true, json: async () => ({}) })
    await registerUser({ nombre: 'Carlos' })
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/usuarios/registrar'),
      expect.objectContaining({ method: 'POST', headers: { 'Content-Type': 'application/json' } })
    )
  })
})
