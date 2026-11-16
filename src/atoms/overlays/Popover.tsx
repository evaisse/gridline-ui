import { Popover as Base } from 'radix-ui';
import type { ComponentProps } from 'react';
import { cx } from '../../utils/cx';
import '../../tokens/overlay.css';
import './Popover.css';

export const Popover = Base.Root;
export const PopoverTrigger = Base.Trigger;
export const PopoverAnchor = Base.Anchor;
export const PopoverClose = Base.Close;

export function PopoverContent({ className, sideOffset = 6, align = 'start', ...rest }: ComponentProps<typeof Base.Content>) {
  return (
    <Base.Portal>
      <Base.Content sideOffset={sideOffset} align={align} className={cx('gl-pop gl-popover', className)} {...rest} />
    </Base.Portal>
  );
}
