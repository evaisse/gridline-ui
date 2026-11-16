import { useRef, type KeyboardEvent, type PointerEvent } from 'react';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import { Image } from './Image';
import './ImageCompare.css';

export interface ImageCompareSide {
  src: string;
  alt: string;
}

export interface ImageCompareProps {
  before: ImageCompareSide;
  after: ImageCompareSide;
  /** Divider position in percent from the left, 0 to 100. */
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  ratio?: string;
  className?: string;
}

const clamp = (n: number) => Math.min(100, Math.max(0, n));

/** Two pictures stacked under a divider you drag or move with the arrow keys; the left shows `before`. */
export function ImageCompare({ before, after, value, defaultValue = 50, onChange, ratio = '16 / 10', className }: ImageCompareProps) {
  const [position, setPosition] = useControlled(value, defaultValue, onChange);
  const frame = useRef<HTMLDivElement>(null);

  const move = (event: PointerEvent) => {
    const box = frame.current?.getBoundingClientRect();
    if (box && box.width > 0) setPosition(clamp(((event.clientX - box.left) / box.width) * 100));
  };
  const onKeyDown = (event: KeyboardEvent) => {
    const step = event.shiftKey ? 10 : 2;
    const next = { ArrowLeft: position - step, ArrowRight: position + step, Home: 0, End: 100 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setPosition(clamp(next));
  };

  return (
    <div ref={frame} className={cx('gl-image-compare', className)} style={{ aspectRatio: ratio, ['--gl-compare' as string]: `${position}%` }}>
      <Image {...after} ratio={ratio} className="gl-image-compare__layer" />
      <div className="gl-image-compare__before">
        <Image {...before} ratio={ratio} className="gl-image-compare__layer" />
      </div>
      <div
        role="slider" tabIndex={0} aria-label="Comparison divider" aria-orientation="horizontal" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)}% ${before.alt}`} className="gl-image-compare__handle" onKeyDown={onKeyDown}
        onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); move(event); }}
        onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) move(event); }}
      >
        <span className="gl-image-compare__grip" aria-hidden="true">⋮</span>
      </div>
    </div>
  );
}
