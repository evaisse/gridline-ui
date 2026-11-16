import type { ReactNode } from 'react';
import { Avatar, Blockquote, Label } from '../../atoms';
import { cx } from '../../utils/cx';
import './Testimonial.css';

export interface TestimonialProps {
  quote: ReactNode;
  author: string;
  /** Job title and company. */
  role?: ReactNode;
  /** An image URL; initials are shown when it is missing. */
  avatar?: string;
  /** `stacked` puts the author under the quote; `split` sets them in two ruled columns. */
  layout?: 'stacked' | 'split';
  className?: string;
}

const initials = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('');

/** A pull quote with its author, on a tinted surface. */
export function Testimonial({ quote, author, role, avatar, layout = 'stacked', className }: TestimonialProps) {
  return (
    <figure className={cx('gl-testimonial', `gl-testimonial--${layout}`, className)}>
      <Blockquote className="gl-testimonial__quote">{quote}</Blockquote>
      <figcaption className="gl-testimonial__author">
        <Avatar src={avatar} alt="" fallback={initials(author)} />
        <span className="gl-testimonial__who">
          <Label tone="ink">{author}</Label>
          {role != null && <Label size="xs">{role}</Label>}
        </span>
      </figcaption>
    </figure>
  );
}
