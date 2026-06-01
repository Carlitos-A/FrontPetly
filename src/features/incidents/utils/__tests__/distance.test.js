import { describe, it, expect } from 'vitest'
import {
  getDistanceFromReference,
  comparePetsByDistance,
} from '../distance'

const SANTIAGO = { latitud: -33.4489, longitud: -70.6693 }
const VINA_DEL_MAR = { latitud: -33.0246, longitud: -71.5518 }

describe('getDistanceFromReference', () => {
  // 1
  it('calcula distancia correcta entre SANTIAGO y VINA_DEL_MAR', () => {
    const km = getDistanceFromReference(SANTIAGO, VINA_DEL_MAR)
    expect(km).toBeGreaterThan(80)
    expect(km).toBeLessThan(120)
  })

  // 2
  it('retorna 0 cuando origen y destino son el mismo punto', () => {
    const km = getDistanceFromReference(SANTIAGO, SANTIAGO)
    expect(km).toBeCloseTo(0, 1)
  })

  // 3
  it('acepta claves lat/lng alternativas del backend', () => {
    const item = { lat: VINA_DEL_MAR.latitud, lng: VINA_DEL_MAR.longitud }
    const km = getDistanceFromReference(SANTIAGO, item)
    expect(km).toBeGreaterThan(80)
    expect(km).toBeLessThan(120)
  })

  // 4
  it('usa el campo distance del item si las coordenadas son inválidas', () => {
    const item = { distancia: 99 }
    expect(getDistanceFromReference(SANTIAGO, item)).toBe(99)
  })

  // 5
  it('retorna null si no hay coordenadas ni distance', () => {
    expect(getDistanceFromReference(SANTIAGO, {})).toBeNull()
  })

  // 6
  it('retorna null si referenceLocation es undefined', () => {
    expect(getDistanceFromReference(undefined, VINA_DEL_MAR)).toBeNull()
  })
})

describe('comparePetsByDistance', () => {
  const comparar = comparePetsByDistance(SANTIAGO)

  //7
  it('ordena primero el más cercano', () => {
    const cercano = { latitud: -33.4489, longitud: -70.6693 }
    const lejano = VINA_DEL_MAR
    expect(comparar(cercano, lejano)).toBeLessThan(0)
    expect(comparar(lejano, cercano)).toBeGreaterThan(0)
  })

  //8
  it('manda al final los items sin distancia calculable', () => {
    const sinCoordenadas = {}
    const conCoordenadas = VINA_DEL_MAR
    expect(comparar(sinCoordenadas, conCoordenadas)).toBe(1)
    expect(comparar(conCoordenadas, sinCoordenadas)).toBe(-1)
  })

  //9
  it('retorna 0 si ambos no tienen distancia', () => {
    expect(comparar({}, {})).toBe(0)
  })
})
