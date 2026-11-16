import { Progress as Base } from 'radix-ui';
import type { ComponentProps } from 'react';
import { cx } from '../../utils/cx';
import './Progress.css';

export type ProgressProps = ComponentProps<typeof Base.Root>;

/** Task progress. For measurements among peers, use Meter. */
export function Progress({ value, max = 100, className, ...rest }: ProgressProps) {
  const pct = value == null ? 0 : (value / max) * 100;
  return (
    <Base.Root value={value} max={max} className={cx('gl-progress', className)} {...rest}>
      <Base.Indicator className="gl-progress__bar" style={{ width: `${pct}%` }} />
    </Base.Root>
  );
}
