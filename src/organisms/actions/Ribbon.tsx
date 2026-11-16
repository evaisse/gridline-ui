import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { Label } from '../../atoms';
import { ChevronDownIcon, ChevronUpIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './Ribbon.css';

export interface RibbonCommand {
  id: string;
  label: string;
  icon?: ReactNode;
  /** `large` stacks the icon above the label; `small` sits in a column of three. Default `small`. */
  size?: 'large' | 'small';
  disabled?: boolean;
  /** Makes the command a toggle, drawn inverted while true. */
  pressed?: boolean;
}

export interface RibbonGroup {
  id: string;
  /** Printed under the group. */
  label: string;
  commands: RibbonCommand[];
}

export interface RibbonTab {
  id: string;
  label: string;
  groups: RibbonGroup[];
}

export interface RibbonProps {
  tabs: RibbonTab[];
  /** The active tab id. */
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  /** Show the tabs only. Choosing a tab then opens its commands until one is used. */
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Called with a command id when one is activated. */
  onCommand?: (id: string) => void;
  /** Accessible name of the ribbon. */
  'aria-label'?: string;
  className?: string;
}

/** Group commands into columns of three small ones, keeping large ones alone. */
function pack(commands: RibbonCommand[]): RibbonCommand[][] {
  const out: RibbonCommand[][] = [];
  for (const command of commands) {
    const tail = out[out.length - 1];
    if (command.size !== 'large' && tail && tail[0].size !== 'large' && tail.length < 3) tail.push(command);
    else out.push([command]);
  }
  return out;
}

/**
 * A tabbed command surface: tabs, each with labelled groups of large and small buttons.
 * Arrow keys, Home and End move between tabs; it can collapse to the tab strip.
 */
export function Ribbon({ tabs, value, defaultValue, onChange, collapsed, defaultCollapsed = false, onCollapsedChange, onCommand, className, 'aria-label': ariaLabel = 'Ribbon' }: RibbonProps) {
  const [active, setActive] = useControlled(value, defaultValue ?? tabs[0]?.id ?? '', onChange);
  const [shut, setShut] = useControlled(collapsed, defaultCollapsed, onCollapsedChange);
  const [peek, setPeek] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const open = !shut || peek;
  const tab = tabs.find((t) => t.id === active) ?? tabs[0];

  const choose = (id: string) => {
    if (shut) setPeek(id !== active || !peek);
    setActive(id);
  };
  const onKey = (event: KeyboardEvent, index: number) => {
    const to = { ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1 }[event.key as 'Home'];
    if (to != null) {
      event.preventDefault();
      setActive(tabs[to].id);
      list.current?.querySelectorAll<HTMLElement>('[role="tab"]')[to]?.focus();
    } else if (event.key === 'Escape' && peek) setPeek(false);
  };

  return (
    <div className={cx('gl-ribbon', className)} onKeyDown={(event) => { if (event.key === 'Escape') setPeek(false); }}>
      <div className="gl-ribbon__tabs" role="tablist" aria-label={ariaLabel} ref={list}>
        {tabs.map((t, i) => (
          <button
            key={t.id} type="button" role="tab" id={`gl-ribbon-tab-${t.id}`} className="gl-ribbon__tab" aria-selected={t.id === active} aria-controls="gl-ribbon-panel"
            tabIndex={t.id === active ? 0 : -1} data-open={(open && t.id === active) || undefined} onClick={() => choose(t.id)} onKeyDown={(event) => onKey(event, i)}
          >
            <Label tone="inherit">{t.label}</Label>
          </button>
        ))}
        <button type="button" className="gl-ribbon__collapse" aria-expanded={!shut} aria-label={shut ? 'Pin the ribbon open' : 'Collapse the ribbon'} onClick={() => { setShut(!shut); setPeek(false); }}>
          {shut ? <ChevronDownIcon aria-hidden="true" /> : <ChevronUpIcon aria-hidden="true" />}
        </button>
      </div>
      {open && tab && (
        <div className="gl-ribbon__panel" role="tabpanel" id="gl-ribbon-panel" aria-labelledby={`gl-ribbon-tab-${tab.id}`} data-floating={shut || undefined}>
          {tab.groups.map((group) => (
            <div key={group.id} className="gl-ribbon__group" role="group" aria-label={group.label}>
              <div className="gl-ribbon__commands">
                {pack(group.commands).map((column) => (
                  <div key={column[0].id} className="gl-ribbon__column">
                    {column.map((command) => (
                      <button
                        key={command.id} type="button" className={cx('gl-ribbon__command', command.size === 'large' && 'gl-ribbon__command--large')}
                        disabled={command.disabled} aria-pressed={command.pressed} onClick={() => { onCommand?.(command.id); setPeek(false); }}
                      >
                        {command.icon != null && <span className="gl-ribbon__icon" aria-hidden="true">{command.icon}</span>}
                        <span className="gl-ribbon__label">{command.label}</span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
              <Label size="xs" className="gl-ribbon__group-label">{group.label}</Label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
