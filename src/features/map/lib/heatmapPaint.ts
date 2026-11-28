import type { FillLayerSpecification, HeatmapLayerSpecification } from 'maplibre-gl'

export const glowPaint: HeatmapLayerSpecification['paint'] = {
  'heatmap-weight': ['interpolate', ['linear'], ['get', 'score'], 0.48, 0, 0.73, 0.37, 1, 0.95],
  'heatmap-intensity': 0.85,
  'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 8, 11, 10, 26, 12, 55, 14, 85],
  'heatmap-color': [
    'interpolate', ['linear'], ['heatmap-density'],
    0, 'rgba(239,185,75,0)',
    0.28, 'rgba(178,116,26,0.08)',
    0.58, 'rgba(211,153,45,0.23)',
    1, 'rgba(245,208,99,0.45)',
  ],
}

export const gridPaint: FillLayerSpecification['paint'] = {
  'fill-antialias': false,
  'fill-color': [
    'interpolate', ['linear'], ['get', 'score'],
    0, '#1a1d2c',
    0.18, '#24283b',
    0.32, '#363346',
    0.41, '#67502f',
    0.55, '#a17a39',
    0.69, '#d7a849',
    0.78, '#e8c363',
    0.88, '#ffe68a',
    1, '#fff2ad',
  ],
  'fill-opacity': 0.88,
}
