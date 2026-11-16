import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './StatGroup.css';

/** Lays Stat molecules side by side, wrapping to one column on narrow screens. */
export function StatGroup({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('gl-stat-group', className)} {...rest} />;
}
