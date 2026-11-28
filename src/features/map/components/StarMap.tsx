import { MapOverlayText } from '../../../components/layout/MapOverlayText'
import { useMap } from '../hooks/useMap'
import { Legend } from './Legend'
import { MapControls } from './MapControls'

export function StarMap() {
  const { container, map, unavailable } = useMap()

  return (
    <main className="map-screen" aria-label="서울 별 가시성">
      <div className="star-map" ref={container} />
      {unavailable && <p className="map-unavailable" role="alert">이 브라우저에서 지도를 표시할 수 없어요</p>}
      <MapOverlayText />
      <Legend />
      <MapControls disabled={!map} onZoomIn={() => map?.zoomIn()} onZoomOut={() => map?.zoomOut()} />
      <small className="map-credit">
        서울 지역 예보 · <a href="https://github.com/southkorea/seoul-maps" target="_blank" rel="noreferrer">지도 출처 SGIS</a>
      </small>
    </main>
  )
}
