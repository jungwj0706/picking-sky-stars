import { CloudOff } from 'lucide-react'

interface ErrorCardProps {
  onRetry: () => void
  hasPreviousForecast: boolean
  retrying: boolean
}

export function ErrorCard({ onRetry, hasPreviousForecast, retrying }: ErrorCardProps) {
  return (
    <div className="forecast-error">
      <CloudOff size={32} aria-hidden="true" />
      <div role="alert">
        <h2>예보를 가져오지 못했어요</h2>
        <p>{hasPreviousForecast ? '마지막으로 불러온 예보를 표시하고 있어요' : '잠시 후 다시 시도해 주세요'}</p>
      </div>
      <button className="accent-button" type="button" onClick={onRetry} disabled={retrying}>다시 시도</button>
    </div>
  )
}
