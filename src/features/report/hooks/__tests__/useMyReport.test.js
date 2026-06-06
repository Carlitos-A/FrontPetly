import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useMyReport } from '../useMyReport'

vi.mock('../../../auth/context/authContext', () => ({ useAuth: vi.fn(() => ({ user: null })) }))
vi.mock('../../services/ReportService', () => ({ getReportService: vi.fn() }))

import { useAuth } from '../../../auth/context/authContext'
import { getReportService } from '../../services/ReportService'

describe('useMyReport', () => {
  beforeEach(() => { vi.clearAllMocks(); localStorage.clear() })

  it('retorna reportes activos (filtra RESUELTO) en respuesta exitosa', async () => {
    useAuth.mockReturnValue({ user: { run: '12345678' } })
    getReportService.mockResolvedValue({
      success: true,
      data: [{ id: 1, estadoReporte: 'PENDIENTE' }, { id: 2, estadoReporte: 'RESUELTO' }],
    })
    const { result } = renderHook(() => useMyReport())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.reports).toHaveLength(1)
    expect(result.current.reports[0].id).toBe(1)
  })

})
