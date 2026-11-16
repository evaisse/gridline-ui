import { seriesColor } from '../../tokens/series';
import { cx } from '../../utils/cx';
import './Sparkline.css';

export interface SparklineProps {
  /** The values, in order. */
  data: number[];
  variant?: 'line' | 'area' | 'bars';
  width?: number;
  height?: number;
  /** One of the eight data palette slots. */
  color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  /** Accessible description, for example "Downloads, last 14 days". */
  label: string;
  /** Draws a dot on the last value (line and area). */
  showLast?: boolean;
  className?: string;
}

/** A tiny axis-free chart in pure inline SVG, for a table cell or a stat. */
export function Sparkline({ data, variant = 'line', width = 96, height = 24, color, label, showLast = true, className }: SparklineProps) {
  const stroke = seriesColor({ color }, 0);
  const pad = 2;
  const min = Math.min(0, ...data);
  const max = Math.max(...data, min + 1e-9);
  const span = max - min || 1;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;
  const x = (i: number) => (data.length < 2 ? width / 2 : pad + (i * innerW) / (data.length - 1));
  const y = (v: number) => pad + innerH - ((v - min) / span) * innerH;
  const yLine = (v: number) => {
    const lo = Math.min(...data);
    const hi = Math.max(...data);
    return hi === lo ? height / 2 : pad + innerH - ((v - lo) / (hi - lo)) * innerH;
  };
  const points = data.map((v, i) => `${x(i).toFixed(1)},${yLine(v).toFixed(1)}`);
  const last = data.length - 1;

  return (
    <svg className={cx('gl-sparkline', className)} width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
      {variant === 'bars' ? (
        data.map((v, i) => {
          const slot = innerW / data.length;
          const barH = Math.max(1, y(0) - y(v));
          return <rect key={i} x={pad + i * slot + slot * 0.1} y={v >= 0 ? y(v) : y(0)} width={Math.max(1, slot * 0.8)} height={v >= 0 ? barH : Math.max(1, y(v) - y(0))} fill={stroke} />;
        })
      ) : data.length > 0 && (
        <>
          {variant === 'area' && data.length > 1 && (
            <polygon points={`${x(0).toFixed(1)},${height - pad} ${points.join(' ')} ${x(last).toFixed(1)},${height - pad}`} fill={seriesColor({ color }, 0, 0.18)} />
          )}
          <polyline points={points.join(' ')} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
          {showLast && <circle cx={x(last)} cy={yLine(data[last])} r="2" fill={stroke} />}
        </>
      )}
    </svg>
  );
}
