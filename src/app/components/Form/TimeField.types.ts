import type { Snippet } from 'svelte';

export interface TimeValue {
  hour: number;
  minute: number;
  second?: number;
}

export interface TimeFieldProps {
  value?: string;
  onValueChange?: (details: { value: string; valueAsTime: TimeValue }) => void;
  placeholder?: string;
  required?: boolean;
  oninvalid?: () => void;
  'aria-describedby'?: string;
  hourCycle?: 12 | 24;
  hideTimeZone?: boolean;
  min?: string;
  max?: string;
  disabled?: boolean;
  readonly?: boolean;
  children?: Snippet;
  name?: string;
  allowSeconds?: boolean;
}
