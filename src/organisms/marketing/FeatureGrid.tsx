import type { ReactNode } from 'react';
import { Heading, Label, Text } from '../../atoms';
import { cx } from '../../utils/cx';
import './FeatureGrid.css';

export interface Feature {
  /** A number or short label above the title, such as `01 · Measure`. */
  eyebrow?: ReactNode;
  title: ReactNode;
  text: ReactNode;
  icon?: ReactNode;
}

export interface FeatureGridProps {
  features: Feature[];
  /** The widest column count; cells wrap to fewer on narrow screens. */
  columns?: 2 | 3 | 4;
  className?: string;
}

/** Benefits in ruled cells that share their borders, each with an eyebrow, a title and a line. */
export function FeatureGrid({ features, columns = 3, className }: FeatureGridProps) {
  return (
    <ul className={cx('gl-feature-grid', `gl-feature-grid--${columns}`, className)}>
      {features.map((feature, i) => (
        <li key={i} className="gl-feature-grid__cell">
          {feature.icon != null && <span className="gl-feature-grid__icon" aria-hidden="true">{feature.icon}</span>}
          {feature.eyebrow != null && <Label>{feature.eyebrow}</Label>}
          <Heading level={3} size="lg">{feature.title}</Heading>
          <Text tone="muted">{feature.text}</Text>
        </li>
      ))}
    </ul>
  );
}
