import { Toggle as Base } from 'radix-ui';
import type { ComponentProps } from 'react';
import { cx } from '../../utils/cx';
import './Toggle.css';

export interface ToggleProps extends ComponentProps<typeof Base.Root> {
  size?: 'sm' | 'md';
}

/** A button that stays pressed. Pressed means inverted. */
export function Toggle({ size = 'md', className, ...rest }: ToggleProps) {
  return <Base.Root className={cx('gl-toggle', `gl-toggle--${size}`, className)} {...rest} />;
}
