import { Separator as Base } from 'radix-ui';
import type { ComponentProps } from 'react';
import { cx } from '../../utils/cx';
import './Separator.css';

export interface SeparatorProps extends ComponentProps<typeof Base.Root> {
  strength?: 'faint' | 'strong';
}

/** A single hairline. The only divider Gridline has. */
export function Separator({ strength = 'faint', className, decorative = true, ...rest }: SeparatorProps) {
  return <Base.Root decorative={decorative} className={cx('gl-separator', `gl-separator--${strength}`, className)} {...rest} />;
}
