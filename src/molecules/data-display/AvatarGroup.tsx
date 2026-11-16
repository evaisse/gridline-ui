import { Avatar, type AvatarProps } from '../../atoms';
import { cx } from '../../utils/cx';
import './AvatarGroup.css';

export interface AvatarGroupProps {
  people: Array<Pick<AvatarProps, 'src' | 'alt' | 'fallback'>>;
  /** Show at most this many, then a `+n` cell. */
  max?: number;
  size?: AvatarProps['size'];
  className?: string;
}

/** Avatars sharing their borders, with the overflow counted in a last cell. */
export function AvatarGroup({ people, max = 4, size = 'md', className }: AvatarGroupProps) {
  const shown = people.slice(0, max);
  const rest = people.length - shown.length;
  return (
    <span className={cx('gl-avatar-group', className)} role="group" aria-label={`${people.length} people`}>
      {shown.map((person, i) => <Avatar key={i} size={size} {...person} />)}
      {rest > 0 && <Avatar size={size} fallback={`+${rest}`} alt={`${rest} more`} />}
    </span>
  );
}
