import { useEffect, useMemo, useState } from 'react'
import type { MapMouseEvent, Point } from 'maplibre-gl'
import { MapOverlayText } from '../../../components/layout/MapOverlayText'
import { findNearestCell } from '../../forecast/findNearestCell'
import type { LngLat, NightForecast } from '../../forecast/types'
import { RegionDetail } from '../../region/components/RegionDetail'
import type { RegionSelection } from '../../region/components/RegionDetail'
import { useHeatmapLayer } from '../hooks/useHeatmapLayer'
import { useMap } from '../hooks/useMap'
import { useRegionHighlight } from '../hooks/useRegionHighlight'
import { Legend } from './Legend'
import { MapControls } from './MapControls'

type SelectedLocation = Omit<RegionSelection, 'cell'> & { coordinates: LngLat }

export function StarMap({ forecast }: { forecast?: NightForecast }) {
  const { container, map, unavailable } = useMap()
  const [location, setLocation] = useState<SelectedLocation | null>(null)
  const selection = useMemo<RegionSelection | null>(() => {
    if (!forecast || !location) return null
    const cell = findNearestCell(forecast, location.coordinates)
    return cell ? { name: location.name, neighborhoodId: location.neighborhoodId, cell } : null
  }, [forecast, location])

  useHeatmapLayer(map, forecast)
  useRegionHighlight(map, selection)

  useEffect(() => {
    if (!map || !forecast) return
    const canvas = map.getCanvas()

    function selectAt(point: Point, coordinates: LngLat) {
      if (!map || !forecast || !findNearestCell(forecast, coordinates)) return
      const [district] = map.queryRenderedFeatures(point, { layers: ['city-fill'] })
      if (!district) return
      const neighborhoods = map.queryRenderedFeatures(point, { layers: ['neighborhood-hit'] })
      const neighborhood = neighborhoods.find((feature) =>
        String(feature.properties.id).startsWith(String(district.properties.id)))
      setLocation({
        name: neighborhood ? `${district.properties.name} ${neighborhood.properties.name}` : district.properties.name,
        neighborhoodId: neighborhood?.properties.id,
        coordinates,
      })
    }

    function handleClick(event: MapMouseEvent) {
      selectAt(event.point, event.lngLat.toArray())
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key !== 'Enter') return
      const center = map?.getCenter()
      if (!map || !center) return
      event.preventDefault()
      selectAt(map.project(center), center.toArray())
    }

    map.on('click', handleClick)
    canvas.addEventListener('keydown', handleKey)
    return () => {
      map.off('click', handleClick)
      canvas.removeEventListener('keydown', handleKey)
    }
  }, [forecast, map])

  function closeDetail() {
    setLocation(null)
    map?.getCanvas().focus({ preventScroll: true })
  }

  return (
    <main className={`map-screen${selection ? ' map-screen--selected' : ''}`} aria-label="서울 별 가시성">
      <div className="star-map" ref={container} />
      <p id="map-keyboard-help" className="visually-hidden">방향키로 이동한 뒤 Enter 키로 지도 가운데 지역을 선택할 수 있어요.</p>
      {unavailable && <p className="map-unavailable" role="alert">이 브라우저에서 지도를 표시할 수 없어요</p>}
      <MapOverlayText />
      <Legend />
      <MapControls disabled={!map} onZoomIn={() => map?.zoomIn()} onZoomOut={() => map?.zoomOut()} />
      <small className="map-credit">
        {forecast?.kind === 'sample' ? '샘플 예보' : '서울 지역 예보'} · <a href="https://github.com/southkorea/seoul-maps" target="_blank" rel="noreferrer">지도 출처 SGIS</a>
      </small>
      {selection && forecast && <RegionDetail selection={selection} forecast={forecast} onClose={closeDetail} />}
    </main>
  )
}
