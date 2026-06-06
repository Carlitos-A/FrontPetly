import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useRegisterForm } from '../useRegisterForm'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: vi.fn(() => vi.fn()) }
})
vi.mock('../../services/registerService', () => ({ registerUser: vi.fn() }))

import { registerUser } from '../../services/registerService'

describe('useRegisterForm', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('handleChange actualiza el formulario y togglePassword alterna showPassword', () => {
    const { result } = renderHook(() => useRegisterForm())
    act(() => { result.current.handleChange({ target: { name: 'nombre', value: 'Carlos' } }) })
    expect(result.current.formData.nombre).toBe('Carlos')
    act(() => { result.current.togglePassword() })
    expect(result.current.showPassword).toBe(true)
  })

  it('handleSubmit setea error cuando falta el nombre', async () => {
    const { result } = renderHook(() => useRegisterForm())
    await act(async () => { await result.current.handleSubmit({ preventDefault: vi.fn() }) })
    expect(result.current.error).toBe('El nombre es requerido')
  })

})
