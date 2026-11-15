import type { ReactNode } from 'react';
import { Heading, Text } from '../atoms';
import { Breadcrumb, type Crumb } from '../molecules';
import { cx } from '../utils/cx';
import './PageHeader.css';

export interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  breadcrumb?: Crumb[];
  /** Tags shown after the title: status, version. */
  meta?: ReactNode;
  /** Buttons on the right. */
  actions?: ReactNode;
  /** A strip under the header, usually Tabs. */
  children?: ReactNode;
  className?: string;
}

/** The top of a page: where you are, what it is, what you can do. */
export function PageHeader({ title, description, breadcrumb, meta, actions, children, className }: PageHeaderProps) {
  return (
    <header className={cx('gl-page-header', className)}>
      <div className="gl-page-header__main">
        <div className="gl-page-header__text">
          {breadcrumb != null && <Breadcrumb items={breadcrumb} />}
          <div className="gl-page-header__title">
            <Heading level={1} size="xl">{title}</Heading>
            {meta}
          </div>
          {description != null && <Text tone="muted">{description}</Text>}
        </div>
        {actions != null && <div className="gl-page-header__actions">{actions}</div>}
      </div>
      {children}
    </header>
  );
}
