import { Portal as Base } from 'radix-ui';
import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Portal.css';

export interface PortalProps {
  children?: ReactNode;
  /** Element to render into; defaults to `document.body`. */
  container?: Element | DocumentFragment | null;
  className?: string;
}

/** Renders children elsewhere in the document, by default at the end of `body`. */
export function Portal({ children, container, className }: PortalProps) {
  return (
    <Base.Root container={container} className={cx('gl-portal', className)}>
      {children}
    </Base.Root>
  );
}
