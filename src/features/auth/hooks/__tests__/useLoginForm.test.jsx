import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLoginForm } from '../useLoginForm'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: vi.fn(() => vi.fn()) }
})
vi.mock('../../context/authContext', () => ({ useAuth: vi.fn(() => ({ login: vi.fn() })) }))
vi.mock('../../services/loginService', () => ({ loginUser: vi.fn() }))

import { loginUser } from '../../services/loginService'

describe('useLoginForm', () => {
  beforeEach(() => { vi.clearAllMocks(); localStorage.clear() })

  it('tiene estado inicial correcto', () => {
    const { result } = renderHook(() => useLoginForm())
    expect(result.current.formData).toEqual({ correo: '', contrasena: '' })
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('handleChange actualiza el formulario y togglePassword alterna showPassword', () => {
    const { result } = renderHook(() => useLoginForm())
    act(() => { result.current.handleChange({ target: { name: 'correo', value: 'a@a.com' } }) })
    expect(result.current.formData.correo).toBe('a@a.com')
    act(() => { result.current.togglePassword() })
    expect(result.current.showPassword).toBe(true)
  })

})
