import { Star } from 'lucide-react'

export function InitialLoading() {
  return (
    <div className="initial-loading" role="status">
      <div className="initial-loading__stars" aria-hidden="true">
        <Star size={11} />
        <Star size={29} />
        <Star size={12} />
      </div>
      <strong>별빛을 모으는 중...</strong>
      <p>서울의 밤하늘을 살펴보고 있어요</p>
    </div>
  )
}
