import { useState } from 'react';
import type { KeyboardEvent, PointerEvent, ReactNode } from 'react';
import { IconButton } from '../../atoms';
import { GripIcon, XIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import './FloatingPanel.css';

export interface FloatingPanelProps {
  /** Shown in the draggable header and used as the accessible name. */
  title: string;
  children?: ReactNode;
  /** Initial top-left corner in pixels, relative to the viewport (or container when `contained`). */
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  minSize?: { width: number; height: number };
  /** Shows a close button in the header. */
  onClose?: () => void;
  /** Position inside the nearest positioned ancestor instead of the viewport. */
  contained?: boolean;
  className?: string;
}

type Drag = { kind: 'move' | 'resize'; px: number; py: number; a: number; b: number };

/** A window that can be dragged by its header and resized from its corner. */
export function FloatingPanel({ title, children, defaultPosition = { x: 48, y: 48 }, defaultSize = { width: 320, height: 240 }, minSize = { width: 200, height: 120 }, onClose, contained = false, className }: FloatingPanelProps) {
  const [pos, setPos] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [drag, setDrag] = useState<Drag | null>(null);

  const start = (kind: Drag['kind']) => (event: PointerEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest('button') && kind === 'move') return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDrag(kind === 'move' ? { kind, px: event.clientX, py: event.clientY, a: pos.x, b: pos.y } : { kind, px: event.clientX, py: event.clientY, a: size.width, b: size.height });
  };
  const move = (event: PointerEvent<HTMLElement>) => {
    const d = drag;
    if (!d) return;
    const dx = event.clientX - d.px;
    const dy = event.clientY - d.py;
    if (d.kind === 'move') setPos({ x: Math.max(0, d.a + dx), y: Math.max(0, d.b + dy) });
    else setSize({ width: Math.max(minSize.width, d.a + dx), height: Math.max(minSize.height, d.b + dy) });
  };
  const end = () => setDrag(null);

  const arrows = (kind: Drag['kind']) => (event: KeyboardEvent<HTMLElement>) => {
    const step = event.shiftKey ? 32 : 8;
    const delta: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    const d = delta[event.key];
    if (!d) return;
    event.preventDefault();
    if (kind === 'move') setPos((p) => ({ x: Math.max(0, p.x + d[0]), y: Math.max(0, p.y + d[1]) }));
    else setSize((s) => ({ width: Math.max(minSize.width, s.width + d[0]), height: Math.max(minSize.height, s.height + d[1]) }));
  };

  return (
    <section role="dialog" aria-label={title} className={cx('gl-floating-panel', contained && 'gl-floating-panel--contained', className)} style={{ left: pos.x, top: pos.y, width: size.width, height: size.height }}>
      <header className="gl-floating-panel__header" tabIndex={0} aria-label={`Move ${title}. Arrow keys move the panel.`} onPointerDown={start('move')} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onKeyDown={arrows('move')}>
        <GripIcon className="gl-floating-panel__grip" />
        <span className="gl-floating-panel__title">{title}</span>
        {onClose && <IconButton variant="ghost" size="sm" label={`Close ${title}`} icon={<XIcon />} onClick={onClose} />}
      </header>
      <div className="gl-floating-panel__body">{children}</div>
      <div className="gl-floating-panel__resize" role="separator" tabIndex={0} aria-label={`Resize ${title}. Arrow keys resize the panel.`} onPointerDown={start('resize')} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onKeyDown={arrows('resize')} />
    </section>
  );
}
