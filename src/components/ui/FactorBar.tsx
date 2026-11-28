import type { LucideIcon } from 'lucide-react'
import { getGrade, toPoints } from '../../features/forecast/grade'

interface FactorBarProps {
  icon: LucideIcon
  label: string
  score: number
}

export function FactorBar({ icon: Icon, label, score }: FactorBarProps) {
  const points = toPoints(score)
  return (
    <div className={`factor grade--${getGrade(points)}`}>
      <span className="factor__name"><Icon size={17} aria-hidden="true" />{label}</span>
      <span className="factor__track" aria-hidden="true">
        <span style={{ width: `${points}%` }} />
      </span>
      <span className="factor__score" aria-label={`${points}점`}>{points}</span>
    </div>
  )
}
