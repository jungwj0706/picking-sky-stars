import type { LngLatBoundsLike } from 'maplibre-gl'

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
