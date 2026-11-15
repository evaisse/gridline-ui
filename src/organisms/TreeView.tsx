import { useState, type ReactNode } from 'react';
import { Label } from '../atoms';
import { ChevronRightIcon } from '../tokens/icons';
import { cx } from '../utils/cx';
import './TreeView.css';

export interface TreeNode {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  /** Shown at the end of the row: a count, a size. */
  meta?: ReactNode;
  children?: TreeNode[];
}

export interface TreeViewProps {
  nodes: TreeNode[];
  /** Ids of the branches open at first. */
  defaultExpanded?: string[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  'aria-label'?: string;
  className?: string;
}

/** A nested list with branches that open and close. The selected row inverts. */
export function TreeView({ nodes, defaultExpanded = [], selectedId, onSelect, className, ...rest }: TreeViewProps) {
  const [expanded, setExpanded] = useState(() => new Set(defaultExpanded));
  const toggle = (id: string) => setExpanded((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });

  const render = (list: TreeNode[], depth: number): ReactNode =>
    list.map((node) => {
      const branch = node.children != null && node.children.length > 0;
      const open = branch && expanded.has(node.id);
      return (
        <li key={node.id} role="treeitem" aria-expanded={branch ? open : undefined} aria-selected={node.id === selectedId}>
          <button
            type="button" className="gl-tree__row" data-selected={node.id === selectedId || undefined} style={{ paddingLeft: 12 + depth * 16 }}
            onClick={() => { if (branch) toggle(node.id); onSelect?.(node.id); }}
          >
            <span className="gl-tree__chevron" data-open={open || undefined}>{branch && <ChevronRightIcon width={12} height={12} />}</span>
            {node.icon != null && <span className="gl-tree__icon" aria-hidden="true">{node.icon}</span>}
            <span className="gl-tree__label">{node.label}</span>
            {node.meta != null && <Label tone="inherit" size="xs" className="gl-tree__meta">{node.meta}</Label>}
          </button>
          {open && <ul role="group">{render(node.children!, depth + 1)}</ul>}
        </li>
      );
    });

  return <ul role="tree" className={cx('gl-tree', className)} {...rest}>{render(nodes, 0)}</ul>;
}
