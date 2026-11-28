import { Info } from 'lucide-react'

export function NoForecastNotice({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="no-forecast">
      <p role="status"><Info size={17} aria-hidden="true" />오늘 밤 예보가 아직 없어요</p>
      <button type="button" onClick={onRetry}>다시 확인</button>
    </div>
  )
}
