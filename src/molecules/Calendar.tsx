import { DayPicker, type DayPickerProps } from 'react-day-picker';
import { ChevronLeftIcon, ChevronRightIcon } from '../tokens/icons';
import { cx } from '../utils/cx';
import './Calendar.css';

export type CalendarProps = DayPickerProps;

/** A month grid of shared-border day cells. Supports single, multiple and range selection. */
export function Calendar({ className, showOutsideDays = true, ...rest }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cx('gl-calendar', className)}
      components={{ Chevron: ({ orientation }) => (orientation === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />) }}
      {...rest}
    />
  );
}
