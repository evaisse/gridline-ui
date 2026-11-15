import type { ReactNode } from 'react';
import { Button, Checkbox, Label } from '../atoms';
import { cx } from '../utils/cx';
import './FilterPanel.css';

export interface FilterOption {
  value: string;
  label: string;
  /** How many results carry this value. */
  count?: number;
}

export interface FilterGroup {
  id: string;
  title: string;
  options: FilterOption[];
}

/** Selected values by group id. */
export type FilterState = Record<string, string[]>;

export interface FilterPanelProps {
  groups: FilterGroup[];
  value: FilterState;
  onChange: (value: FilterState) => void;
  title?: string;
  /** Extra facets after the checkbox groups: a slider, a switch. Wrap each in FilterSection. */
  children?: ReactNode;
  className?: string;
}

/** One titled facet, ruled off from the next. */
export function FilterSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="gl-filter-panel__section">
      <Label tone="ink">{title}</Label>
      {children}
    </section>
  );
}

/** Facets for a result list: groups of checkboxes with counts, and a way to clear them all. */
export function FilterPanel({ groups, value, onChange, title = 'Filters', children, className }: FilterPanelProps) {
  const active = Object.values(value).reduce((total, list) => total + list.length, 0);
  const toggle = (group: string, option: string) => {
    const list = value[group] ?? [];
    onChange({ ...value, [group]: list.includes(option) ? list.filter((entry) => entry !== option) : [...list, option] });
  };

  return (
    <div className={cx('gl-filter-panel', className)}>
      <div className="gl-filter-panel__head">
        <Label>{title}{active > 0 && ` · ${active}`}</Label>
        <Button variant="ghost" size="sm" disabled={active === 0} onClick={() => onChange({})}>Clear all</Button>
      </div>
      {groups.map((group) => (
        <FilterSection key={group.id} title={group.title}>
          {group.options.map((option) => (
            <label key={option.value} className="gl-filter-panel__option">
              <Checkbox checked={(value[group.id] ?? []).includes(option.value)} onCheckedChange={() => toggle(group.id, option.value)} aria-label={option.label} />
              <span className="gl-filter-panel__label">{option.label}</span>
              {option.count != null && <Label size="xs">{option.count}</Label>}
            </label>
          ))}
        </FilterSection>
      ))}
      {children}
    </div>
  );
}
