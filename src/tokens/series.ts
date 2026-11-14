/** A plotted series. `color` picks one of the eight --gl-data-* tokens; it defaults to the series position. */
export interface ChartSeries {
  key: string;
  label: string;
  color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}

/** The CSS colour for a series, solid or at a given opacity. */
export function seriesColor(series: Pick<ChartSeries, 'color'> | undefined, index: number, alpha?: number): string {
  const slot = series?.color ?? ((index % 8) + 1);
  return alpha == null ? `rgb(var(--gl-data-${slot}))` : `rgb(var(--gl-data-${slot}) / ${alpha})`;
}
