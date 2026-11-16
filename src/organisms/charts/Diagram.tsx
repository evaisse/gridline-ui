import { useMemo, useRef, type KeyboardEvent, type ReactNode } from 'react';
import { Label } from '../../atoms';
import type { Tone } from '../../tokens/tone';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './Diagram.css';

export interface DiagramNode {
  id: string;
  label: ReactNode;
  /** A second line in the mono voice: a role, a status. */
  meta?: ReactNode;
  tone?: Tone;
  /** Position of the top-left corner in pixels. Used by `layout="manual"`. */
  x?: number;
  y?: number;
}

export interface DiagramEdge {
  from: string;
  to: string;
}

export interface DiagramProps {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  /** `tree` computes a tidy top-down layout from the edges; `manual` uses each node's `x` and `y`. */
  layout?: 'tree' | 'manual';
  nodeWidth?: number;
  nodeHeight?: number;
  /** The selected node id. Nodes are not selectable when neither this nor `onSelectedChange` is given. */
  selected?: string | null;
  defaultSelected?: string | null;
  onSelectedChange?: (id: string | null) => void;
  /** Accessible name of the diagram. */
  'aria-label'?: string;
  className?: string;
}

const GAP_X = 24;
const GAP_Y = 44;
const PAD = 16;

interface Box { x: number; y: number }

/** Tidy top-down tree: leaves take consecutive slots, parents sit centred above their children. */
function treeLayout(nodes: DiagramNode[], edges: DiagramEdge[], w: number, h: number): Map<string, Box> {
  const ids = new Set(nodes.map((n) => n.id));
  const children = new Map<string, string[]>();
  const hasParent = new Set<string>();
  for (const e of edges) {
    if (!ids.has(e.from) || !ids.has(e.to) || hasParent.has(e.to) || e.from === e.to) continue;
    hasParent.add(e.to);
    children.set(e.from, [...(children.get(e.from) ?? []), e.to]);
  }
  const out = new Map<string, Box>();
  let slot = 0;
  const place = (id: string, depth: number): number => {
    out.set(id, { x: 0, y: PAD + depth * (h + GAP_Y) });
    const kids = (children.get(id) ?? []).filter((k) => !out.has(k));
    let x: number;
    if (kids.length === 0) x = PAD + slot++ * (w + GAP_X);
    else {
      const xs = kids.map((k) => place(k, depth + 1));
      x = (xs[0] + xs[xs.length - 1]) / 2;
    }
    out.get(id)!.x = x;
    return x;
  };
  for (const n of nodes) if (!hasParent.has(n.id) && !out.has(n.id)) place(n.id, 0);
  for (const n of nodes) if (!out.has(n.id)) place(n.id, 0);
  return out;
}

/** An orthogonal connector from the bottom of `a` to the top of `b`, or side to side when `b` is not below. */
function connector(a: Box, b: Box, w: number, h: number): string {
  if (b.y >= a.y + h + 8) {
    const sx = a.x + w / 2, sy = a.y + h, tx = b.x + w / 2, ty = b.y, mid = sy + (ty - sy) / 2;
    return `M${sx} ${sy}V${mid}H${tx}V${ty}`;
  }
  const right = b.x >= a.x;
  const sx = right ? a.x + w : a.x, sy = a.y + h / 2, tx = right ? b.x : b.x + w, ty = b.y + h / 2, mid = sx + (tx - sx) / 2;
  return `M${sx} ${sy}H${mid}V${ty}H${tx}`;
}

/**
 * Nodes and orthogonal connectors: an organisation chart (`layout="tree"`) or a free
 * flowchart (`layout="manual"`). Nodes are buttons; arrow keys move along the edges.
 */
export function Diagram({ nodes, edges, layout = 'tree', nodeWidth = 168, nodeHeight = 56, selected, defaultSelected = null, onSelectedChange, className, 'aria-label': ariaLabel = 'Diagram' }: DiagramProps) {
  const [current, setCurrent] = useControlled<string | null>(selected, defaultSelected, onSelectedChange);
  const root = useRef<HTMLDivElement>(null);
  const selectable = selected !== undefined || onSelectedChange != null || defaultSelected != null;

  const boxes = useMemo(() => {
    if (layout === 'tree') return treeLayout(nodes, edges, nodeWidth, nodeHeight);
    return new Map(nodes.map((n) => [n.id, { x: n.x ?? 0, y: n.y ?? 0 }]));
  }, [layout, nodes, edges, nodeWidth, nodeHeight]);

  const all = [...boxes.values()];
  const width = Math.max(0, ...all.map((b) => b.x)) + nodeWidth + PAD * (layout === 'tree' ? 1 : 0);
  const height = Math.max(0, ...all.map((b) => b.y)) + nodeHeight + PAD * (layout === 'tree' ? 1 : 0);
  const paths = edges.flatMap((e, i) => {
    const a = boxes.get(e.from), b = boxes.get(e.to);
    return a && b ? [{ key: `${e.from}>${e.to}:${i}`, d: connector(a, b, nodeWidth, nodeHeight), on: current === e.from || current === e.to }] : [];
  });

  const focusNode = (id: string | undefined) => {
    if (id) root.current?.querySelector<HTMLElement>(`[data-node="${CSS.escape(id)}"]`)?.focus();
  };
  const onKey = (event: KeyboardEvent, id: string) => {
    const kids = edges.filter((e) => e.from === id).map((e) => e.to);
    const parent = edges.find((e) => e.to === id)?.from;
    const siblings = parent ? edges.filter((e) => e.from === parent).map((e) => e.to) : nodes.filter((n) => !edges.some((e) => e.to === n.id)).map((n) => n.id);
    const at = siblings.indexOf(id);
    const target = { ArrowDown: kids[0], ArrowUp: parent, ArrowLeft: siblings[at - 1], ArrowRight: siblings[at + 1] }[event.key as 'ArrowDown'];
    if (event.key in { ArrowDown: 1, ArrowUp: 1, ArrowLeft: 1, ArrowRight: 1 }) { event.preventDefault(); focusNode(target); }
  };

  return (
    <div className={cx('gl-diagram', className)}>
      <div ref={root} className="gl-diagram__canvas" style={{ width, height }} role="group" aria-label={ariaLabel}>
        <svg className="gl-diagram__edges" width={width} height={height} aria-hidden="true">
          {paths.map((p) => <path key={p.key} d={p.d} data-on={p.on || undefined} />)}
        </svg>
        {nodes.map((node) => {
          const box = boxes.get(node.id);
          if (!box) return null;
          const on = current === node.id;
          return (
            <button
              key={node.id} type="button" data-node={node.id} data-selected={on || undefined}
              className={cx('gl-diagram__node', `gl-tone--${node.tone ?? 'neutral'}`)}
              style={{ left: box.x, top: box.y, width: nodeWidth, height: nodeHeight }}
              aria-pressed={selectable ? on : undefined}
              onClick={() => selectable && setCurrent(on ? null : node.id)}
              onKeyDown={(event) => onKey(event, node.id)}
            >
              <span className="gl-diagram__label">{node.label}</span>
              {node.meta != null && <Label tone="inherit" size="xs" className="gl-diagram__meta">{node.meta}</Label>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
