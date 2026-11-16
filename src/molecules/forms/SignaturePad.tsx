import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { XIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import './SignaturePad.css';

export interface SignaturePadProps {
  /** Called with a PNG data URL after each stroke, and with `null` when cleared. */
  onChange?: (dataUrl: string | null) => void;
  /** Accessible name of the drawing surface. */
  'aria-label'?: string;
  /** Canvas height in CSS pixels. The width follows the container. */
  height?: number;
  disabled?: boolean;
  className?: string;
}

/** A canvas that captures a hand-drawn signature with mouse, touch or pen; the stroke uses the `--gl-ink` colour. */
export function SignaturePad({ onChange, 'aria-label': ariaLabel = 'Signature', height = 160, disabled, className }: SignaturePadProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [signed, setSigned] = useState(false);

  // Match the backing store to the displayed size so strokes stay sharp.
  useEffect(() => {
    const node = canvas.current;
    if (!node) return;
    const fit = () => {
      const ratio = window.devicePixelRatio || 1;
      const { width, height: h } = node.getBoundingClientRect();
      if (node.width === Math.round(width * ratio) && node.height === Math.round(h * ratio)) return;
      node.width = Math.round(width * ratio);
      node.height = Math.round(h * ratio);
      setSigned(false);
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const point = (event: PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = event.currentTarget.width / rect.width;
    return { x: (event.clientX - rect.left) * ratio, y: (event.clientY - rect.top) * ratio, ratio };
  };
  const start = (event: PointerEvent<HTMLCanvasElement>) => {
    const context = event.currentTarget.getContext('2d');
    if (disabled || !context) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const { x, y, ratio } = point(event);
    context.strokeStyle = getComputedStyle(event.currentTarget).getPropertyValue('--gl-ink').trim() || 'currentColor';
    context.lineWidth = 2 * ratio;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + 0.01, y);
    context.stroke();
    drawing.current = true;
  };
  const move = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const context = event.currentTarget.getContext('2d');
    const { x, y } = point(event);
    context?.lineTo(x, y);
    context?.stroke();
  };
  const end = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    drawing.current = false;
    setSigned(true);
    onChange?.(event.currentTarget.toDataURL('image/png'));
  };
  const clear = () => {
    const node = canvas.current;
    node?.getContext('2d')?.clearRect(0, 0, node.width, node.height);
    setSigned(false);
    onChange?.(null);
  };

  return (
    <div className={cx('gl-signature-pad', disabled && 'gl-signature-pad--disabled', className)}>
      <canvas
        ref={canvas} role="img" aria-label={ariaLabel} className="gl-signature-pad__canvas" style={{ height }}
        onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end}
      />
      <div className="gl-signature-pad__foot">
        <span className="gl-signature-pad__hint">{signed ? 'Signed' : 'Sign above'}</span>
        <button type="button" className="gl-signature-pad__clear" disabled={disabled || !signed} onClick={clear}><XIcon />Clear</button>
      </div>
    </div>
  );
}
