import type { ReactNode } from 'react';
import { Frame } from '../../atoms';
import { cx } from '../../utils/cx';
import './ProductTemplate.css';

export interface ProductTemplateProps {
  /** Breadcrumbs above the product. */
  header?: ReactNode;
  /** The product images, usually a Carousel or media grid. */
  gallery: ReactNode;
  /** The buy box: title, price, options, add-to-cart. */
  children: ReactNode;
  /** Long description and specifications, usually Tabs or a SpecSheet. */
  description?: ReactNode;
  /** Related items, usually a row of ProductCard. */
  related?: ReactNode;
  className?: string;
}

/** One product page: a gallery beside the options, then the description and related items. */
export function ProductTemplate({ header, gallery, children, description, related, className }: ProductTemplateProps) {
  return (
    <Frame className={cx('gl-product', className)}>
      {header != null && <header className="gl-product__header">{header}</header>}
      <div className="gl-product__top">
        <section className="gl-product__gallery" aria-label="Gallery">{gallery}</section>
        <main className="gl-product__options">{children}</main>
      </div>
      {description != null && <section className="gl-product__description" aria-label="Description">{description}</section>}
      {related != null && <aside className="gl-product__related" aria-label="Related items">{related}</aside>}
    </Frame>
  );
}
