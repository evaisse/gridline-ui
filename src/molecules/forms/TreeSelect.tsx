import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { Checkbox, Popover, PopoverContent, PopoverTrigger, Tag } from '../../atoms';
import { CheckIcon, ChevronDownIcon, ChevronRightIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './TreeSelect.css';

export interface TreeSelectNode {
  value: string;
  label: string;
  children?: TreeSelectNode[];
  disabled?: boolean;
}

export interface TreeSelectProps {
  options: TreeSelectNode[];
  /** Selected node values. In single mode it holds zero or one entry. */
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  /** Allow several nodes; each row gets a checkbox and the panel stays open. */
  multiple?: boolean;
  placeholder?: string;
  /** Values of the branches that start open. */
  defaultExpanded?: string[];
  disabled?: boolean;
  'aria-label'?: string;
  className?: string;
}

interface Row { node: TreeSelectNode; level: number }

function findLabel(nodes: TreeSelectNode[], value: string): string | undefined {
  for (const node of nodes) {
    if (node.value === value) return node.label;
    const hit = node.children && findLabel(node.children, value);
    if (hit) return hit;
  }
  return undefined;
}

/** A select whose options form a tree. Arrow keys move, Right/Left open and close branches, Enter selects. */
export function TreeSelect({ options, value, defaultValue = [], onChange, multiple = false, placeholder = 'Select…', defaultExpanded = [], disabled, className, 'aria-label': ariaLabel }: TreeSelectProps) {
  const [selected, setSelected] = useControlled(value, defaultValue, onChange);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string[]>(defaultExpanded);
  const [active, setActive] = useState<string | undefined>(undefined);
  const treeRef = useRef<HTMLDivElement>(null);
  const focusNext = useRef(false);

  const rows = useMemo(() => {
    const out: Row[] = [];
    const walk = (nodes: TreeSelectNode[], level: number) => nodes.forEach((node) => {
      out.push({ node, level });
      if (node.children?.length && expanded.includes(node.value)) walk(node.children, level + 1);
    });
    walk(options, 1);
    return out;
  }, [options, expanded]);

  const current = active ?? selected[0] ?? rows[0]?.node.value;

  useEffect(() => {
    if (!open || !focusNext.current) return;
    focusNext.current = false;
    treeRef.current?.querySelector<HTMLElement>('[tabindex="0"]')?.focus();
  });

  const toggleExpand = (nodeValue: string, force?: boolean) => setExpanded((list) => {
    const isOpen = list.includes(nodeValue);
    const next = force ?? !isOpen;
    return next ? (isOpen ? list : [...list, nodeValue]) : list.filter((entry) => entry !== nodeValue);
  });

  const choose = (node: TreeSelectNode) => {
    if (node.disabled) return;
    if (multiple) setSelected(selected.includes(node.value) ? selected.filter((entry) => entry !== node.value) : [...selected, node.value]);
    else { setSelected([node.value]); setOpen(false); }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = rows.findIndex((row) => row.node.value === current);
    const row = rows[index];
    if (!row) return;
    const move = (to: number) => { const target = rows[Math.max(0, Math.min(rows.length - 1, to))]; setActive(target.node.value); focusNext.current = true; };
    const hasKids = Boolean(row.node.children?.length);
    const isOpen = expanded.includes(row.node.value);
    switch (event.key) {
      case 'ArrowDown': event.preventDefault(); move(index + 1); break;
      case 'ArrowUp': event.preventDefault(); move(index - 1); break;
      case 'Home': event.preventDefault(); move(0); break;
      case 'End': event.preventDefault(); move(rows.length - 1); break;
      case 'ArrowRight':
        event.preventDefault();
        if (hasKids && !isOpen) { toggleExpand(row.node.value, true); focusNext.current = true; } else if (hasKids) move(index + 1);
        break;
      case 'ArrowLeft': {
        event.preventDefault();
        if (hasKids && isOpen) { toggleExpand(row.node.value, false); focusNext.current = true; }
        else { const parent = [...rows.slice(0, index)].reverse().find((entry) => entry.level < row.level); if (parent) move(rows.indexOf(parent)); }
        break;
      }
      case 'Enter': case ' ': event.preventDefault(); choose(row.node); break;
    }
  };

  const labels = selected.map((entry) => ({ value: entry, label: findLabel(options, entry) ?? entry }));

  return (
    <Popover open={open} onOpenChange={(next) => { setOpen(next); if (next) focusNext.current = true; }}>
      <PopoverTrigger className={cx('gl-tree-select', className)} disabled={disabled} aria-label={ariaLabel} aria-haspopup="tree" aria-expanded={open}>
        <span className="gl-tree-select__value">
          {labels.length === 0 && <span className="gl-tree-select__placeholder">{placeholder}</span>}
          {multiple ? labels.map((entry) => <Tag key={entry.value}>{entry.label}</Tag>) : labels[0]?.label}
        </span>
        <ChevronDownIcon width={14} height={14} />
      </PopoverTrigger>
      <PopoverContent className="gl-tree-select__panel">
        <div ref={treeRef} role="tree" aria-label={ariaLabel ?? placeholder} aria-multiselectable={multiple || undefined} onKeyDown={onKeyDown}>
          {rows.map(({ node, level }) => {
            const hasKids = Boolean(node.children?.length);
            const isOpen = expanded.includes(node.value);
            const isSelected = selected.includes(node.value);
            return (
              <div
                key={node.value}
                role="treeitem"
                aria-level={level}
                aria-selected={isSelected}
                aria-expanded={hasKids ? isOpen : undefined}
                aria-disabled={node.disabled || undefined}
                tabIndex={node.value === current ? 0 : -1}
                className={cx('gl-tree-select__row', isSelected && !multiple && 'gl-tree-select__row--selected')}
                style={{ paddingInlineStart: `calc(var(--gl-space-2) + ${(level - 1) * 16}px)` }}
                onClick={() => { setActive(node.value); choose(node); }}
              >
                <span
                  className="gl-tree-select__twist"
                  aria-hidden="true"
                  onClick={hasKids ? (event) => { event.stopPropagation(); toggleExpand(node.value); } : undefined}
                >
                  {hasKids && <ChevronRightIcon width={12} height={12} className={cx(isOpen && 'gl-tree-select__twist--open')} />}
                </span>
                {multiple && <Checkbox tabIndex={-1} aria-hidden="true" checked={isSelected} disabled={node.disabled} />}
                <span className="gl-tree-select__label">{node.label}</span>
                {isSelected && !multiple && <CheckIcon width={12} height={12} />}
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
