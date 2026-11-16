import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { IconButton } from '../../atoms';
import { Dialog, DialogBody, DialogContent } from '../overlays/Dialog';
import { Image } from './Image';
import './ImageGallery.css';

export interface GalleryImage {
  src: string;
  alt: string;
  /** Shown under the picture in the larger view. */
  caption?: string;
  /** Aspect ratio of the thumbnail in grid layout, such as `4 / 3`. */
  ratio?: string;
}

export interface ImageGalleryProps {
  images: GalleryImage[];
  /** `grid` crops every thumbnail to one ratio; `masonry` keeps each picture's own ratio in columns. */
  layout?: 'grid' | 'masonry';
  columns?: 2 | 3 | 4;
  /** Accessible name for the group of pictures. */
  label?: string;
  className?: string;
}

/** Pictures in a ruled grid or masonry; each opens larger in a dialog with previous and next. */
export function ImageGallery({ images, layout = 'grid', columns = 3, label = 'Gallery', className }: ImageGalleryProps) {
  const [open, setOpen] = useState<number | null>(null);
  const current = open === null ? undefined : images[open];
  const go = (step: number) => setOpen((i) => (i === null ? i : (i + step + images.length) % images.length));

  useEffect(() => {
    if (open === null) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') go(-1);
      if (event.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, images.length]);

  return (
    <>
      <ul aria-label={label} className={cx('gl-image-gallery', `gl-image-gallery--${layout}`, className)} style={{ ['--gl-gallery-cols' as string]: columns }}>
        {images.map((image, i) => (
          <li key={image.src + i} className="gl-image-gallery__item">
            <button type="button" className="gl-image-gallery__open" aria-label={`Open ${image.alt}`} onClick={() => setOpen(i)}>
              <Image src={image.src} alt={image.alt} ratio={layout === 'grid' ? image.ratio ?? '4 / 3' : image.ratio} className="gl-image-gallery__image" />
            </button>
          </li>
        ))}
      </ul>
      <Dialog open={open !== null} onOpenChange={(next) => !next && setOpen(null)}>
        {current && (
          <DialogContent title={current.alt} description={current.caption ?? `${(open ?? 0) + 1} of ${images.length}`} className="gl-image-gallery__dialog">
            <DialogBody className="gl-image-gallery__stage">
              <IconButton label="Previous picture" icon={<ChevronLeftIcon />} onClick={() => go(-1)} disabled={images.length < 2} />
              <Image src={current.src} alt={current.alt} fit="contain" ratio={current.ratio ?? '4 / 3'} className="gl-image-gallery__large" />
              <IconButton label="Next picture" icon={<ChevronRightIcon />} onClick={() => go(1)} disabled={images.length < 2} />
            </DialogBody>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
