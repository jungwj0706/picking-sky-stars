import { useEffect } from 'react'
import { Marker } from 'maplibre-gl'
import type { Map } from 'maplibre-gl'
import { toPoints } from '../../forecast/grade'
import type { RegionSelection } from '../../region/components/RegionDetail'

export function useRegionHighlight(map: Map | null, selection: RegionSelection | null) {
  useEffect(() => {
    if (!map) return

    const id = selection?.neighborhoodId ?? ''
    map.setFilter('neighborhood-active-fill', ['==', ['get', 'id'], id])
    map.setFilter('neighborhood-active-line', ['==', ['get', 'id'], id])
    if (!selection) return

    const markerElement = document.createElement('div')
    markerElement.className = 'selection-marker'
    markerElement.setAttribute('aria-hidden', 'true')
    const label = document.createElement('span')
    label.className = 'selection-marker__label'
    label.textContent = `${selection.name} ${toPoints(selection.cell.score)}`
    const pin = document.createElement('span')
    pin.className = 'selection-marker__pin'
    markerElement.append(label, pin)

    const marker = new Marker({ element: markerElement, anchor: 'bottom', offset: [0, 18] })
      .setLngLat(selection.cell.center)
      .addTo(map)

    const container = map.getContainer()
    const point = map.project(selection.cell.center)
    const mobile = matchMedia('(max-width: 719px)').matches
    if (mobile || point.x < 35 || point.x > container.clientWidth - 75) {
      map.easeTo({
        center: selection.cell.center,
        offset: [0, mobile ? -container.clientHeight * 0.15 : 0],
        duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 350,
      })
    }

    return () => { marker.remove() }
  }, [map, selection])
}
