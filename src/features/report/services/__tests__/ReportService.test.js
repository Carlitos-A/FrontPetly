import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getReportService } from '../ReportService'

describe('getReportService', () => {
  beforeEach(() => { vi.stubGlobal('fetch', vi.fn()); localStorage.clear() })
  afterEach(() => { vi.unstubAllGlobals() })

  it('retorna error sin token o con runs vacíos', async () => {
    expect((await getReportService(['run'])).success).toBe(false)
    localStorage.setItem('token', 'tok')
    expect((await getReportService([])).success).toBe(false)
  })

  it('retorna reportes en respuesta exitosa', async () => {
    localStorage.setItem('token', 'tok')
    const reports = [{ id: 1 }, { id: 2 }]
    globalThis.fetch.mockResolvedValue({ ok: true, json: async () => reports })
    const result = await getReportService(['12345678'])
    expect(result.success).toBe(true)
    expect(result.data).toEqual(reports)
  })

  it('continúa al siguiente run si la respuesta es 404 y normaliza { reportes: [...] }', async () => {
    localStorage.setItem('token', 'tok')
    const reports = [{ id: 1 }]
    globalThis.fetch
      .mockResolvedValueOnce({ ok: false, status: 404 })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ reportes: reports }) })
    const result = await getReportService(['run-invalido', '12345678'])
    expect(result.success).toBe(true)
    expect(result.data).toEqual(reports)
  })
})
