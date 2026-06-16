import type { Snippet } from 'svelte';

export interface LabelProps {
  htmlFor?: string;
  inverted?: boolean;
  children: Snippet;
}
