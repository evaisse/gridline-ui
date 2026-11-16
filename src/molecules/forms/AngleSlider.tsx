import { type KeyboardEvent, type PointerEvent } from 'react';
import { Input } from '../../atoms';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './AngleSlider.css';

export interface AngleSliderProps {
  /** The angle in degrees, 0 to 359. Zero points up and angles grow clockwise. */
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  /** Degrees per arrow key press and per snap while dragging. */
  step?: number;
  /** Show a numeric field beside the dial. */
  showInput?: boolean;
  disabled?: boolean;
  /** Accessible name of the dial. */
  'aria-label'?: string;
  className?: string;
}

const wrap = (deg: number) => ((deg % 360) + 360) % 360;
const point = (deg: number, r: number) => ({ x: 50 + r * Math.sin((deg * Math.PI) / 180), y: 50 - r * Math.cos((deg * Math.PI) / 180) });

/** A round dial for setting an angle by dragging, with arrow-key steps and an optional degree field. */
export function AngleSlider({ value, defaultValue = 0, onChange, step = 1, showInput = true, disabled, 'aria-label': ariaLabel = 'Angle', className }: AngleSliderProps) {
  const [angle, setAngle] = useControlled(value === undefined ? undefined : wrap(value), wrap(defaultValue), onChange);
  const set = (deg: number) => setAngle(wrap(Math.round(deg / step) * step));

  const drag = (event: PointerEvent<SVGSVGElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (box.left + box.width / 2);
    const dy = event.clientY - (box.top + box.height / 2);
    set((Math.atan2(dx, -dy) * 180) / Math.PI);
  };
  const onKey = (event: KeyboardEvent<SVGSVGElement>) => {
    const big = step * 10;
    const next: Record<string, number> = { ArrowRight: angle + step, ArrowUp: angle + step, ArrowLeft: angle - step, ArrowDown: angle - step, PageUp: angle + big, PageDown: angle - big, Home: 0, End: 359 };
    if (!(event.key in next)) return;
    event.preventDefault();
    setAngle(wrap(next[event.key]));
  };

  const tip = point(angle, 38);
  return (
    <span className={cx('gl-angle-slider', disabled && 'gl-angle-slider--disabled', className)}>
      <svg
        className="gl-angle-slider__dial" viewBox="0 0 100 100" role="slider" aria-label={ariaLabel} aria-valuemin={0} aria-valuemax={359} aria-valuenow={Math.round(angle)} aria-valuetext={`${Math.round(angle)} degrees`}
        aria-disabled={disabled || undefined} tabIndex={disabled ? -1 : 0} onKeyDown={disabled ? undefined : onKey}
        onPointerDown={disabled ? undefined : (event) => { event.currentTarget.setPointerCapture(event.pointerId); drag(event); }} onPointerMove={disabled ? undefined : (event) => { if (event.buttons === 1) drag(event); }}
      >
        <circle className="gl-angle-slider__ring" cx="50" cy="50" r="46" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = point(i * 30, 46);
          const b = point(i * 30, i % 3 === 0 ? 38 : 42);
          return <line key={i} className="gl-angle-slider__tick" x1={a.x} y1={a.y} x2={b.x} y2={b.y} />;
        })}
        <line className="gl-angle-slider__hand" x1="50" y1="50" x2={tip.x} y2={tip.y} />
        <circle className="gl-angle-slider__pivot" cx="50" cy="50" r="2" />
        <circle className="gl-angle-slider__knob" cx={tip.x} cy={tip.y} r="5" />
      </svg>
      {showInput && (
        <Input type="number" aria-label={`${ariaLabel} in degrees`} className="gl-angle-slider__field" min={0} max={359} step={step} disabled={disabled} value={Math.round(angle)} leading="°" onChange={(event) => set(Number(event.target.value || 0))} />
      )}
    </span>
  );
}
