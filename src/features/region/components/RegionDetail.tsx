import { Cloud, Mountain, Navigation, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { getGrade, grades, toPoints } from '../../forecast/grade'
import type { ForecastCell, NightForecast } from '../../forecast/types'
import { FactorBar } from '../../../components/ui/FactorBar'
import { GradeBadge } from '../../../components/ui/GradeBadge'

export interface RegionSelection {
  name: string
  neighborhoodId?: string
  cell: ForecastCell
}

interface RegionDetailProps {
  selection: RegionSelection
  forecast: NightForecast
  onClose: () => void
}

export function RegionDetail({ selection, forecast, onClose }: RegionDetailProps) {
  const closeButton = useRef<HTMLButtonElement>(null)
  const points = toPoints(selection.cell.score)
  const grade = getGrade(points)
  const cloudCover = forecast.meanCloudCover

  useEffect(() => {
    closeButton.current?.focus({ preventScroll: true })
  }, [])

  return (
    <aside
      className="region-panel"
      aria-labelledby="region-title"
      onKeyDown={(event) => {
        if (event.key === 'Escape') onClose()
      }}
    >
      <div className="region-panel__header">
        <h2 id="region-title"><Navigation size={17} aria-hidden="true" />{selection.name}</h2>
        <button
          className="icon-button icon-button--plain"
          ref={closeButton}
          type="button"
          aria-label="지역 상세 닫기"
          onClick={onClose}
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>
      <div className={`region-score grade--${grade}`}>
        <p className="region-score__label">별 가시성 점수</p>
        <div className="region-score__value">
          <div><strong>{points}</strong><span> / 100</span></div>
          <GradeBadge grade={grade} />
        </div>
        <p className="region-score__summary">{grades[grade].summary}</p>
      </div>
      <div className="region-factors">
        <h3>점수에 반영된 조건</h3>
        <FactorBar icon={Cloud} label="오늘 밤 하늘 상태" score={forecast.nightSkyScore} />
        {cloudCover !== undefined && <p className="region-factors__note">서울 예상 평균 구름량 {cloudCover} / 10</p>}
        <FactorBar icon={Mountain} label="이 장소의 관측 조건" score={selection.cell.placeScore} />
      </div>
      <div className="region-panel__footer">
        {forecast.nightDate && <p className="region-panel__date">{forecast.nightDate} 밤 예보</p>}
        <p>22:00~다음 날 02:00 · 오전 6시까지의 관측 자료 기준</p>
        <p>{forecast.kind === 'sample' ? '화면 시연용 샘플 예보예요.' : '실제 관측 환경은 예측과 다를 수 있어요.'}</p>
      </div>
    </aside>
  )
}
