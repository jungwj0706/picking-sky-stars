import { useState } from 'react'
import { Header } from '../components/layout/Header'
import { useForecast } from '../features/forecast/hooks'
import { InfoModal } from '../features/info/InfoModal'
import { StarMap } from '../features/map/components/StarMap'

export default function App() {
  const [showInfo, setShowInfo] = useState(false)
  const forecast = useForecast()

  function refreshForecast() {
    void forecast.refetch({ cancelRefetch: false })
  }

  return (
    <div className="app">
      <Header onShowInfo={() => setShowInfo(true)} />
      <StarMap
        forecast={forecast.data ?? undefined}
        fetching={forecast.isFetching}
        failed={forecast.isError}
        empty={forecast.data === null}
        onRetry={refreshForecast}
      />
      {showInfo && (
        <InfoModal
          onClose={() => setShowInfo(false)}
          onRefresh={() => {
            setShowInfo(false)
            refreshForecast()
          }}
        />
      )}
    </div>
  )
}
