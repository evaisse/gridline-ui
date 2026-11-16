import { useId, useState } from 'react';
import { Checkbox, IconButton, Label } from '../../atoms';
import { ChevronLeftIcon, ChevronRightIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './Transfer.css';

export interface TransferItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface TransferProps {
  /** Every item, on either side. */
  items: TransferItem[];
  /** Values of the items in the right-hand list. */
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  titles?: [string, string];
  /** Accessible name of the whole control. */
  'aria-label': string;
  className?: string;
}

interface ListProps {
  title: string;
  items: TransferItem[];
  checked: string[];
  onCheckedChange: (next: string[]) => void;
}

function TransferList({ title, items, checked, onCheckedChange }: ListProps) {
  const base = useId();
  const enabled = items.filter((item) => !item.disabled);
  const all = enabled.length > 0 && enabled.every((item) => checked.includes(item.value));
  const some = enabled.some((item) => checked.includes(item.value));
  return (
    <section className="gl-transfer__list" aria-label={title}>
      <header className="gl-transfer__head">
        <Checkbox aria-label={`Select all in ${title}`} checked={all ? true : some ? 'indeterminate' : false} disabled={enabled.length === 0} onCheckedChange={(state) => onCheckedChange(state === true ? enabled.map((item) => item.value) : [])} />
        <Label tone="ink">{title}</Label>
        <Label className="gl-transfer__count">{checked.length}/{items.length}</Label>
      </header>
      <ul className="gl-transfer__items">
        {items.length === 0 && <li className="gl-transfer__empty">Nothing here</li>}
        {items.map((item) => {
          const id = `${base}-${item.value}`;
          const on = checked.includes(item.value);
          return (
            <li key={item.value} className={cx('gl-transfer__item', on && 'gl-transfer__item--checked')}>
              <Checkbox id={id} checked={on} disabled={item.disabled} onCheckedChange={(state) => onCheckedChange(state === true ? [...checked, item.value] : checked.filter((entry) => entry !== item.value))} />
              <label htmlFor={id} className="gl-transfer__label">{item.label}</label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Moves items between two lists. Tick items on one side, then press the arrow to send them across. */
export function Transfer({ items, value, defaultValue = [], onChange, titles = ['Available', 'Selected'], className, 'aria-label': ariaLabel }: TransferProps) {
  const [target, setTarget] = useControlled(value, defaultValue, onChange);
  const [leftChecked, setLeftChecked] = useState<string[]>([]);
  const [rightChecked, setRightChecked] = useState<string[]>([]);
  const left = items.filter((item) => !target.includes(item.value));
  const right = items.filter((item) => target.includes(item.value));

  const send = () => { setTarget([...target, ...leftChecked]); setLeftChecked([]); };
  const back = () => { setTarget(target.filter((entry) => !rightChecked.includes(entry))); setRightChecked([]); };

  return (
    <div role="group" aria-label={ariaLabel} className={cx('gl-transfer', className)}>
      <TransferList title={titles[0]} items={left} checked={leftChecked} onCheckedChange={setLeftChecked} />
      <div className="gl-transfer__actions">
        <IconButton label={`Move selected to ${titles[1]}`} icon={<ChevronRightIcon />} disabled={leftChecked.length === 0} onClick={send} />
        <IconButton label={`Move selected to ${titles[0]}`} icon={<ChevronLeftIcon />} disabled={rightChecked.length === 0} onClick={back} />
      </div>
      <TransferList title={titles[1]} items={right} checked={rightChecked} onCheckedChange={setRightChecked} />
    </div>
  );
}
