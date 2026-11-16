import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './AuthTemplate.css';

export interface AuthTemplateProps {
  /** The brand, top left. */
  brand?: ReactNode;
  /** The form, usually an AuthForm. */
  children: ReactNode;
  /** A panel beside the form: a claim, a quote, a figure. Hidden on narrow screens. */
  aside?: ReactNode;
  /** Small print under the form. */
  footer?: ReactNode;
  className?: string;
}

/** A sign-in screen: the form centred on one side, an optional panel on the other. */
export function AuthTemplate({ brand, children, aside, footer, className }: AuthTemplateProps) {
  return (
    <div className={cx('gl-auth', aside != null && 'gl-auth--split', className)}>
      <main className="gl-auth__main">
        {brand != null && <div className="gl-auth__brand">{brand}</div>}
        <div className="gl-auth__form">{children}</div>
        {footer != null && <div className="gl-auth__footer">{footer}</div>}
      </main>
      {aside != null && <aside className="gl-auth__aside">{aside}</aside>}
    </div>
  );
}
