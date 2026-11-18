import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './BoardTemplate.css';

export interface BoardTemplateProps {
  /** Title and actions, usually a PageHeader. */
  header: ReactNode;
  /** A row of filters above the board, usually a Toolbar or FilterBar. */
  filters?: ReactNode;
  /** The board itself, usually a Kanban. */
  children: ReactNode;
  /** A bar under the board: counts, legend. */
  footer?: ReactNode;
  className?: string;
}

/** A board page: a header, a row of filters, then a board that uses the full width and scrolls sideways on its own. */
export function BoardTemplate({ header, filters, children, footer, className }: BoardTemplateProps) {
  return (
    <div className={cx('gl-board', className)}>
      <header className="gl-board__header">{header}</header>
      {filters != null && <div className="gl-board__filters gl-region" role="group" aria-label="Filters">{filters}</div>}
      <main className="gl-board__main">{children}</main>
      {footer != null && <footer className="gl-board__footer">{footer}</footer>}
    </div>
  );
}
