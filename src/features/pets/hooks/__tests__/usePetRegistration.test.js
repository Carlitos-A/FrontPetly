import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePetRegistration } from '../usePetRegistration'

vi.mock('../../services/registerService', () => ({ registerService: vi.fn() }))

import { registerService } from '../../services/registerService'

beforeAll(() => { URL.createObjectURL = vi.fn(() => 'blob:mock') })

describe('usePetRegistration', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('tiene estado inicial correcto y handleChange/handleSelect actualizan el formulario', () => {
    const { result } = renderHook(() => usePetRegistration())
    expect(result.current.step).toBe(1)
    expect(result.current.loading).toBe(false)
    act(() => { result.current.handleChange({ target: { name: 'name', value: 'Rex' } }) })
    expect(result.current.formData.name).toBe('Rex')
    act(() => { result.current.handleSelect('gender', 'M') })
    expect(result.current.formData.gender).toBe('M')
  })

  it('next/back navegan pasos y handlePhoto guarda archivo', () => {
    const { result } = renderHook(() => usePetRegistration())
    act(() => { result.current.next() })
    expect(result.current.step).toBe(2)
    act(() => { result.current.back() })
    expect(result.current.step).toBe(1)
    const file = new File(['data'], 'foto.jpg', { type: 'image/jpeg' })
    act(() => { result.current.handlePhoto(file) })
    expect(result.current.preview).toBe('blob:mock')
  })

  it('handleSubmit avanza al paso 3 en éxito', async () => {
    registerService.mockResolvedValue({ success: true, data: { id: 1 } })
    const { result } = renderHook(() => usePetRegistration())
    await act(async () => { await result.current.handleSubmit({ preventDefault: vi.fn() }) })
    expect(result.current.step).toBe(3)
  })
})
