import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getMisMascotas } from '../misMascotasService'

describe('getMisMascotas', () => {
  beforeEach(() => { vi.stubGlobal('fetch', vi.fn()); localStorage.clear() })
  afterEach(() => { vi.unstubAllGlobals() })

  it('retorna error si no hay token o runs está vacío', async () => {
    expect((await getMisMascotas('run')).success).toBe(false)
    localStorage.setItem('token', 'tok')
    expect((await getMisMascotas([])).success).toBe(false)
  })

  it('retorna mascotas en respuesta exitosa (array directo)', async () => {
    localStorage.setItem('token', 'tok')
    const pets = [{ id: 1, nombre: 'Firulais' }]
    globalThis.fetch.mockResolvedValue({ ok: true, status: 200, json: async () => pets })
    const result = await getMisMascotas('12345678-9')
    expect(result.success).toBe(true)
    expect(result.data).toEqual(pets)
  })

  it('normaliza respuesta envuelta en { data: [...] } y omite 400/404', async () => {
    localStorage.setItem('token', 'tok')
    globalThis.fetch.mockResolvedValue({ ok: true, status: 200, json: async () => ({ data: [{ id: 2 }] }) })
    expect((await getMisMascotas('run')).data).toEqual([{ id: 2 }])

    globalThis.fetch.mockResolvedValue({ ok: false, status: 400 })
    expect(await getMisMascotas('run')).toEqual({ success: true, data: [] })
  })
})
