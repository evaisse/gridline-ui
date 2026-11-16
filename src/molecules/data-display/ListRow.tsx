import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Label } from '../../atoms';
import { cx } from '../../utils/cx';
import './ListRow.css';

export interface ListRowProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Mono metadata in the first column: a date, an id, a rank. */
  meta?: ReactNode;
  icon?: ReactNode;
  trailing?: ReactNode;
  selected?: boolean;
}

/** One 40px row of a master list. Selected rows invert. */
export function ListRow({ meta, icon, trailing, selected = false, className, children, ...rest }: ListRowProps) {
  return (
    <button type="button" aria-current={selected || undefined} className={cx('gl-row', className)} {...rest}>
      {meta != null && <Label tone="inherit" className="gl-row__meta">{meta}</Label>}
      {icon != null && <span className="gl-row__icon" aria-hidden="true">{icon}</span>}
      <span className="gl-row__title">{children}</span>
      {trailing != null && <span className="gl-row__trailing">{trailing}</span>}
    </button>
  );
}
