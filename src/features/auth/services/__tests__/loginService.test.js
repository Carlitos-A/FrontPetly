import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { loginUser } from '../loginService'

describe('loginUser', () => {
  beforeEach(() => { vi.stubGlobal('fetch', vi.fn()) })
  afterEach(() => { vi.unstubAllGlobals() })

  it('retorna { success: true, data } en respuesta exitosa', async () => {
    const mockData = { token: 'abc123', usuario: { nombre: 'Carlos' } }
    globalThis.fetch.mockResolvedValue({ ok: true, json: async () => mockData })

    const result = await loginUser({ correo: 'a@a.com', contrasena: '12345678' })
    expect(result).toEqual({ success: true, data: mockData })
  })

  it('retorna { success: false } en error de respuesta o red', async () => {
    globalThis.fetch.mockResolvedValue({ ok: false, text: async () => 'Credenciales inválidas' })
    const r1 = await loginUser({})
    expect(r1.success).toBe(false)

    globalThis.fetch.mockRejectedValue(new Error('Failed to fetch'))
    const r2 = await loginUser({})
    expect(r2.success).toBe(false)
  })

  it('envía POST JSON a /auth/login', async () => {
    globalThis.fetch.mockResolvedValue({ ok: true, json: async () => ({}) })
    await loginUser({ correo: 'a@a.com', contrasena: '12345678' })
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/auth/login'),
      expect.objectContaining({ method: 'POST', headers: { 'Content-Type': 'application/json' } })
    )
  })
})
