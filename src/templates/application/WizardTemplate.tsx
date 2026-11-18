import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './WizardTemplate.css';

export interface WizardTemplateProps {
  /** Title and exit link, usually a PageHeader. */
  header?: ReactNode;
  /** The step list, usually Steps. */
  steps: ReactNode;
  /** The current step: its form fields. */
  children: ReactNode;
  /** Back, next and submit buttons. */
  footer?: ReactNode;
  /** Where the steps sit: above the form or in a column on its left. */
  stepsPosition?: 'top' | 'side';
  className?: string;
}

/** A multi-step form: the steps on top or on the side, one step of the form at a time, actions pinned underneath. */
export function WizardTemplate({ header, steps, children, footer, stepsPosition = 'top', className }: WizardTemplateProps) {
  return (
    <div className={cx('gl-wizard-page', `gl-wizard-page--${stepsPosition}`, className)}>
      {header != null && <header className="gl-wizard-page__header">{header}</header>}
      <div className="gl-wizard-page__body">
        <nav className="gl-wizard-page__steps gl-region" aria-label="Steps">{steps}</nav>
        <main className="gl-wizard-page__main">
          <div className="gl-wizard-page__step gl-region">{children}</div>
          {footer != null && <footer className="gl-wizard-page__footer">{footer}</footer>}
        </main>
      </div>
    </div>
  );
}
