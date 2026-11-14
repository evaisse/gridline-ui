import { Avatar as Base } from 'radix-ui';
import { cx } from '../utils/cx';
import './Avatar.css';

export interface AvatarProps {
  src?: string;
  alt?: string;
  /** Initials or a glyph shown when there is no image. */
  fallback: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/** Square, ruled. Gridline has no circles outside of data marks. */
export function Avatar({ src, alt = '', fallback, size = 'md', className }: AvatarProps) {
  return (
    <Base.Root className={cx('gl-avatar', `gl-avatar--${size}`, className)}>
      {src && <Base.Image className="gl-avatar__image" src={src} alt={alt} />}
      <Base.Fallback className="gl-avatar__fallback">{fallback}</Base.Fallback>
    </Base.Root>
  );
}
