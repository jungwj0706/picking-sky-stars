import type { StyleSpecification } from 'maplibre-gl'

export const mapAssetBase = import.meta.env.BASE_URL

export const mapStyle: StyleSpecification = {
  version: 8,
  sources: {
    districts: { type: 'geojson', data: mapAssetBase + 'geo/seoul-gu.geojson' },
    neighborhoods: { type: 'geojson', data: mapAssetBase + 'geo/seoul-dong.geojson' },
    river: { type: 'geojson', data: mapAssetBase + 'geo/han-river.geojson' },
  },
  layers: [
    { id: 'background', type: 'background', paint: { 'background-color': '#0d101b' } },
    {
      id: 'city-fill',
      type: 'fill',
      source: 'districts',
      paint: { 'fill-color': '#101524' },
    },
    {
      id: 'city-line',
      type: 'line',
      source: 'districts',
      paint: { 'line-color': '#20283e', 'line-opacity': 0.72, 'line-width': 0.85 },
    },
    {
      id: 'river',
      type: 'line',
      source: 'river',
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#2d374d',
        'line-width': ['interpolate', ['linear'], ['zoom'], 8, 2, 10, 9, 13, 22],
        'line-opacity': 0.92,
      },
    },
    {
      id: 'neighborhood-hit',
      type: 'fill',
      source: 'neighborhoods',
      paint: { 'fill-opacity': 0 },
    },
    {
      id: 'neighborhood-active-fill',
      type: 'fill',
      source: 'neighborhoods',
      filter: ['==', ['get', 'id'], ''],
      paint: { 'fill-color': '#efc153', 'fill-opacity': 0.16 },
    },
    {
      id: 'neighborhood-active-line',
      type: 'line',
      source: 'neighborhoods',
      filter: ['==', ['get', 'id'], ''],
      paint: { 'line-color': '#efc153', 'line-opacity': 0.78, 'line-width': 1.6 },
    },
  ],
}
