import type { ReactNode } from 'react';
import { Frame, Label, Section } from '../atoms';
import { cx } from '../utils/cx';
import './IndexTemplate.css';

export interface IndexTemplateProps {
  /** Hero content: heading and introduction. */
  hero: ReactNode;
  /** Sidebar, usually a CategoryNav organism. */
  nav: ReactNode;
  /** Title of the inverted band above the grid. */
  bandTitle: string;
  /** The catalogue grid. */
  children: ReactNode;
  className?: string;
}

/** A hero, then a ruled sidebar beside a grid of entries. */
export function IndexTemplate({ hero, nav, bandTitle, children, className }: IndexTemplateProps) {
  return (
    <Frame className={cx('gl-index', className)}>
      <Section pad="lg"><div className="gl-index__hero">{hero}</div></Section>
      <Section pad="none" tone="invert" className="gl-index__band">
        <Label tone="inherit">{bandTitle}</Label>
      </Section>
      <div className="gl-index__body">
        <aside className="gl-index__nav">{nav}</aside>
        <div className="gl-index__main">{children}</div>
      </div>
    </Frame>
  );
}
