import { Children, useRef, type HTMLAttributes } from 'react';
import { Button } from '../atoms';
import { ChevronLeftIcon, ChevronRightIcon } from '../tokens/icons';
import { cx } from '../utils/cx';
import './Carousel.css';

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  /** Accessible name for the region. */
  label: string;
  /** Slides visible at once on wide screens. */
  perView?: 1 | 2 | 3 | 4;
}

/** Slides that snap, built on native scrolling. Swipe, scroll, or use the arrows. */
export function Carousel({ label, perView = 1, className, children, ...rest }: CarouselProps) {
  const track = useRef<HTMLDivElement>(null);
  const step = (direction: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: direction * (el.clientWidth / perView), behavior: 'smooth' });
  };
  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className={cx('gl-carousel', className)} {...rest}>
      <div ref={track} className="gl-carousel__track" style={{ ['--gl-per-view' as string]: perView }} tabIndex={0}>
        {Children.map(children, (child, i) => (
          <div role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${Children.count(children)}`} className="gl-carousel__slide">{child}</div>
        ))}
      </div>
      <div className="gl-carousel__nav">
        <Button size="sm" icon={<ChevronLeftIcon />} aria-label="Previous slide" onClick={() => step(-1)} />
        <Button size="sm" icon={<ChevronRightIcon />} aria-label="Next slide" onClick={() => step(1)} />
      </div>
    </div>
  );
}
