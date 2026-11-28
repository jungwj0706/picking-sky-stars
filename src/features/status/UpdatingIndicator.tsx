import { RefreshCw } from 'lucide-react'

export function UpdatingIndicator() {
  return (
    <div className="updating-indicator" role="status">
      <RefreshCw size={18} aria-hidden="true" />
      <span>예보 갱신 중</span>
    </div>
  )
}
