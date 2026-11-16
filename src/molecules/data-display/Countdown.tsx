import { useEffect, useState, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './Countdown.css';

export interface CountdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** The moment being counted down to. */
  target: Date | string | number;
  /** The reference moment. Fixing it freezes the display, which keeps stories deterministic. */
  now?: Date | string | number;
  /** Shown once the target has passed. */
  doneLabel?: string;
  /** Called once when the countdown reaches zero while mounted. */
  onComplete?: () => void;
}

const pad = (n: number) => String(n).padStart(2, '0');

/** Days, hours, minutes and seconds left until a moment, ticking every second. */
export function Countdown({ target, now, doneLabel = 'Ended', onComplete, className, ...rest }: CountdownProps) {
  const [tick, setTick] = useState(() => Date.now());
  const end = new Date(target).getTime();
  const left = Math.max(0, end - new Date(now ?? tick).getTime());
  const done = left === 0;

  useEffect(() => {
    if (now !== undefined || done) return undefined;
    const id = window.setInterval(() => setTick(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [now, done]);
  useEffect(() => { if (done && now === undefined) onComplete?.(); }, [done, now, onComplete]);

  const total = Math.floor(left / 1000);
  const parts: Array<[string, number]> = [['Days', Math.floor(total / 86400)], ['Hours', Math.floor(total / 3600) % 24], ['Minutes', Math.floor(total / 60) % 60], ['Seconds', total % 60]];
  if (Number.isNaN(end)) return <div className={cx('gl-countdown', className)} {...rest}>Invalid date</div>;
  if (done) return <div role="timer" className={cx('gl-countdown', 'gl-countdown--done', className)} {...rest}>{doneLabel}</div>;

  return (
    <div role="timer" aria-label={`${parts.map(([label, n]) => `${n} ${label.toLowerCase()}`).join(', ')} left`} className={cx('gl-countdown', className)} {...rest}>
      {parts.map(([label, n]) => (
        <div key={label} className="gl-countdown__cell" aria-hidden="true">
          <span className="gl-countdown__value">{pad(n)}</span>
          <span className="gl-countdown__label">{label}</span>
        </div>
      ))}
    </div>
  );
}
