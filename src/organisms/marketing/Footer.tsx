import type { ReactNode } from 'react';
import { Label, Text } from '../../atoms';
import { cx } from '../../utils/cx';
import './Footer.css';

export interface FooterLink {
  label: ReactNode;
  href: string;
}

export interface FooterColumn {
  title: ReactNode;
  links: FooterLink[];
}

export interface FooterProps {
  /** The name or mark at the start of the first column. */
  brand: ReactNode;
  /** A short line under the brand. */
  note?: ReactNode;
  columns: FooterColumn[];
  /** The small print along the bottom: copyright, terms. */
  legal?: ReactNode;
  className?: string;
}

/** The bottom of a public page: brand and note, ruled link columns and a legal line. */
export function Footer({ brand, note, columns, legal, className }: FooterProps) {
  return (
    <footer className={cx('gl-footer', className)}>
      <div className="gl-footer__main">
        <div className="gl-footer__brand">
          <Label tone="ink">{brand}</Label>
          {note != null && <Text variant="small" tone="muted">{note}</Text>}
        </div>
        {columns.map((column, i) => (
          <nav key={i} className="gl-footer__column" aria-label={typeof column.title === 'string' ? column.title : undefined}>
            <Label>{column.title}</Label>
            <ul className="gl-footer__links">
              {column.links.map((link, j) => <li key={j}><a href={link.href}>{link.label}</a></li>)}
            </ul>
          </nav>
        ))}
      </div>
      {legal != null && <div className="gl-footer__legal"><Label size="xs">{legal}</Label></div>}
    </footer>
  );
}
