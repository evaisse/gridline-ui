import type { HTMLAttributes } from 'react';
import { cx } from '../utils/cx';
import './Heading.css';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4;
  /** Visual size, independent of the semantic level. */
  size?: 'md' | 'lg' | 'xl' | '2xl';
}

const defaultSize = { 1: '2xl', 2: 'xl', 3: 'lg', 4: 'md' } as const;

/** Serif, regular weight. The only place the display face appears. */
export function Heading({ level = 2, size, className, ...rest }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag className={cx('gl-heading', `gl-heading--${size ?? defaultSize[level]}`, className)} {...rest} />;
}
