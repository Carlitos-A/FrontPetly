import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useNotificaciones } from '../useNotificaciones'

vi.mock('../../services/notificacionService', () => ({
  getMisNotificaciones: vi.fn(),
  marcarComoLeida: vi.fn(),
  marcarTodasComoLeidas: vi.fn(),
  eliminarNotificacion: vi.fn(),
}))
vi.mock('../useNotificacionesCount', () => ({ NOTIFICACIONES_UPDATED_EVENT: 'notificaciones-updated' }))

import { getMisNotificaciones, marcarComoLeida, eliminarNotificacion } from '../../services/notificacionService'

const mockData = [
  { id: 1, mensaje: 'Coincidencia', leida: false },
  { id: 2, mensaje: 'Vista', leida: true },
]

describe('useNotificaciones', () => {
  beforeEach(() => { vi.clearAllMocks(); localStorage.clear() })

  it('no carga cuando no hay token', async () => {
    const { result } = renderHook(() => useNotificaciones())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(getMisNotificaciones).not.toHaveBeenCalled()
  })

  it('carga notificaciones cuando hay token', async () => {
    localStorage.setItem('token', 'tok')
    getMisNotificaciones.mockResolvedValue({ success: true, data: mockData })
    const { result } = renderHook(() => useNotificaciones())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.notificaciones).toHaveLength(2)
  })
})
