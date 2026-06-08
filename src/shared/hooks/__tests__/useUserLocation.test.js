import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useUserLocation } from '../useUserLocation'

const COORDS = { latitude: 4.711, longitude: -74.0721 }

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('useUserLocation', () => {

  //1
  it('devuelve location con latitud/longitud al obtener permiso', async () => {
    Object.defineProperty(navigator, 'geolocation', {
      value: {
        getCurrentPosition: vi.fn((onSuccess) => onSuccess({ coords: COORDS })),
      },
      configurable: true,
    })

    const { result } = renderHook(() => useUserLocation())
    await act(async () => { })

    expect(result.current.location).toEqual({
      latitud: COORDS.latitude,
      longitud: COORDS.longitude,
    })
    expect(result.current.error).toBeNull()
  })

  //2
  it('devuelve error cuando el usuario rechaza el permiso', async () => {
    const geoError = { message: 'Usuario denegó el permiso' }
    Object.defineProperty(navigator, 'geolocation', {
      value: {
        getCurrentPosition: vi.fn((_, onError) => onError(geoError)),
      },
      configurable: true,
    })

    const { result } = renderHook(() => useUserLocation())
    await act(async () => { })

    expect(result.current.location).toBeNull()
    expect(result.current.error).toBe('Usuario denegó el permiso')
  })

  //3
  it('reporta error cuando geolocalización no está disponible', () => {

    vi.stubGlobal('navigator', {})

    const { result } = renderHook(() => useUserLocation())

    expect(result.current.location).toBeNull()
    expect(result.current.error).toBe('Geolocalizacion no disponible')
  })
})
