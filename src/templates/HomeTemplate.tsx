import type { ReactNode } from 'react';
import { Frame } from '../atoms';
import { cx } from '../utils/cx';
import './HomeTemplate.css';

export interface HomeTemplateProps {
  /** The top bar: brand, links and a call to action. */
  nav: ReactNode;
  /** Hero copy: heading, introduction and buttons. */
  hero: ReactNode;
  /** A figure beside the hero copy: a chart, a code block, a screenshot. */
  heroAside?: ReactNode;
  /** The page sections, stacked. Use Section atoms so each one is ruled. */
  children: ReactNode;
  /** The footer: link columns and legal line. */
  footer?: ReactNode;
  className?: string;
}

/** A marketing home page: sticky top bar, a two-column hero, stacked sections and a footer. */
export function HomeTemplate({ nav, hero, heroAside, children, footer, className }: HomeTemplateProps) {
  return (
    <Frame className={cx('gl-home', className)}>
      <div className="gl-home__nav">{nav}</div>
      <header className={cx('gl-home__hero', heroAside != null && 'gl-home__hero--split')}>
        <div className="gl-home__copy">{hero}</div>
        {heroAside != null && <div className="gl-home__figure">{heroAside}</div>}
      </header>
      <main>{children}</main>
      {footer != null && <footer className="gl-home__footer">{footer}</footer>}
    </Frame>
  );
}
