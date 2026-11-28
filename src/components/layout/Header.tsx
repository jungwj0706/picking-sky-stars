import { DateTimePill } from '../../features/datetime/components/DateTimePill'
import { Logo } from './Logo'

export function Header() {
  return (
    <header className="header">
      <Logo />
      <DateTimePill />
    </header>
  )
}
