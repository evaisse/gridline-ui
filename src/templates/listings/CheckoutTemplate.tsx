import type { ReactNode } from 'react';
import { Frame } from '../../atoms';
import { cx } from '../../utils/cx';
import './CheckoutTemplate.css';

export interface CheckoutTemplateProps {
  /** The page title or a minimal brand bar. */
  header?: ReactNode;
  /** The order steps: contact, shipping, payment. Stack them as ruled sections. */
  children: ReactNode;
  /** The order summary: line items, totals, the pay button. */
  summary: ReactNode;
  /** Small print: terms, returns, support. */
  footer?: ReactNode;
  className?: string;
}

/** A checkout page: the steps of the order on the left, a sticky summary of it on the right. */
export function CheckoutTemplate({ header, children, summary, footer, className }: CheckoutTemplateProps) {
  return (
    <Frame className={cx('gl-checkout', className)}>
      {header != null && <header className="gl-checkout__header">{header}</header>}
      <div className="gl-checkout__body">
        <main className="gl-checkout__steps">{children}</main>
        <aside className="gl-checkout__summary" aria-label="Order summary"><div className="gl-checkout__sticky gl-region">{summary}</div></aside>
      </div>
      {footer != null && <footer className="gl-checkout__footer">{footer}</footer>}
    </Frame>
  );
}
