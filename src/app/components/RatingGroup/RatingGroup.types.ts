import type { Snippet } from 'svelte';

export interface RatingGroupProps {
  onValueChange?: (details: { value: number }) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  min?: number;
  max?: number;
  readOnly?: boolean;
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  children?: Snippet;
  value?: number;
  defaultValue?: number;
}
