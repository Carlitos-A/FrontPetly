import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { normalizeReportPreview } from '../reportFormatters'

describe('normalizeReportPreview', () => {
  it('mapea id, title, type y typeLabel correctamente', () => {
    expect(normalizeReportPreview({ id: 7 }).id).toBe(7)
    expect(normalizeReportPreview({ idreporte: 42 }).id).toBe(42)

    expect(normalizeReportPreview({ estadoReporte: 'Perdido' }).title).toBe('Perdido')
    expect(normalizeReportPreview({}).title).toBe('Mascota reportada')

    const perdida = normalizeReportPreview({ tipoReporte: 'perdida' })
    expect(perdida.type).toBe('PERDIDA')
    expect(perdida.typeLabel).toBe('Perdida')
    expect(normalizeReportPreview({}).type).toBe('REPORTE')
  })

  it('mapea speciesLabel, color, sector y photo con sus fallbacks', () => {
    expect(normalizeReportPreview({ species: 'dog' }).speciesLabel).toBe('Perro')
    expect(normalizeReportPreview({}).speciesLabel).toBe('Mascota')

    expect(normalizeReportPreview({ color: 'Negro' }).color).toBe('Negro')
    expect(normalizeReportPreview({}).color).toBe('Sin color')

    expect(normalizeReportPreview({ sector: 'Providencia' }).sector).toBe('Providencia')
    expect(normalizeReportPreview({}).sector).toBe('Sector no informado')

    expect(normalizeReportPreview({ photo: 'https://a.com/img.jpg' }).photo).toBe('https://a.com/img.jpg')
    expect(normalizeReportPreview({}).photo).toBe('')
  })

  describe('campo timeLabel', () => {
    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2026-05-10T12:00:00.000Z'))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('usa fechaReporte y retorna "Reciente" por defecto', () => {
      expect(normalizeReportPreview({}).timeLabel).toBe('Reciente')
      expect(normalizeReportPreview({ fechaReporte: '2026-05-10T09:00:00.000Z' }).timeLabel).toBe('Hace 3 h')
    })
  })

  it('pasa coordenadas y breed tal cual con sus fallbacks', () => {
    const coords = normalizeReportPreview({ latitud: -33.44, longitud: -70.66 })
    expect(coords.latitud).toBe(-33.44)
    expect(coords.longitud).toBe(-70.66)

    expect(normalizeReportPreview({ breed: 'Poodle' }).breed).toBe('Poodle')
    expect(normalizeReportPreview({ raza: 'Labrador' }).breed).toBe('Labrador')
    expect(normalizeReportPreview({}).breed).toBe('')
  })
})
