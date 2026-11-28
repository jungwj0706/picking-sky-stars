import { useEffect, useRef, useState } from 'react'
import { Marker } from 'maplibre-gl'
import type { GeoJSONSource, Map } from 'maplibre-gl'
import type { LngLat } from '../../forecast/types'
import { isInSeoul } from '../lib/seoulBounds'

const locationMessages = {
  outside: '현재는 서울 지역만 지원해요',
  denied: '위치 권한이 꺼져 있어요. 브라우저 설정에서 허용해 주세요',
  unavailable: '현재 위치를 확인할 수 없어요. 잠시 후 다시 시도해 주세요',
} as const

export function useGeolocation(map: Map | null, onLocated: () => void) {
  const [locating, setLocating] = useState(false)
  const [message, setMessage] = useState<string>()
  const [coordinates, setCoordinates] = useState<LngLat>()
  const request = useRef(0)
  const pending = useRef(false)

  useEffect(() => () => { request.current += 1 }, [])

  useEffect(() => {
    if (!map || !coordinates) return
    const element = document.createElement('span')
    element.className = 'my-location-marker'
    element.setAttribute('aria-hidden', 'true')
    const marker = new Marker({ element }).setLngLat(coordinates).addTo(map)
    return () => { marker.remove() }
  }, [coordinates, map])

  function locate() {
    if (!map || pending.current) return
    if (!navigator.geolocation) {
      setMessage(locationMessages.unavailable)
      return
    }

    const current = ++request.current
    pending.current = true
    setLocating(true)
    setMessage(undefined)

    function finish() {
      pending.current = false
      setLocating(false)
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        if (request.current !== current) return
        try {
          const districts = await map.getSource<GeoJSONSource>('districts')?.getData()
          if (request.current !== current) return
          if (!districts) throw new Error('서울 경계 데이터 없음')

          const currentPosition: LngLat = [coords.longitude, coords.latitude]
          if (!isInSeoul(currentPosition, districts)) {
            setMessage(locationMessages.outside)
            return
          }

          setCoordinates(currentPosition)
          onLocated()
          map.easeTo({
            center: currentPosition,
            zoom: Math.max(map.getZoom(), 11.6),
            duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 500,
          })
        } catch {
          if (request.current === current) setMessage(locationMessages.unavailable)
        } finally {
          if (request.current === current) finish()
        }
      },
      (error) => {
        if (request.current !== current) return
        setMessage(error.code === 1 ? locationMessages.denied : locationMessages.unavailable)
        finish()
      },
      { timeout: 9000, maximumAge: 60_000 },
    )
  }

  return { locate, locating, message, dismissMessage: () => setMessage(undefined) }
}
