import { useState, type KeyboardEvent, type PointerEvent } from 'react';
import { Button, ColorSwatch, Input, Popover, PopoverContent, PopoverTrigger, Slider } from '../../atoms';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './ColorPicker.css';

type Rgb = [number, number, number];
interface Hsv { h: number; s: number; v: number }

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/** Builds a hex colour string from 0-255 red, green and blue channels. */
export function colorFromRgb(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((c) => clamp(Math.round(c), 0, 255).toString(16).padStart(2, '0')).join('')}`;
}

function parseColor(input: string): Rgb | null {
  const text = input.trim().toLowerCase();
  if (text.startsWith('rgb')) {
    const nums = text.match(/\d+(\.\d+)?/g);
    if (!nums || nums.length < 3) return null;
    return [0, 1, 2].map((i) => clamp(Math.round(Number(nums[i])), 0, 255)) as Rgb;
  }
  const digits = text.startsWith('#') ? text.slice(1) : text;
  if (!/^[0-9a-f]+$/.test(digits)) return null;
  let full: string | null = null;
  if (digits.length === 3 || digits.length === 4) full = digits.slice(0, 3).split('').map((c) => c + c).join('');
  else if (digits.length === 6 || digits.length === 8) full = digits.slice(0, 6);
  if (!full) return null;
  return [0, 2, 4].map((i) => parseInt((full as string).slice(i, i + 2), 16)) as Rgb;
}

function rgbToHsv([r, g, b]: Rgb): Hsv {
  const [rn, gn, bn] = [r / 255, g / 255, b / 255];
  const max = Math.max(rn, gn, bn);
  const d = max - Math.min(rn, gn, bn);
  let h = 0;
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
  }
  return { h: Math.round(((h * 60) + 360) % 360), s: max === 0 ? 0 : d / max, v: max };
}

function hsvToRgb({ h, s, v }: Hsv): Rgb {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return (v - v * s * Math.max(0, Math.min(k, 4 - k, 1))) * 255;
  };
  return [f(5), f(3), f(1)];
}

const hsvToHex = (hsv: Hsv) => colorFromRgb(...hsvToRgb(hsv));
const toHsv = (value: string): Hsv => rgbToHsv(parseColor(value) ?? [0, 0, 0]);
const normalise = (value: string) => { const rgb = parseColor(value); return rgb ? colorFromRgb(...rgb) : colorFromRgb(0, 0, 0); };

export interface ColorPickerProps {
  /** The colour as a hex string. `rgb()` strings are accepted and returned as hex. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Preset colours shown under the area, as hex or `rgb()` strings. */
  swatches?: string[];
  disabled?: boolean;
  /** Accessible name of the trigger. */
  'aria-label'?: string;
  className?: string;
}

/** A colour field that opens a saturation/brightness area, a hue slider, a hex input and optional swatches. */
export function ColorPicker({ value, defaultValue, onChange, swatches, disabled, 'aria-label': ariaLabel = 'Colour', className }: ColorPickerProps) {
  const [raw, setRaw] = useControlled(value === undefined ? undefined : normalise(value), normalise(defaultValue ?? colorFromRgb(38, 99, 235)), onChange);
  const hex = raw;
  const [kept, setKept] = useState<Hsv>(() => toHsv(hex));
  // Keep the hue the user chose while the colour is grey or black; follow outside changes otherwise.
  const hsv = hsvToHex(kept) === hex ? kept : toHsv(hex);
  const [draft, setDraft] = useState<string | null>(null);

  const apply = (next: Hsv) => { setKept(next); setRaw(hsvToHex(next)); };
  const move = (event: PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    apply({ ...hsv, s: clamp((event.clientX - box.left) / box.width, 0, 1), v: 1 - clamp((event.clientY - box.top) / box.height, 0, 1) });
  };
  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 0.1 : 0.01;
    const delta: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, step], ArrowDown: [0, -step] };
    const d = delta[event.key];
    if (!d) return;
    event.preventDefault();
    apply({ ...hsv, s: clamp(hsv.s + d[0], 0, 1), v: clamp(hsv.v + d[1], 0, 1) });
  };
  const hueRgb = hsvToRgb({ h: hsv.h, s: 1, v: 1 }).map(Math.round).join(' ');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={cx('gl-color-picker', className)} disabled={disabled} aria-label={`${ariaLabel}: ${hex}`} icon={<ColorSwatch size="sm" color={hex} label={hex} />}>{hex}</Button>
      </PopoverTrigger>
      <PopoverContent className="gl-color-picker__panel">
        <div
          className="gl-color-picker__area" role="slider" tabIndex={0} aria-label="Saturation and brightness" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(hsv.s * 100)}
          aria-valuetext={`Saturation ${Math.round(hsv.s * 100)}%, brightness ${Math.round(hsv.v * 100)}%`}
          style={{ background: `linear-gradient(to top, rgb(0 0 0), rgb(0 0 0 / 0)), linear-gradient(to right, rgb(255 255 255), rgb(${hueRgb}))` }}
          onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); move(event); }}
          onPointerMove={(event) => { if (event.buttons === 1) move(event); }} onKeyDown={onKey}
        >
          <span className="gl-color-picker__thumb" style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%` }} />
        </div>
        <Slider min={0} max={360} step={1} value={[hsv.h]} onValueChange={([h]) => apply({ ...hsv, h })} thumbLabels={['Hue']} />
        <Input
          aria-label="Hex colour" spellCheck={false} value={draft ?? hex} leading={<ColorSwatch size="sm" color={hex} label={hex} />} className="gl-color-picker__hex"
          onChange={(event) => { setDraft(event.target.value); const rgb = parseColor(event.target.value); if (rgb) apply(rgbToHsv(rgb)); }} onBlur={() => setDraft(null)}
        />
        {swatches && swatches.length > 0 && (
          <div className="gl-color-picker__swatches" role="group" aria-label="Preset colours">
            {swatches.map((swatch) => {
              const swatchHex = normalise(swatch);
              return (
                <button key={swatch} type="button" className="gl-color-picker__swatch" aria-label={swatchHex} aria-pressed={swatchHex === hex} onClick={() => apply(toHsv(swatchHex))}>
                  <ColorSwatch size="sm" color={swatchHex} label={swatchHex} />
                </button>
              );
            })}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
