import type { DateValue } from '@internationalized/date';

export type { DateValue };

export interface DatePickerProps {
  type?: 'single' | 'multiple';
  value?: DateValue[];
  onValueChange?: (details: {
    value: DateValue[];
    valueAsString: string[];
  }) => void;
  open?: boolean;
  onOpenChange?: (details: { open: boolean }) => void;
  placeholder?: DateValue;
  isDateUnavailable?: (date: DateValue, locale: string) => boolean;
  isDateDisabled?: (date: DateValue) => boolean;
  required?: boolean;
  onInvalid?: (details: { reason: string }) => void;
  errorMessageId?: string;
  disableDaysOutsideMonth?: boolean;
  closeOnDateSelect?: boolean;
  preventDeselect?: boolean;
  weekStartsOn?: number;
  weekdayFormat?: 'narrow' | 'short' | 'long';
  calendarLabel?: string;
  fixedWeeks?: boolean;
  minValue?: DateValue;
  maxValue?: DateValue;
  locale?: string;
  numberOfMonths?: number;
  disabled?: boolean;
  readOnly?: boolean;
  hideTimeZone?: boolean;
  monthFormat?:
    | 'short'
    | 'long'
    | 'narrow'
    | 'numeric'
    | '2-digit'
    | ((month: number) => string);
  yearFormat?: 'numeric' | '2-digit' | ((year: number) => string);
  children?: string;
  name?: string;
}
