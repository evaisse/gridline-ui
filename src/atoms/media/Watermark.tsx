import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './Watermark.css';

export interface WatermarkProps extends HTMLAttributes<HTMLDivElement> {
  /** The mark; an array gives several lines. */
  text: string | string[];
  /** Rotation in degrees. */
  rotate?: number;
  /** Tile width in px. */
  tileWidth?: number;
  /** Tile height in px. */
  tileHeight?: number;
  /** Mark font size in px. */
  fontSize?: number;
}

function hash(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36);
}

/** Repeats a faint, rotated text mark behind its children; the mark never takes pointer events. */
export function Watermark({ text, rotate = -22, tileWidth = 200, tileHeight = 120, fontSize = 12, className, children, ...rest }: WatermarkProps) {
  const lines = Array.isArray(text) ? text : [text];
  const id = `gl-wm-${hash(`${lines.join('|')}${rotate}${tileWidth}${tileHeight}${fontSize}`)}`;
  const y0 = tileHeight / 2 - ((lines.length - 1) * fontSize * 1.4) / 2;
  return (
    <div className={cx('gl-watermark', className)} {...rest}>
      {children}
      <svg className="gl-watermark__mark" width="100%" height="100%" aria-hidden="true" focusable="false">
        <defs>
          <pattern id={id} width={tileWidth} height={tileHeight} patternUnits="userSpaceOnUse" patternTransform={`rotate(${rotate})`}>
            <text x={tileWidth / 2} y={y0} textAnchor="middle" dominantBaseline="middle" fontSize={fontSize} fill="currentColor">
              {lines.map((line, i) => (
                <tspan key={i} x={tileWidth / 2} dy={i === 0 ? 0 : fontSize * 1.4}>
                  {line}
                </tspan>
              ))}
            </text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}
