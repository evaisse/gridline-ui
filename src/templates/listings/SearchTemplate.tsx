import type { ReactNode } from 'react';
import { Frame } from '../../atoms';
import { cx } from '../../utils/cx';
import './SearchTemplate.css';

export interface SearchTemplateProps {
  /** The query: a search field, its button and scope tabs. */
  search: ReactNode;
  /** Facets, shown in a column on the left. */
  filters: ReactNode;
  /** Result count, active filters and sort order, above the results. */
  summary?: ReactNode;
  /** The results. */
  children: ReactNode;
  /** Pagination. */
  footer?: ReactNode;
  className?: string;
}

/** A search engine: the query on top, facets on the left, results on the right. */
export function SearchTemplate({ search, filters, summary, children, footer, className }: SearchTemplateProps) {
  return (
    <Frame className={cx('gl-search', className)}>
      <header className="gl-search__query">{search}</header>
      <div className="gl-search__body">
        <aside className="gl-search__filters" aria-label="Filters">{filters}</aside>
        <main className="gl-search__main">
          {summary != null && <div className="gl-search__summary">{summary}</div>}
          <div className="gl-search__results">{children}</div>
          {footer != null && <footer className="gl-search__footer">{footer}</footer>}
        </main>
      </div>
    </Frame>
  );
}
