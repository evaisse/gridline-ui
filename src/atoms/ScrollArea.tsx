import { ScrollArea as Base } from 'radix-ui';
import type { ComponentProps } from 'react';
import { cx } from '../utils/cx';
import './ScrollArea.css';

/** A scroll container with thin, square scrollbars. */
export function ScrollArea({ className, children, ...rest }: ComponentProps<typeof Base.Root>) {
  return (
    <Base.Root className={cx('gl-scroll', className)} {...rest}>
      <Base.Viewport className="gl-scroll__viewport">{children}</Base.Viewport>
      <Base.Scrollbar orientation="vertical" className="gl-scroll__bar"><Base.Thumb className="gl-scroll__thumb" /></Base.Scrollbar>
      <Base.Scrollbar orientation="horizontal" className="gl-scroll__bar"><Base.Thumb className="gl-scroll__thumb" /></Base.Scrollbar>
      <Base.Corner />
    </Base.Root>
  );
}
