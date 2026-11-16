import type { ReactNode } from 'react';
import { Heading, Label, Numeric, Tag, Text } from '../../atoms';
import { Rating } from '../../molecules';
import type { Tone } from '../../tokens/tone';
import { cx } from '../../utils/cx';
import './ProductCard.css';

export interface ProductCardProps {
  name: string;
  /** Category line above the name. */
  kind?: string;
  description?: string;
  price: number;
  /** A crossed-out earlier price. */
  previousPrice?: number;
  currency?: string;
  rating?: number;
  reviews?: number;
  tag?: { label: string; tone?: Tone };
  /** The picture. Defaults to a hatched plate. */
  media?: ReactNode;
  /** The button in the footer. */
  action?: ReactNode;
  layout?: 'vertical' | 'horizontal';
  className?: string;
}

/** One product: picture, name, rating, price and a single action. Fills a Grid cell edge to edge. */
export function ProductCard({ name, kind, description, price, previousPrice, currency = '$', rating, reviews, tag, media, action, layout = 'vertical', className }: ProductCardProps) {
  return (
    <article className={cx('gl-product-card', `gl-product-card--${layout}`, className)}>
      <div className="gl-product-card__media">{media ?? <div className="gl-product-card__plate gl-hatch" role="img" aria-label={name} />}</div>
      <div className="gl-product-card__body">
        <div className="gl-product-card__top">
          {kind != null && <Label>{kind}</Label>}
          {tag != null && <Tag tone={tag.tone}>{tag.label}</Tag>}
        </div>
        <Heading level={3} size="lg">{name}</Heading>
        {description != null && <Text variant="small" tone="muted">{description}</Text>}
        {rating != null && (
          <div className="gl-product-card__rating">
            <Rating readOnly value={rating} label={`${name} rating`} />
            <Label size="xs">{rating.toFixed(1)}{reviews != null && ` · ${reviews}`}</Label>
          </div>
        )}
      </div>
      <div className="gl-product-card__foot">
        <span className="gl-product-card__price">
          <Numeric prefix={currency}>{price}</Numeric>
          {previousPrice != null && <s><Numeric prefix={currency}>{previousPrice}</Numeric></s>}
        </span>
        {action}
      </div>
    </article>
  );
}
