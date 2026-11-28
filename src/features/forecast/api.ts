import type { ForecastCell, NightForecast } from './types'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isNumberIn(value: unknown, min: number, max: number): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max
}

function isCell(value: unknown): value is ForecastCell {
  if (!isRecord(value)) return false
  const { id, center, score, placeScore } = value
  return typeof id === 'string' && id.length > 0 &&
    Array.isArray(center) && center.length === 2 &&
    isNumberIn(center[0], -180, 180) && isNumberIn(center[1], -90, 90) &&
    isNumberIn(score, 0, 1) && isNumberIn(placeScore, 0, 1)
}

const seoulDate = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

function isForecast(value: unknown): value is NightForecast {
  if (!isRecord(value)) return false
  const { kind, nightDate, gridSizeMeters, nightSkyScore, meanCloudCover, cells } = value
  const hasNightDate = kind === 'forecast' && typeof nightDate === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(nightDate)
  return (hasNightDate || (kind === 'sample' && nightDate === null)) &&
    isNumberIn(gridSizeMeters, 1, 3000) && isNumberIn(nightSkyScore, 0, 1) &&
    (meanCloudCover === undefined || isNumberIn(meanCloudCover, 0, 10)) &&
    Array.isArray(cells) && cells.every(isCell) &&
    new Set(cells.map(({ id }) => id)).size === cells.length
}

export async function fetchForecast(signal?: AbortSignal): Promise<NightForecast | null> {
  const response = await fetch(import.meta.env.BASE_URL + 'data/index.json', { signal, cache: 'no-cache' })
  if (response.status === 204 || response.status === 404) return null
  if (!response.ok) throw new Error(`예보 요청 실패 (${response.status})`)

  const result: unknown = await response.json()
  if (!isForecast(result)) throw new Error('예보 데이터 형식이 올바르지 않음')
  if (result.kind === 'forecast' && result.nightDate !== seoulDate.format(new Date())) return null
  return result.cells.length ? result : null
}
