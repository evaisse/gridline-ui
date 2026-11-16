import type { ReactNode } from 'react';
import { Heading, IconButton, Label, Numeric, Text } from '../../atoms';
import { Empty, NumberInput } from '../../molecules';
import { CartIcon, TrashIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './Cart.css';

export interface CartLine {
  id: string;
  name: ReactNode;
  /** Unit price. */
  price: number;
  quantity: number;
  /** A thumbnail or glyph. */
  media?: ReactNode;
}

export interface CartProps {
  lines?: CartLine[];
  defaultLines?: CartLine[];
  onLinesChange?: (lines: CartLine[]) => void;
  /** Shipping cost; omit to hide the row. */
  shipping?: number;
  /** Shown before every figure. */
  currency?: string;
  /** The checkout button or form, under the total. */
  action?: ReactNode;
  /** The text of the empty state. */
  emptyText?: ReactNode;
  className?: string;
}

/** Chosen products with a quantity field and a remove button per line, then subtotal, shipping and total. */
export function Cart({ lines, defaultLines = [], onLinesChange, shipping, currency = '$', action, emptyText = 'Nothing here yet.', className }: CartProps) {
  const [items, setItems] = useControlled(lines, defaultLines, onLinesChange);
  const subtotal = items.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const total = subtotal + (shipping ?? 0);
  const money = (value: number) => <Numeric prefix={currency}>{value.toFixed(2)}</Numeric>;
  const update = (id: string, quantity: number) => setItems(items.map((line) => (line.id === id ? { ...line, quantity } : line)));

  return (
    <section className={cx('gl-cart', className)} aria-label="Cart">
      <header className="gl-cart__head">
        <Heading level={2} size="md">Cart</Heading>
        <Label>{items.reduce((n, line) => n + line.quantity, 0)} items</Label>
      </header>
      {items.length === 0 ? (
        <Empty icon={<CartIcon width={20} height={20} />} title="Your cart is empty" description={emptyText} />
      ) : (
        <ul className="gl-cart__lines">
          {items.map((line) => (
            <li key={line.id} className="gl-cart__line">
              {line.media != null && <div className="gl-cart__media">{line.media}</div>}
              <div className="gl-cart__info">
                <Text>{line.name}</Text>
                <Label>{currency}{line.price.toFixed(2)} each</Label>
              </div>
              <NumberInput className="gl-cart__qty" aria-label="Quantity" value={line.quantity} min={1} max={99} onChange={(q) => update(line.id, q)} />
              <span className="gl-cart__line-total">{money(line.price * line.quantity)}</span>
              <IconButton label="Remove" variant="ghost" size="sm" icon={<TrashIcon />} onClick={() => setItems(items.filter((l) => l.id !== line.id))} />
            </li>
          ))}
        </ul>
      )}
      {items.length > 0 && (
        <dl className="gl-cart__figures">
          <div><dt><Label>Subtotal</Label></dt><dd>{money(subtotal)}</dd></div>
          {shipping != null && <div><dt><Label>Shipping</Label></dt><dd>{shipping === 0 ? <Label tone="ink">Free</Label> : money(shipping)}</dd></div>}
          <div className="gl-cart__total"><dt><Label tone="ink">Total</Label></dt><dd>{money(total)}</dd></div>
        </dl>
      )}
      {action != null && <div className="gl-cart__action">{action}</div>}
    </section>
  );
}
