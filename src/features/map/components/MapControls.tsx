import { Minus, Plus } from 'lucide-react'

interface MapControlsProps {
  onZoomIn: () => void
  onZoomOut: () => void
  disabled?: boolean
}

export function MapControls({ onZoomIn, onZoomOut, disabled }: MapControlsProps) {
  return (
    <div className="map-controls" aria-label="지도 조작">
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
