import type { HTMLAttributes, ReactNode } from 'react';
import { IconButton } from '../../atoms';
import { XIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import './ActionBar.css';

export interface ActionBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** How many rows are selected. The bar is hidden at zero. */
  count: number;
  /** Called by the clear button. */
  onClear?: () => void;
  /** Noun for the count, e.g. "package". Pluralised with an s. */
  noun?: string;
  /** Bulk action buttons. */
  children?: ReactNode;
  /** Stick to the bottom of the scroll container. */
  sticky?: boolean;
}

/** A bar that appears when rows are selected, with bulk actions. */
export function ActionBar({ count, onClear, noun = 'item', children, sticky = false, className, ...rest }: ActionBarProps) {
  if (count <= 0) return null;
  return (
    <div role="toolbar" aria-label="Bulk actions" className={cx('gl-action-bar', sticky && 'gl-action-bar--sticky', className)} {...rest}>
      <span className="gl-action-bar__count" aria-live="polite">{count} {noun}{count === 1 ? '' : 's'} selected</span>
      <div className="gl-action-bar__actions">{children}</div>
      {onClear && <IconButton variant="ghost" size="sm" label="Clear selection" icon={<XIcon />} onClick={onClear} className="gl-action-bar__clear" />}
    </div>
  );
}
