import type { Snippet } from 'svelte';

export interface SelectItem {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  type?: 'single' | 'multiple';
  value?: string[];
  onValueChange?: (details: { value: string[] }) => void;
  open?: boolean;
  onOpenChange?: (details: { open: boolean }) => void;
  disabled?: boolean;
  placeholder?: string;
  name?: string;
  required?: boolean;
  items: SelectItem[];
  children?: Snippet;
}
