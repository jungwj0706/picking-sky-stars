import { useEffect, useRef, useState } from 'react'
import { Map, Marker, setWorkerUrl } from 'maplibre-gl'
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import { mapStyle } from '../lib/mapStyle'
import { mapLabels, seoulBounds, seoulCenter } from '../lib/seoulBounds'

setWorkerUrl(workerUrl)

export function useMap() {
  const container = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<Map | null>(null)
  const [unavailable, setUnavailable] = useState(false)

  useEffect(() => {
    const element = container.current
    if (!element) return

    let instance: Map
    try {
      instance = new Map({
        container: element,
        style: mapStyle,
        center: seoulCenter,
        zoom: 9.5,
        minZoom: 8,
        maxZoom: 14,
        maxBounds: [[126.43, 37.16], [127.53, 37.95]],
        attributionControl: false,
        renderWorldCopies: false,
        dragRotate: false,
        pitchWithRotate: false,
        touchPitch: false,
        fadeDuration: 0,
      })
    } catch {
      queueMicrotask(() => setUnavailable(true))
      return
    }

    instance.touchZoomRotate.disableRotation()
    const canvas = instance.getCanvas()
    canvas.setAttribute('aria-label', '서울 별 가시성 지도')
    const fit = () => {
      const mobile = element.clientWidth < 720
      if (mobile) {
        instance.jumpTo({ center: seoulCenter, zoom: Math.log2(Math.max(element.clientHeight * 0.63, 305) / 0.502) })
        return
      }

      instance.fitBounds(seoulBounds, {
        padding: { top: 47, right: 38, bottom: 68, left: 38 },
        maxZoom: 10.65,
        duration: 0,
      })
    }

    fit()
    instance.once('load', () => setMap(instance))
    mapLabels.forEach(({ text, coordinates, prominent }) => {
      const label = document.createElement('span')
      label.className = prominent ? 'map-label map-label--prominent' : 'map-label'
      label.textContent = text
      label.setAttribute('aria-hidden', 'true')
      new Marker({ element: label }).setLngLat(coordinates).addTo(instance)
    })

    let previousWidth = element.clientWidth
    const observer = new ResizeObserver(() => {
      const width = element.clientWidth
      if ((width < 720) !== (previousWidth < 720)) fit()
      previousWidth = width
    })
    observer.observe(element)

    return () => {
      observer.disconnect()
      instance.remove()
    }
  }, [])

  return { container, map, unavailable }
}
