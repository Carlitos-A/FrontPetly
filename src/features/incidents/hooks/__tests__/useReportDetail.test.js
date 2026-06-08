import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useReportDetail } from '../useReportDetail'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLocation: vi.fn(() => ({ state: null })),
    useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
  }
})
vi.mock('../../services/fetchPets', () => ({ fetchPetById: vi.fn() }))
vi.mock('../../../map/services/ubicacionService', () => ({ ubicacionCoord: vi.fn() }))
vi.mock('../../services/coincidenciasService', () => ({
  getCoincidenciasDeReporte: vi.fn(),
  actualizarEstadoCoincidencia: vi.fn(),
}))

import { fetchPetById } from '../../services/fetchPets'
import { ubicacionCoord } from '../../../map/services/ubicacionService'
import { getCoincidenciasDeReporte } from '../../services/coincidenciasService'

describe('useReportDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ubicacionCoord.mockResolvedValue(null)
    getCoincidenciasDeReporte.mockResolvedValue({ success: false })
  })

  it('carga el reporte al montar', async () => {
    fetchPetById.mockResolvedValue({ id: '1', nombre: 'Rex', latitud: -33.4, longitud: -70.6 })
    const { result } = renderHook(() => useReportDetail('1'))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.reporte).not.toBeNull()
    expect(result.current.error).toBeNull()
  })

})
