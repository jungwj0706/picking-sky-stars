import { useQuery } from '@tanstack/react-query'
import { fetchForecast } from './api'

export function useForecast() {
  return useQuery({
    queryKey: ['night-forecast'],
    queryFn: ({ signal }) => fetchForecast(signal),
    networkMode: 'always',
    retry: false,
  })
}
