export function Legend() {
  return (
    <div className="legend" aria-label="별 가시성 범례">
      <p>밝을수록 별이 잘 보여요</p>
      <div className="legend__gradient" aria-hidden="true" />
      <div className="legend__labels">
        <span>나쁨</span>
        <span>보통</span>
        <span>좋음</span>
      </div>
    </div>
  )
}
