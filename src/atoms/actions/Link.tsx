import type { AnchorHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './Link.css';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** `inline` underlines inside running text; `plain` shows the rule on hover only. */
  variant?: 'inline' | 'plain';
  /** Opens in a new tab and appends an arrow. */
  external?: boolean;
}

/** A text link. The underline is a hairline, never a colour change alone. */
export function Link({ variant = 'inline', external = false, className, children, ...rest }: LinkProps) {
  return (
    <a className={cx('gl-link', `gl-link--${variant}`, className)} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} {...rest}>
      {children}
      {external && <span className="gl-link__arrow" aria-hidden="true">↗</span>}
    </a>
  );
}
