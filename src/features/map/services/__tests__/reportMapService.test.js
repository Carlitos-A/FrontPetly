import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getMapReports } from '../reportMapService'

function jsonRes(data) {
  return {
    ok: true, status: 200,
    headers: { get: (h) => h === 'content-type' ? 'application/json' : null },
    json: async () => data,
    text: async () => JSON.stringify(data),
  }
}

describe('getMapReports', () => {
  beforeEach(() => { vi.stubGlobal('fetch', vi.fn()) })
  afterEach(() => { vi.unstubAllGlobals() })

  it('retorna reportes en respuesta exitosa sin filtros', async () => {
    const data = [{ id: 1 }]
    globalThis.fetch.mockResolvedValue(jsonRes(data))
    const result = await getMapReports()
    expect(result).toEqual(data)
    expect(globalThis.fetch).toHaveBeenCalledWith(expect.stringMatching(/\/petly\/reportes$/))
  })

  it('agrega parámetros de query cuando se proporcionan filtros', async () => {
    globalThis.fetch.mockResolvedValue(jsonRes([]))
    await getMapReports({ lat: -33.45, lng: -70.65, radio: 5 })
    const url = globalThis.fetch.mock.calls[0][0]
    expect(url).toContain('lat=-33.45')
    expect(url).toContain('radio=5')
  })

  it('usa fallback /todos al recibir 403', async () => {
    globalThis.fetch
      .mockResolvedValueOnce({ ok: false, status: 403, text: async () => '' })
      .mockResolvedValueOnce(jsonRes([{ id: 2 }]))
    const result = await getMapReports()
    expect(globalThis.fetch).toHaveBeenCalledTimes(2)
    expect(result).toEqual([{ id: 2 }])
  })
})
