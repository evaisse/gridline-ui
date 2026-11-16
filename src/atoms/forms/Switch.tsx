import { Switch as Base } from 'radix-ui';
import type { ComponentProps } from 'react';
import { cx } from '../../utils/cx';
import './Switch.css';

export type SwitchProps = ComponentProps<typeof Base.Root>;

/** A two-cell toggle: the filled cell slides, nothing is round. */
export function Switch({ className, ...rest }: SwitchProps) {
  return (
    <Base.Root className={cx('gl-switch', className)} {...rest}>
      <Base.Thumb className="gl-switch__thumb" />
    </Base.Root>
  );
}
