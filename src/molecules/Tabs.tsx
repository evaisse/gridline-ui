import type { HTMLAttributes } from 'react';
import { Label } from '../atoms';
import { cx } from '../utils/cx';
import './Tabs.css';

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabItem[];
  value: string;
  onChange?: (id: string) => void;
  /** Stretch tabs to share the full width equally. */
  fill?: boolean;
}

/** Segmented cells. The active tab is a full inversion. */
export function Tabs({ items, value, onChange, fill = true, className, ...rest }: TabsProps) {
  return (
    <div role="tablist" className={cx('gl-tabs', fill && 'gl-tabs--fill', className)} {...rest}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={item.id === value}
          className="gl-tabs__tab"
          onClick={() => onChange?.(item.id)}
        >
          <Label tone="inherit">{item.label}</Label>
        </button>
      ))}
    </div>
  );
}
