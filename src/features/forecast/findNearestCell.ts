import type { ForecastCell, LngLat, NightForecast } from './types'

const metersPerLatitudeDegree = 111_320

export function findNearestCell({ cells, gridSizeMeters }: NightForecast, [lng, lat]: LngLat) {
  const metersPerLongitudeDegree = metersPerLatitudeDegree * Math.cos(lat * Math.PI / 180)
  let nearest: ForecastCell | undefined
  let minDistance = gridSizeMeters * 1.2

  for (const cell of cells) {
    const [cellLng, cellLat] = cell.center
    const distance = Math.hypot((cellLng - lng) * metersPerLongitudeDegree, (cellLat - lat) * metersPerLatitudeDegree)
    if (distance > minDistance) continue
    nearest = cell
    minDistance = distance
  }

  return nearest
}

export function cellRing([lng, lat]: LngLat, sizeMeters: number): LngLat[] {
  const halfLat = sizeMeters / 2 / metersPerLatitudeDegree
  const halfLng = halfLat / Math.cos(lat * Math.PI / 180)
  return [
    [lng - halfLng, lat - halfLat],
    [lng + halfLng, lat - halfLat],
    [lng + halfLng, lat + halfLat],
    [lng - halfLng, lat + halfLat],
    [lng - halfLng, lat - halfLat],
  ]
}
