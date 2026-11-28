import { Info } from 'lucide-react'
import { DateTimePill } from '../../features/datetime/components/DateTimePill'
import { Logo } from './Logo'

export function Header({ onShowInfo }: { onShowInfo: () => void }) {
  return (
    <header className="header">
      <Logo />
      <DateTimePill />
      <button className="icon-button header__info" type="button" aria-label="점수 읽는 법" aria-haspopup="dialog" onClick={onShowInfo}>
        <Info size={19} aria-hidden="true" />
      </button>
    </header>
  )
}
