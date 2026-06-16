import type { Snippet } from 'svelte';

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  onValueChange?: (details: { value: string | null }) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  orientation?: 'horizontal' | 'vertical';
  readOnly?: boolean;
  label?: string;
  children?: Snippet;
  value?: string;
  defaultValue?: string;
  options: RadioOption[];
}
