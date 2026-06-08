import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { formatType, formatSpecies, formatTimeRelative, formatDate } from '../reportFormatters'

describe('formatType', () => {
  it('reconoce tipos conocidos y retorna "Reporte" para desconocidos o nulos', () => {
    expect(formatType('PERDIDA')).toBe('Perdida')
    expect(formatType('found')).toBe('Encontrada')
    expect(formatType('avistamiento')).toBe('Avistamiento')
    expect(formatType('EXTRAÑO')).toBe('Reporte')
    expect(formatType(null)).toBe('Reporte')
  })
})

describe('formatSpecies', () => {
  it('mapea species conocidas y retorna fallback para nulas o desconocidas', () => {
    expect(formatSpecies('dog')).toBe('Perro')
    expect(formatSpecies('cat')).toBe('Gato')
    expect(formatSpecies(null)).toBe('Mascota')
  })
})

describe('formatTimeRelative', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-05-10T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('retorna etiquetas relativas correctas', () => {
    expect(formatTimeRelative(null)).toBe('Reciente')
    expect(formatTimeRelative('2026-05-10T11:30:00.000Z')).toBe('Ahora')
    expect(formatTimeRelative('2026-05-10T09:00:00.000Z')).toBe('Hace 3 h')
    expect(formatTimeRelative('2026-05-08T12:00:00.000Z')).toBe('Hace 2 d')
  })
})

describe('formatDate', () => {
  it('formatea fecha ISO válida y retorna fallback para null', () => {
    expect(formatDate(null)).toBe('recientemente')
    const result = formatDate('2026-05-10T12:00:00.000Z')
    expect(result).toMatch(/may/i)
    expect(result).toMatch(/2026/)
  })
})
