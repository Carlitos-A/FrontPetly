import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { usePets } from '../usePets'

vi.mock('../useDebounce', () => ({ useDebounce: vi.fn((v) => v) }))
vi.mock('../../services/fetchPets', () => ({ fetchPets: vi.fn() }))

import { fetchPets } from '../../services/fetchPets'

describe('usePets', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('carga y almacena las mascotas al montar', async () => {
    const pets = [{ id: 1 }, { id: 2 }]
    fetchPets.mockResolvedValue(pets)
    const { result } = renderHook(() => usePets({}))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.pets).toEqual(pets)
  })

  it('pasa los filtros a fetchPets', async () => {
    fetchPets.mockResolvedValue([])
    renderHook(() => usePets({ tipo_reporte: 'PERDIDA', search: 'rex' }))
    await waitFor(() => expect(fetchPets).toHaveBeenCalledWith({ tipo_reporte: 'PERDIDA', search: 'rex' }))
  })
})
