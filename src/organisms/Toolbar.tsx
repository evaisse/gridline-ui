import type { HTMLAttributes } from 'react';
import { cx } from '../utils/cx';
import './Toolbar.css';

/** A 40px ruled strip. Children sit in cells divided by hairlines. */
export function Toolbar({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div role="toolbar" className={cx('gl-toolbar', className)} {...rest} />;
}

export interface ToolbarCellProps extends HTMLAttributes<HTMLDivElement> {
  /** Take the remaining width. */
  grow?: boolean;
  /** Remove padding so a `cell` variant control fills the cell. */
  flush?: boolean;
}

export function ToolbarCell({ grow = false, flush = false, className, ...rest }: ToolbarCellProps) {
  return <div className={cx('gl-toolbar__cell', grow && 'gl-toolbar__cell--grow', flush && 'gl-toolbar__cell--flush', className)} {...rest} />;
}
