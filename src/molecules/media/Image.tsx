import { useState, type ImgHTMLAttributes, type ReactNode } from 'react';
import { Skeleton } from '../../atoms';
import { ImageIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import './Image.css';

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'children'> {
  /** Required description; pass an empty string for a decorative picture. */
  alt: string;
  /** CSS aspect ratio of the frame, such as `16 / 9`. Reserves space while loading. */
  ratio?: string;
  fit?: 'cover' | 'contain';
  /** Shown instead of the picture when it fails to load. Defaults to a hatched cell with an icon. */
  fallback?: ReactNode;
}

/** A picture with a skeleton while it loads and a hatched fallback when it cannot. */
export function Image({ src, alt, ratio, fit = 'cover', fallback, className, style, onLoad, onError, ...rest }: ImageProps) {
  const [state, setState] = useState<{ src?: string; status: 'loading' | 'loaded' | 'error' }>({ src, status: 'loading' });
  const status = state.src === src ? state.status : 'loading';
  const failed = status === 'error' || !src;

  return (
    <span className={cx('gl-image', `gl-image--${fit}`, className)} style={{ ...(ratio ? { aspectRatio: ratio } : {}), ...style }}>
      {failed ? (
        <span className="gl-image__fallback gl-hatch" role="img" aria-label={alt || 'Image unavailable'}>
          {fallback ?? <ImageIcon width={20} height={20} />}
        </span>
      ) : (
        <>
          {status === 'loading' && <Skeleton className="gl-image__skeleton" aria-hidden="true" />}
          <img
            src={src} alt={alt} className="gl-image__img" data-status={status}
            onLoad={(event) => { setState({ src, status: 'loaded' }); onLoad?.(event); }}
            onError={(event) => { setState({ src, status: 'error' }); onError?.(event); }}
            {...rest}
          />
        </>
      )}
    </span>
  );
}
