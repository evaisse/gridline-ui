import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../../atoms';
import { ChevronDownIcon, ChevronRightIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './Cascader.css';

export interface CascaderOption {
  value: string;
  label: string;
  children?: CascaderOption[];
  disabled?: boolean;
}

export interface CascaderProps {
  options: CascaderOption[];
  /** The chosen path, one value per level, from the root down to a leaf. */
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  /** Text between the labels of the chosen path. */
  separator?: string;
  disabled?: boolean;
  'aria-label'?: string;
  className?: string;
}

function labelsOf(options: CascaderOption[], path: string[]): string[] {
  const out: string[] = [];
  let level: CascaderOption[] | undefined = options;
  for (const key of path) {
    const hit: CascaderOption | undefined = level?.find((option) => option.value === key);
    if (!hit) break;
    out.push(hit.label);
    level = hit.children;
  }
  return out;
}

/** Picks a value in a hierarchy, one column per level. Arrow keys move within a column, Right goes deeper, Left goes back. */
export function Cascader({ options, value, defaultValue = [], onChange, placeholder = 'Select…', separator = ' / ', disabled, className, 'aria-label': ariaLabel }: CascaderProps) {
  const [selected, setSelected] = useControlled(value, defaultValue, onChange);
  const [open, setOpen] = useState(false);
  const [trail, setTrail] = useState<string[]>(selected);
  const panelRef = useRef<HTMLDivElement>(null);
  const focusAt = useRef<{ column: number; value?: string } | null>(null);

  const columns: CascaderOption[][] = [options];
  for (const key of trail) {
    const kids = columns[columns.length - 1].find((option) => option.value === key)?.children;
    if (kids?.length) columns.push(kids); else break;
  }

  useEffect(() => {
    const target = focusAt.current;
    if (!open || !target) return;
    focusAt.current = null;
    const column = panelRef.current?.querySelectorAll<HTMLElement>('[role="listbox"]')[target.column];
    const items = Array.from(column?.querySelectorAll<HTMLElement>('[role="option"]') ?? []);
    (items.find((item) => item.dataset.value === target.value) ?? items.find((item) => item.tabIndex === 0) ?? items[0])?.focus();
  });

  const commit = (path: string[]) => { setSelected(path); setOpen(false); };
  const pick = (columnIndex: number, option: CascaderOption) => {
    if (option.disabled) return;
    const path = [...trail.slice(0, columnIndex), option.value];
    setTrail(path);
    if (!option.children?.length) commit(path);
  };

  const onKeyDown = (columnIndex: number) => (event: KeyboardEvent<HTMLDivElement>) => {
    const items = columns[columnIndex];
    const index = items.findIndex((option) => option.value === (trail[columnIndex] ?? items[0].value));
    const option = items[index];
    const go = (to: number) => { const next = items[Math.max(0, Math.min(items.length - 1, to))]; setTrail([...trail.slice(0, columnIndex), next.value]); focusAt.current = { column: columnIndex, value: next.value }; };
    if (event.key === 'ArrowDown') { event.preventDefault(); go(index + 1); }
    else if (event.key === 'ArrowUp') { event.preventDefault(); go(index - 1); }
    else if (event.key === 'ArrowRight' && option?.children?.length && !option.disabled) {
      event.preventDefault();
      setTrail([...trail.slice(0, columnIndex), option.value]);
      focusAt.current = { column: columnIndex + 1 };
    } else if (event.key === 'ArrowLeft' && columnIndex > 0) {
      event.preventDefault();
      focusAt.current = { column: columnIndex - 1, value: trail[columnIndex - 1] };
    } else if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); if (option) pick(columnIndex, option); }
  };

  const text = labelsOf(options, selected).join(separator);

  return (
    <Popover open={open} onOpenChange={(next) => { setOpen(next); if (next) { setTrail(selected); focusAt.current = { column: 0, value: selected[0] }; } }}>
      <PopoverTrigger className={cx('gl-cascader', className)} disabled={disabled} aria-label={ariaLabel} aria-haspopup="listbox" aria-expanded={open}>
        <span className={cx('gl-cascader__value', text === '' && 'gl-cascader__value--empty')}>{text === '' ? placeholder : text}</span>
        <ChevronDownIcon width={14} height={14} />
      </PopoverTrigger>
      <PopoverContent className="gl-cascader__panel">
        <div ref={panelRef} className="gl-cascader__columns">
          {columns.map((items, columnIndex) => (
            <div key={columnIndex} role="listbox" aria-label={`Level ${columnIndex + 1}`} className="gl-cascader__column" onKeyDown={onKeyDown(columnIndex)}>
              {items.map((option, optionIndex) => {
                const inTrail = trail[columnIndex] === option.value;
                const isChosen = selected[columnIndex] === option.value && selected.slice(0, columnIndex).every((key, i) => key === trail[i]);
                const roving = inTrail || (trail[columnIndex] === undefined && optionIndex === 0);
                return (
                  <div
                    key={option.value}
                    role="option"
                    data-value={option.value}
                    aria-selected={isChosen}
                    aria-disabled={option.disabled || undefined}
                    tabIndex={roving ? 0 : -1}
                    className={cx('gl-cascader__option', inTrail && 'gl-cascader__option--active')}
                    onClick={() => pick(columnIndex, option)}
                  >
                    <span className="gl-cascader__label">{option.label}</span>
                    {option.children?.length ? <ChevronRightIcon width={12} height={12} aria-hidden="true" /> : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
