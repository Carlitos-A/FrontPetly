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
  it('retorna null si no hay coordenadas ni referencia válida', () => {
    expect(getDistanceFromReference(SANTIAGO, {})).toBeNull()
    expect(getDistanceFromReference(undefined, VINA_DEL_MAR)).toBeNull()
  })
})

describe('comparePetsByDistance', () => {
  const comparar = comparePetsByDistance(SANTIAGO)

  it('ordena primero el más cercano y retorna 0 si ambos sin distancia', () => {
    const cercano = { latitud: -33.4489, longitud: -70.6693 }
    expect(comparar(cercano, VINA_DEL_MAR)).toBeLessThan(0)
    expect(comparar({}, {})).toBe(0)
  })
})
