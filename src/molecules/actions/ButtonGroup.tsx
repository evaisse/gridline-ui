import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './ButtonGroup.css';

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

/** Joins buttons so neighbours share one rule. */
export function ButtonGroup({ orientation = 'horizontal', className, ...rest }: ButtonGroupProps) {
  return <div role="group" className={cx('gl-button-group', `gl-button-group--${orientation}`, className)} {...rest} />;
}
