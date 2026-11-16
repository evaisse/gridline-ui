import type { ComponentType, HTMLAttributes, ReactNode, SVGProps } from 'react';
import { cx } from '../../utils/cx';
import type { Tone } from '../../tokens/tone';
import './Icon.css';

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** An icon component from `tokens/icons`, e.g. `SearchIcon`. */
  glyph?: ComponentType<SVGProps<SVGSVGElement>>;
  /** Alternative to `glyph`: any inline SVG element. */
  children?: ReactNode;
  /** 12, 16, 20 or 24 px. */
  size?: IconSize;
  /** Data tone; omit to inherit the surrounding text colour. */
  tone?: Tone;
  /** Accessible name. Without it the icon is decorative and hidden from assistive tech. */
  label?: string;
}

/** A glyph from the icon set at a named size and tone; decorative unless given a `label`. */
export function Icon({ glyph: Glyph, children, size = 'md', tone, label, className, ...rest }: IconProps) {
  const a11y = label ? { role: 'img' as const, 'aria-label': label } : { 'aria-hidden': true as const };
  return (
    <span className={cx('gl-icon', `gl-icon--${size}`, tone && `gl-tone--${tone}`, tone && 'gl-icon--toned', className)} {...a11y} {...rest}>
      {Glyph ? <Glyph /> : children}
    </span>
  );
}
