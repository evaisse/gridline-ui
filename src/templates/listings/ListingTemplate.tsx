import type { ReactNode } from 'react';
import { Frame } from '../../atoms';
import { cx } from '../../utils/cx';
import './ListingTemplate.css';

export interface ListingTemplateProps {
  /** A top bar above the listing: brand, search, cart. */
  nav?: ReactNode;
  /** The listing title and introduction. */
  header: ReactNode;
  /** Count, sort and view controls, usually a Toolbar. */
  toolbar?: ReactNode;
  /** The entries: a grid of cards or a list of rows. */
  children: ReactNode;
  /** Pagination and result count. */
  footer?: ReactNode;
  className?: string;
}

/** A product listing: title, a strip of controls, the entries edge to edge, then pagination. */
export function ListingTemplate({ nav, header, toolbar, children, footer, className }: ListingTemplateProps) {
  return (
    <Frame className={cx('gl-listing', className)}>
      {nav != null && <div className="gl-listing__nav">{nav}</div>}
      <header className="gl-listing__header">{header}</header>
      {toolbar}
      <main className="gl-listing__main">{children}</main>
      {footer != null && <footer className="gl-listing__footer">{footer}</footer>}
    </Frame>
  );
}
