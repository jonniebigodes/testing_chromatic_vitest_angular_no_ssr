import type { HTMLInputAttributes } from 'svelte/elements';

export interface InputProps extends Omit<HTMLInputAttributes, 'placeholder'> {
  inverted?: boolean;
  placeholder?: string;
  type?: string;
}
