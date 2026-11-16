import type { ReactNode } from 'react';
import { Frame } from '../../atoms';
import { cx } from '../../utils/cx';
import './PricingTemplate.css';

export interface PricingTemplateProps {
  /** The top bar: brand, links and a call to action. */
  nav?: ReactNode;
  /** Heading, introduction and a billing toggle. */
  header: ReactNode;
  /** The plan cards side by side, usually PricingTable or PricingCard. */
  plans: ReactNode;
  /** A feature-by-plan comparison, usually a Table. */
  comparison?: ReactNode;
  /** Questions and answers, usually an Accordion. */
  faq?: ReactNode;
  /** The footer: link columns and legal line. */
  footer?: ReactNode;
  className?: string;
}

/** A pricing page: heading, plan cards, a feature comparison and frequently asked questions. */
export function PricingTemplate({ nav, header, plans, comparison, faq, footer, className }: PricingTemplateProps) {
  return (
    <Frame className={cx('gl-pricing', className)}>
      {nav != null && <div className="gl-pricing__nav">{nav}</div>}
      <header className="gl-pricing__header">{header}</header>
      <main>
        <section className="gl-pricing__plans" aria-label="Plans">{plans}</section>
        {comparison != null && <section className="gl-pricing__comparison" aria-label="Comparison">{comparison}</section>}
        {faq != null && <section className="gl-pricing__faq" aria-label="Questions">{faq}</section>}
      </main>
      {footer != null && <footer className="gl-pricing__footer">{footer}</footer>}
    </Frame>
  );
}
