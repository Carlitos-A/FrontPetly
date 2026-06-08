import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useMisMascotas } from '../useMisMascotas'

vi.mock('../../../auth/context/authContext', () => ({ useAuth: vi.fn(() => ({ user: null })) }))
vi.mock('../../services/misMascotasService', () => ({ getMisMascotas: vi.fn() }))

import { useAuth } from '../../../auth/context/authContext'
import { getMisMascotas } from '../../services/misMascotasService'

describe('useMisMascotas', () => {
  beforeEach(() => { vi.clearAllMocks(); localStorage.clear() })

  it('retorna mascotas cuando el servicio responde con éxito', async () => {
    useAuth.mockReturnValue({ user: { run: '12345678' } })
    getMisMascotas.mockResolvedValue({ success: true, data: [{ id: 1 }] })
    const { result } = renderHook(() => useMisMascotas())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.pets).toEqual([{ id: 1 }])
  })

})
