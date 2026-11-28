import type { GeoJSON, Position } from 'geojson'
import type { LngLatBoundsLike } from 'maplibre-gl'
import type { LngLat } from '../../forecast/types'

export const seoulBounds: LngLatBoundsLike = [
  [126.764, 37.425],
  [127.187, 37.704],
]

export const seoulCenter: [number, number] = [126.976, 37.564]

export const mapLabels = [
  { text: '서울', coordinates: [126.977, 37.558], prominent: true },
  { text: '은평구', coordinates: [126.923, 37.613] },
  { text: '노원구', coordinates: [127.079, 37.653] },
  { text: '마포구', coordinates: [126.912, 37.56] },
  { text: '종로구', coordinates: [126.979, 37.589] },
  { text: '중구', coordinates: [126.998, 37.55] },
  { text: '성동구', coordinates: [127.047, 37.551] },
  { text: '강남구', coordinates: [127.064, 37.492] },
  { text: '한강', coordinates: [126.95, 37.527] },
] satisfies { text: string; coordinates: [number, number]; prominent?: boolean }[]

function ringContains([longitude, latitude]: LngLat, ring: Position[]) {
  let inside = false
  for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index++) {
    const [x, y] = ring[index]
    const [previousX, previousY] = ring[previous]
    if ((y > latitude) !== (previousY > latitude) &&
      longitude < (previousX - x) * (latitude - y) / (previousY - y) + x) {
      inside = !inside
    }
  }
  return inside
}

export function isInSeoul(coordinates: LngLat, districts: GeoJSON) {
  if (districts.type !== 'FeatureCollection') return false
  const includes = ([outer, ...holes]: Position[][]) =>
    outer && ringContains(coordinates, outer) && !holes.some((hole) => ringContains(coordinates, hole))
  return districts.features.some(({ geometry }) => {
    if (geometry?.type === 'Polygon') return includes(geometry.coordinates)
    return geometry?.type === 'MultiPolygon' && geometry.coordinates.some(includes)
  })
}
