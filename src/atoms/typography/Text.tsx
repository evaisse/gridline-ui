import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './Text.css';

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  /** `lead` uses the serif for introductory paragraphs. */
  variant?: 'body' | 'small' | 'lead';
  tone?: 'ink' | 'muted';
}

export function Text({ variant = 'body', tone = 'ink', className, ...rest }: TextProps) {
  return <p className={cx('gl-text', `gl-text--${variant}`, `gl-text--${tone}`, className)} {...rest} />;
}
