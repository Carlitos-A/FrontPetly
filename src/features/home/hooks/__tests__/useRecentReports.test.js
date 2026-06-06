import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useRecentReports } from '../useRecentReports'

vi.mock('../../../map/services/reportMapService', () => ({ getMapReports: vi.fn() }))
vi.mock('../../../report/utils/reportFormatters', () => ({ normalizeReportPreview: vi.fn((r) => r) }))
vi.mock('../../../map/services/ubicacionService', () => ({ ubicacionCoord2: vi.fn() }))

import { getMapReports } from '../../../map/services/reportMapService'

describe('useRecentReports', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('carga reportes activos y filtra los RESUELTO', async () => {
    getMapReports.mockResolvedValue([
      { id: 1, estadoReporte: 'ACTIVO', latitud: null, longitud: null },
      { id: 2, estadoReporte: 'RESUELTO', latitud: null, longitud: null },
    ])
    const { result } = renderHook(() => useRecentReports())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.reports).toHaveLength(1)
    expect(result.current.reports[0].id).toBe(1)
  })
})
