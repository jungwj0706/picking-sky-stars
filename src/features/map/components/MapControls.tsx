import { LocateFixed, Minus, Plus } from 'lucide-react'

interface MapControlsProps {
  onLocate: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  locating: boolean
  disabled?: boolean
}

export function MapControls({ onLocate, onZoomIn, onZoomOut, locating, disabled }: MapControlsProps) {
  return (
    <div className="map-controls" aria-label="지도 조작">
      <button className="map-controls__location" type="button" aria-label="내 위치" onClick={onLocate} disabled={disabled || locating}>
        <LocateFixed size={20} aria-hidden="true" />
      </button>
      <div className="map-controls__zoom">
        <button type="button" aria-label="지도 확대" onClick={onZoomIn} disabled={disabled}>
          <Plus size={19} aria-hidden="true" />
        </button>
        <button type="button" aria-label="지도 축소" onClick={onZoomOut} disabled={disabled}>
          <Minus size={19} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
