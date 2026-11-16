import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './Dock.css';

export interface DockItem {
  id: string;
  label: string;
  icon: ReactNode;
  /** Renders a link instead of a button when given. */
  href?: string;
}

export interface DockProps {
  items: DockItem[];
  /** The id of the current destination. */
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  /** Accessible name of the navigation landmark. */
  label?: string;
  /** Pin to the nearest positioned ancestor instead of the viewport. */
  contained?: boolean;
  /** Hide the dock from 768px up, where a sidebar takes over. */
  mobileOnly?: boolean;
  className?: string;
}

/** A bar of destinations pinned to the bottom of the screen. */
export function Dock({ items, value, defaultValue, onChange, label = 'Primary', contained = false, mobileOnly = false, className }: DockProps) {
  const [current, setCurrent] = useControlled<string | undefined>(value, defaultValue ?? items[0]?.id, onChange as ((id: string | undefined) => void) | undefined);
  return (
    <nav aria-label={label} className={cx('gl-dock', contained && 'gl-dock--contained', mobileOnly && 'gl-dock--mobile-only', className)}>
      <ul className="gl-dock__list" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {items.map((item) => {
          const props = { className: 'gl-dock__item', 'aria-current': item.id === current ? ('page' as const) : undefined, onClick: () => setCurrent(item.id) };
          const body = (<><span className="gl-dock__icon">{item.icon}</span><span className="gl-dock__label">{item.label}</span></>);
          return <li key={item.id}>{item.href ? <a href={item.href} {...props}>{body}</a> : <button type="button" {...props}>{body}</button>}</li>;
        })}
      </ul>
    </nav>
  );
}
