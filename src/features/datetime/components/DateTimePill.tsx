import { CalendarDays, Clock3 } from 'lucide-react'

export function DateTimePill() {
  return (
    <div className="forecast-time">
      <CalendarDays aria-hidden="true" className="forecast-time__calendar" size={15} />
      <span>오늘 밤</span>
      <Clock3 aria-hidden="true" size={15} />
      <span>22:00~다음 날 02:00</span>
    </div>
  )
}
