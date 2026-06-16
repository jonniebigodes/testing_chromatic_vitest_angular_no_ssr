import type { DateValue } from '@internationalized/date';

export type { DateValue };

export interface CalendarProps {
  type?: 'single' | 'multiple';
  value?: DateValue[];
  onValueChange?: (details: {
    value: DateValue[];
    valueAsString: string[];
  }) => void;
  placeholder?: DateValue;
  weekStartsOn?: number;
  weekdayFormat?: 'narrow' | 'short' | 'long';
  calendarLabel?: string;
  fixedWeeks?: boolean;
  isDateDisabled?: (date: DateValue) => boolean;
  isDateUnavailable?: (date: DateValue, locale: string) => boolean;
  minValue?: DateValue;
  maxValue?: DateValue;
  locale?: string;
  disabled?: boolean;
  readOnly?: boolean;
  disableDaysOutsideMonth?: boolean;
  maxDays?: number;
  monthFormat?: 'short' | 'long';
  yearFormat?: 'numeric' | '2-digit';
  children?: string;
  name?: string;
}
