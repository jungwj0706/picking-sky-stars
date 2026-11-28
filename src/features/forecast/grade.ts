export const grades = {
  high: { name: '매우 좋음', range: '70–100점', summary: '오늘 밤 별을 관측하기 좋아요' },
  medium: { name: '보통', range: '40–69점', summary: '밤하늘과 장소 조건을 함께 살펴보세요' },
  low: { name: '나쁨', range: '0–39점', summary: '오늘 밤 별을 관측하기 어려울 수 있어요' },
} as const

export type Grade = keyof typeof grades

export function toPoints(score: number) {
  return Math.round(score * 100)
}

export function getGrade(points: number): Grade {
  if (points >= 70) return 'high'
  if (points >= 40) return 'medium'
  return 'low'
}
