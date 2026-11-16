import { useState, type KeyboardEvent } from 'react';
import { cx } from '../../utils/cx';
import './Map.css';

export interface MapMarker {
  /** Degrees north, -90 to 90. */
  lat: number;
  /** Degrees east, -180 to 180. */
  lon: number;
  label: string;
  /** Sizes the mark. Without it every mark has the same size. */
  value?: number;
}

export interface MapRegion {
  id: string;
  label: string;
  /** Shades the region from light to dark across the range of values. */
  value?: number;
  /** The outline as `[lon, lat]` pairs. */
  path: Array<[number, number]>;
}

export interface MapProps {
  markers?: MapMarker[];
  regions?: MapRegion[];
  /** Visible window as `[west, south, east, north]` in degrees. Defaults to the whole world. */
  bounds?: [number, number, number, number];
  /** Graticule spacing in degrees. 0 hides it. */
  graticule?: number;
  /** Print each marker's label beside it. */
  labels?: boolean;
  valueFormat?: (value: number) => string;
  /** Called when a marker is activated by click, Enter or Space. */
  onMarkerClick?: (marker: MapMarker) => void;
  /** Accessible name of the plot. */
  'aria-label'?: string;
  className?: string;
}

const defaultFormat = (value: number) => value.toLocaleString('en');

/**
 * An SVG plot of markers and regions on an equirectangular projection, with a graticule.
 * It draws no tiles and loads nothing: the caller supplies region outlines. Place it in a `ChartFrame`.
 */
export function Map({ markers = [], regions = [], bounds = [-180, -90, 180, 90], graticule = 30, labels = true, valueFormat = defaultFormat, onMarkerClick, className, 'aria-label': ariaLabel = 'Map' }: MapProps) {
  const [west, south, east, north] = bounds;
  const [hot, setHot] = useState<string | null>(null);
  const width = east - west;
  const height = north - south;
  const px = (lon: number) => lon - west;
  const py = (lat: number) => north - lat;

  const regionValues = regions.flatMap((r) => (r.value == null ? [] : [r.value]));
  const rMin = Math.min(...regionValues);
  const rMax = Math.max(...regionValues);
  const markerValues = markers.flatMap((m) => (m.value == null ? [] : [m.value]));
  const mMax = Math.max(0, ...markerValues);
  const unit = width / 360;
  const half = (m: MapMarker) => unit * (m.value == null || mMax === 0 ? 2.5 : 1.5 + 4.5 * Math.sqrt(Math.max(0, m.value) / mMax));

  const lines: number[] = [];
  const lats: number[] = [];
  if (graticule > 0) {
    for (let lon = Math.ceil(west / graticule) * graticule; lon <= east; lon += graticule) lines.push(lon);
    for (let lat = Math.ceil(south / graticule) * graticule; lat <= north; lat += graticule) lats.push(lat);
  }

  const markerKey = (m: MapMarker, i: number) => `m${i}:${m.label}`;
  const regionKey = (r: MapRegion) => `r:${r.id}`;
  const activeRegion = regions.find((r) => regionKey(r) === hot);
  const activeMarker = markers.find((m, i) => markerKey(m, i) === hot);
  const readout = activeMarker ?? activeRegion;

  const onKey = (event: KeyboardEvent, marker: MapMarker) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onMarkerClick?.(marker); }
  };

  return (
    <div className={cx('gl-map', className)}>
      <svg className="gl-map__svg" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" role="group" aria-label={ariaLabel}>
        <g className="gl-map__graticule" aria-hidden="true">
          {lines.map((lon) => <line key={`x${lon}`} x1={px(lon)} x2={px(lon)} y1={0} y2={height} data-axis={lon === 0 || undefined} />)}
          {lats.map((lat) => <line key={`y${lat}`} x1={0} x2={width} y1={py(lat)} y2={py(lat)} data-axis={lat === 0 || undefined} />)}
        </g>
        <g>
          {regions.map((region) => {
            const t = region.value == null || rMax === rMin ? 0.5 : (region.value - rMin) / (rMax - rMin);
            const d = region.path.map(([lon, lat], i) => `${i ? 'L' : 'M'}${px(lon)} ${py(lat)}`).join('') + 'Z';
            const label = region.value == null ? region.label : `${region.label}, ${valueFormat(region.value)}`;
            return (
              <path
                key={region.id} className="gl-map__region" d={d} role="img" aria-label={label} data-active={hot === regionKey(region) || undefined}
                style={region.value == null ? undefined : { fill: `rgb(var(--gl-data-1) / ${(0.1 + 0.6 * t).toFixed(2)})` }}
                onMouseEnter={() => setHot(regionKey(region))} onMouseLeave={() => setHot(null)}
              />
            );
          })}
        </g>
        <g>
          {markers.map((marker, i) => {
            const r = half(marker);
            const x = px(marker.lon);
            const y = py(marker.lat);
            const key = markerKey(marker, i);
            const name = marker.value == null ? marker.label : `${marker.label}, ${valueFormat(marker.value)}`;
            return (
              <g key={key}>
                <rect
                  className="gl-map__marker" x={x - r} y={y - r} width={2 * r} height={2 * r} data-active={hot === key || undefined}
                  tabIndex={0} role={onMarkerClick ? 'button' : 'img'} aria-label={name}
                  onMouseEnter={() => setHot(key)} onMouseLeave={() => setHot(null)} onFocus={() => setHot(key)} onBlur={() => setHot(null)}
                  onClick={() => onMarkerClick?.(marker)} onKeyDown={(event) => onKey(event, marker)}
                />
                {labels && <text className="gl-map__label" x={x + r + unit} y={y} dominantBaseline="central" style={{ fontSize: 4.5 * unit }}>{marker.label}</text>}
              </g>
            );
          })}
        </g>
      </svg>
      {readout && (
        <div className="gl-map__readout" aria-hidden="true">
          <span>{readout.label}</span>
          {readout.value != null && <strong>{valueFormat(readout.value)}</strong>}
        </div>
      )}
    </div>
  );
}
