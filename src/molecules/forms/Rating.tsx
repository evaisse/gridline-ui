import { Label } from '../../atoms';
import { StarIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './Rating.css';

export interface RatingProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  /** Number of marks. */
  count?: number;
  /** Shows the value without letting it change. Fractions are drawn to the nearest half. */
  readOnly?: boolean;
  /** Names the group for screen readers. */
  label?: string;
  /** Shows the figure after the marks. */
  showValue?: boolean;
  className?: string;
}

/** A score out of a few marks. Filled marks are solid ink; colour stays reserved for data. */
export function Rating({ value, defaultValue = 0, onChange, count = 5, readOnly = false, label = 'Rating', showValue = false, className }: RatingProps) {
  const [current, setCurrent] = useControlled(value, defaultValue, onChange);
  const marks = Array.from({ length: count }, (_, i) => i + 1);
  const fill = (mark: number) => (current >= mark ? 'full' : current >= mark - 0.5 ? 'half' : 'none');

  return (
    <span className={cx('gl-rating', className)} role={readOnly ? 'img' : 'radiogroup'} aria-label={readOnly ? `${label}: ${current} out of ${count}` : label}>
      {marks.map((mark) =>
        readOnly ? (
          <span key={mark} className="gl-rating__mark" data-fill={fill(mark)}><StarIcon /></span>
        ) : (
          <button key={mark} type="button" role="radio" aria-checked={current === mark} aria-label={`${mark} of ${count}`} className="gl-rating__mark" data-fill={fill(mark)} onClick={() => setCurrent(current === mark ? 0 : mark)}>
            <StarIcon />
          </button>
        ),
      )}
      {showValue && <Label className="gl-rating__value">{current.toFixed(1)}</Label>}
    </span>
  );
}
