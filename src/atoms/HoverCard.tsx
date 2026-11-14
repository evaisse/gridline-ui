import { HoverCard as Base } from 'radix-ui';
import type { ComponentProps } from 'react';
import { cx } from '../utils/cx';
import '../tokens/overlay.css';
import './Popover.css';

export const HoverCard = Base.Root;
export const HoverCardTrigger = Base.Trigger;

export function HoverCardContent({ className, sideOffset = 6, ...rest }: ComponentProps<typeof Base.Content>) {
  return (
    <Base.Portal>
      <Base.Content sideOffset={sideOffset} className={cx('gl-pop gl-popover', className)} {...rest} />
    </Base.Portal>
  );
}
