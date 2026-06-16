import type { Snippet } from 'svelte';

export interface CollapsibleProps {
  open?: boolean;
  onOpenChange?: (details: { open: boolean }) => void;
  disabled?: boolean;
  label?: string;
  children?: string | Snippet;
  labelContent?: Snippet;
}
