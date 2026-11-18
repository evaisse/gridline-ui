import type { ReactNode } from 'react';
import { Frame } from '../../atoms';
import { cx } from '../../utils/cx';
import './ArticleTemplate.css';

export interface ArticleTemplateProps {
  /** The top bar: brand and links. */
  nav?: ReactNode;
  /** Title block: kicker, title, author and date. */
  header: ReactNode;
  /** The article body, set in a readable measure. */
  children: ReactNode;
  /** Related links, contents or share actions beside the body. */
  aside?: ReactNode;
  /** Under the article: next read, newsletter, legal line. */
  footer?: ReactNode;
  className?: string;
}

/** A long read: title block, a readable column of body text and a column of related links. */
export function ArticleTemplate({ nav, header, children, aside, footer, className }: ArticleTemplateProps) {
  return (
    <Frame className={cx('gl-article', className)}>
      {nav != null && <div className="gl-article__nav">{nav}</div>}
      <header className="gl-article__header">{header}</header>
      <div className={cx('gl-article__body', aside != null && 'gl-article__body--aside')}>
        <main className="gl-article__main gl-region">{children}</main>
        {aside != null && <aside className="gl-article__aside gl-region" aria-label="Related">{aside}</aside>}
      </div>
      {footer != null && <footer className="gl-article__footer">{footer}</footer>}
    </Frame>
  );
}
