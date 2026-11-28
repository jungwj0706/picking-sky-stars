import { Cloud, Star, TriangleAlert } from 'lucide-react'
import { grades } from '../../features/forecast/grade'
import type { Grade } from '../../features/forecast/grade'

const gradeIcons = { high: Star, medium: Cloud, low: TriangleAlert }

export function GradeBadge({ grade }: { grade: Grade }) {
  const Icon = gradeIcons[grade]
  return (
    <span className={`grade-badge grade--${grade}`}>
      <Icon size={14} aria-hidden="true" />
      {grades[grade].name}
    </span>
  )
}
