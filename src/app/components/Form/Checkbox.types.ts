import type { Snippet } from 'svelte';

export interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (details: { checked: boolean | string }) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  readOnly?: boolean;
  children?: Snippet;
}
