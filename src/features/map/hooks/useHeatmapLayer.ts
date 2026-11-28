import { useEffect } from 'react'
import type { FeatureCollection, Point, Polygon } from 'geojson'
import type { GeoJSONSource, Map } from 'maplibre-gl'
import type { NightForecast } from '../../forecast/types'
import { cellRing } from '../../forecast/findNearestCell'
import { glowPaint, gridPaint } from '../lib/heatmapPaint'

export function useHeatmapLayer(map: Map | null, forecast: NightForecast | undefined) {
  useEffect(() => {
    if (!map) return

    const cells = forecast?.cells ?? []
    const cellSize = (forecast?.gridSizeMeters ?? 0) * 0.78
    const grid: FeatureCollection<Polygon> = {
      type: 'FeatureCollection',
      features: cells.map(({ center, score }) => ({
        type: 'Feature',
        properties: { score },
        geometry: { type: 'Polygon', coordinates: [cellRing(center, cellSize)] },
      })),
    }
    const glow: FeatureCollection<Point> = {
      type: 'FeatureCollection',
      features: cells.filter(({ score }) => score > 0.48).map(({ center, score }) => ({
        type: 'Feature',
        properties: { score },
        geometry: { type: 'Point', coordinates: center },
      })),
    }

    const gridSource = map.getSource<GeoJSONSource>('forecast-grid')
    const glowSource = map.getSource<GeoJSONSource>('forecast-glow')
    if (gridSource && glowSource) {
      gridSource.setData(grid)
      glowSource.setData(glow)
      return
    }

    map.addSource('forecast-glow', { type: 'geojson', data: glow })
    map.addSource('forecast-grid', { type: 'geojson', data: grid, tolerance: 0.05 })
    map.addLayer({ id: 'forecast-glow', source: 'forecast-glow', type: 'heatmap', paint: glowPaint }, 'city-line')
    map.addLayer({ id: 'forecast-grid', source: 'forecast-grid', type: 'fill', paint: gridPaint }, 'city-line')
  }, [forecast, map])
}
