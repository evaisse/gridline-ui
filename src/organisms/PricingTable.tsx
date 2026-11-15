import type { ReactNode } from 'react';
import { Heading, Label, Numeric, Tag } from '../atoms';
import { CheckIcon } from '../tokens/icons';
import { cx } from '../utils/cx';
import './PricingTable.css';

export interface PricingPlan {
  id: string;
  name: string;
  /** The amount, without currency. Use a dash for "on request". */
  price: string;
  currency?: string;
  /** The billing line under the price. */
  period?: string;
  description?: string;
  features: string[];
  /** The button. */
  action?: ReactNode;
  /** Tints the column and shows the badge. */
  featured?: boolean;
  badge?: string;
}

export interface PricingTableProps {
  plans: PricingPlan[];
  className?: string;
}

/** Plans side by side in ruled columns. One may be featured. */
export function PricingTable({ plans, className }: PricingTableProps) {
  return (
    <div className={cx('gl-pricing', className)}>
      {plans.map((plan) => (
        <section key={plan.id} className="gl-pricing__plan" data-featured={plan.featured || undefined}>
          <div className="gl-pricing__head">
            <Heading level={3} size="lg">{plan.name}</Heading>
            {plan.featured && <Tag tone="info">{plan.badge ?? 'Most chosen'}</Tag>}
          </div>
          <div className="gl-pricing__price">
            <Numeric variant="display" prefix={/\d/.test(plan.price) ? plan.currency ?? '$' : undefined}>{plan.price}</Numeric>
            {plan.period != null && <Label>{plan.period}</Label>}
          </div>
          {plan.description != null && <p className="gl-pricing__desc">{plan.description}</p>}
          <ul className="gl-pricing__features">
            {plan.features.map((feature) => <li key={feature}><CheckIcon width={14} height={14} />{feature}</li>)}
          </ul>
          {plan.action != null && <div className="gl-pricing__action">{plan.action}</div>}
        </section>
      ))}
    </div>
  );
}
