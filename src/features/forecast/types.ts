export type LngLat = [longitude: number, latitude: number]

export interface ForecastCell {
  id: string
  center: LngLat
  placeScore: number
  score: number
}

interface ForecastResults {
  gridSizeMeters: number
  nightSkyScore: number
  meanCloudCover?: number
  cells: ForecastCell[]
}

export type NightForecast = ForecastResults & (
  | { kind: 'sample'; nightDate: null }
  | { kind: 'forecast'; nightDate: string }
)
