import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './Center.css';

export interface CenterProps extends HTMLAttributes<HTMLDivElement> {
  /** Shrink to the child instead of filling the width. */
  inline?: boolean;
  /** Minimum height, any CSS length. */
  minHeight?: string | number;
}

/** Centres its child on both axes. */
export function Center({ inline = false, minHeight, className, style, ...rest }: CenterProps) {
  return <div className={cx('gl-center', inline && 'gl-center--inline', className)} style={minHeight === undefined ? style : { minHeight, ...style }} {...rest} />;
}
