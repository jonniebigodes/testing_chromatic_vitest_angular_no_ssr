import type { Snippet } from 'svelte';
import type { HTMLFormAttributes } from 'svelte/elements';

export interface FormProps extends Omit<HTMLFormAttributes, 'children'> {
  inverted?: boolean;
  gap?: string | number;
  children: Snippet;
}
