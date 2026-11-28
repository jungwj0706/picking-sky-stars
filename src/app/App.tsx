import { useState } from 'react'
import { Header } from '../components/layout/Header'
import { useForecast } from '../features/forecast/hooks'
import { InfoModal } from '../features/info/InfoModal'
import { StarMap } from '../features/map/components/StarMap'

export default function App() {
  const [showInfo, setShowInfo] = useState(false)
  const forecast = useForecast()

  return (
    <div className="app">
      <Header onShowInfo={() => setShowInfo(true)} />
      <StarMap forecast={forecast.data ?? undefined} />
      {showInfo && <InfoModal onClose={() => setShowInfo(false)} />}
    </div>
  )
}
