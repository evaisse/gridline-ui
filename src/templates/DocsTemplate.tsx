import type { ReactNode } from 'react';
import { Frame } from '../atoms';
import { cx } from '../utils/cx';
import './DocsTemplate.css';

export interface DocsTemplateProps {
  /** The top bar, usually a TopBar. */
  header?: ReactNode;
  /** The table of documents, usually a TreeView. */
  nav: ReactNode;
  /** The article. */
  children: ReactNode;
  /** "On this page": links to the article's headings. Hidden on narrow screens. */
  toc?: ReactNode;
  /** Previous and next links under the article. */
  footer?: ReactNode;
  className?: string;
}

/** A documentation page: documents on the left, the article in the middle, its outline on the right. */
export function DocsTemplate({ header, nav, children, toc, footer, className }: DocsTemplateProps) {
  return (
    <Frame className={cx('gl-docs', className)}>
      {header}
      <div className={cx('gl-docs__body', toc != null && 'gl-docs__body--toc')}>
        <nav className="gl-docs__nav" aria-label="Documents">{nav}</nav>
        <main className="gl-docs__main">
          <article className="gl-docs__article">{children}</article>
          {footer != null && <footer className="gl-docs__footer">{footer}</footer>}
        </main>
        {toc != null && <aside className="gl-docs__toc" aria-label="On this page">{toc}</aside>}
      </div>
    </Frame>
  );
}
