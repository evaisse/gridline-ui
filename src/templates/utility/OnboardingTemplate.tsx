import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './OnboardingTemplate.css';

export interface OnboardingTemplateProps {
  /** The brand, top left. */
  brand?: ReactNode;
  /** Progress through the questions, usually Steps. */
  steps?: ReactNode;
  /** The current question: a heading and its fields. */
  children: ReactNode;
  /** Back, continue and skip buttons. */
  footer: ReactNode;
  className?: string;
}

/** First-run setup: a brand bar, a progress indicator and one question at a time, centred. */
export function OnboardingTemplate({ brand, steps, children, footer, className }: OnboardingTemplateProps) {
  return (
    <div className={cx('gl-onboarding', className)}>
      {brand != null && <header className="gl-onboarding__brand">{brand}</header>}
      {steps != null && <nav className="gl-onboarding__steps gl-region" aria-label="Progress">{steps}</nav>}
      <main className="gl-onboarding__main">
        <div className="gl-onboarding__question">{children}</div>
      </main>
      <footer className="gl-onboarding__footer">{footer}</footer>
    </div>
  );
}
