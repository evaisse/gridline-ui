import { useRef, type KeyboardEvent, type PointerEvent } from 'react';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import { Image } from './Image';
import './ImageCropper.css';

/** A crop rectangle in percent of the picture: origin at the top left, 0 to 100 on both axes. */
export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ImageCropperProps {
  src: string;
  alt: string;
  value?: CropArea;
  defaultValue?: CropArea;
  onChange?: (area: CropArea) => void;
  /** Width over height of the crop, such as `1` or `16 / 9`. Free-form when omitted. */
  aspect?: number;
  /** Smallest crop width or height, in percent. */
  minSize?: number;
  /** CSS aspect ratio of the frame showing the picture. */
  ratio?: string;
  className?: string;
}

type Handle = 'move' | 'nw' | 'ne' | 'sw' | 'se';
const HANDLES: Handle[] = ['nw', 'ne', 'sw', 'se'];
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/** Drag or resize a crop rectangle over a picture; reports percentages, it does not cut pixels. */
export function ImageCropper({ src, alt, value, defaultValue = { x: 15, y: 15, width: 70, height: 70 }, onChange, aspect, minSize = 10, ratio = '16 / 10', className }: ImageCropperProps) {
  const [area, setArea] = useControlled(value, defaultValue, onChange);
  const frame = useRef<HTMLDivElement>(null);
  const drag = useRef<{ handle: Handle; px: number; py: number; start: CropArea } | null>(null);

  const resize = (start: CropArea, handle: Exclude<Handle, 'move'>, dx: number, dy: number): CropArea => {
    // Anchor is the corner opposite to the handle; the dragged corner follows the pointer.
    const ax = handle.includes('w') ? start.x + start.width : start.x;
    const ay = handle.includes('n') ? start.y + start.height : start.y;
    let cx_ = (handle.includes('w') ? start.x : start.x + start.width) + dx;
    let cy_ = (handle.includes('n') ? start.y : start.y + start.height) + dy;
    cx_ = clamp(cx_, 0, 100);
    cy_ = clamp(cy_, 0, 100);
    let width = Math.max(minSize, Math.abs(cx_ - ax));
    let height = Math.max(minSize, Math.abs(cy_ - ay));
    const box = frame.current?.getBoundingClientRect();
    if (aspect && box) {
      const k = box.width / box.height; // percent units differ per axis
      height = Math.max(minSize, width * k / aspect);
      width = height * aspect / k;
    }
    const dirX = handle.includes('w') ? -1 : 1;
    const dirY = handle.includes('n') ? -1 : 1;
    const maxW = dirX < 0 ? ax : 100 - ax;
    const maxH = dirY < 0 ? ay : 100 - ay;
    const fit = Math.min(1, maxW / width, maxH / height);
    width *= fit; height *= fit;
    return { x: dirX < 0 ? ax - width : ax, y: dirY < 0 ? ay - height : ay, width, height };
  };

  const begin = (event: PointerEvent<HTMLElement>, handle: Handle) => {
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { handle, px: event.clientX, py: event.clientY, start: area };
  };
  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const state = drag.current;
    const box = frame.current?.getBoundingClientRect();
    if (!state || !box || box.width === 0 || box.height === 0) return;
    const dx = ((event.clientX - state.px) / box.width) * 100;
    const dy = ((event.clientY - state.py) / box.height) * 100;
    if (state.handle === 'move') setArea({ ...state.start, x: clamp(state.start.x + dx, 0, 100 - state.start.width), y: clamp(state.start.y + dy, 0, 100 - state.start.height) });
    else setArea(resize(state.start, state.handle, dx, dy));
  };
  const onKeyDown = (event: KeyboardEvent) => {
    const step = event.shiftKey ? 5 : 1;
    const delta = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[event.key];
    if (!delta) return;
    event.preventDefault();
    if (event.altKey) setArea(resize(area, 'se', delta[0], delta[1]));
    else setArea({ ...area, x: clamp(area.x + delta[0], 0, 100 - area.width), y: clamp(area.y + delta[1], 0, 100 - area.height) });
  };

  const pct = (n: number) => `${n}%`;
  return (
    <div className={cx('gl-image-cropper', className)}>
      <div ref={frame} className="gl-image-cropper__frame" style={{ aspectRatio: ratio, ['--gl-cx' as string]: pct(area.x), ['--gl-cy' as string]: pct(area.y), ['--gl-cw' as string]: pct(area.width), ['--gl-ch' as string]: pct(area.height) }}>
        <Image src={src} alt={alt} ratio={ratio} className="gl-image-cropper__image" />
        <div className="gl-image-cropper__mask" aria-hidden="true" />
        <div
          role="group" tabIndex={0} aria-label="Crop area. Arrow keys move it, Alt plus arrows resize it."
          className="gl-image-cropper__box" style={{ left: pct(area.x), top: pct(area.y), width: pct(area.width), height: pct(area.height) }}
          onKeyDown={onKeyDown} onPointerDown={(event) => begin(event, 'move')} onPointerMove={onPointerMove} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}
        >
          {HANDLES.map((handle) => (
            <span
              key={handle} aria-hidden="true" className={cx('gl-image-cropper__handle', `gl-image-cropper__handle--${handle}`)}
              onPointerDown={(event) => begin(event, handle)}
            />
          ))}
        </div>
      </div>
      <output className="gl-image-cropper__readout" aria-live="polite">
        x {Math.round(area.x)}% · y {Math.round(area.y)}% · w {Math.round(area.width)}% · h {Math.round(area.height)}%
      </output>
    </div>
  );
}
