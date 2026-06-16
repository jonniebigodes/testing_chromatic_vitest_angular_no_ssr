import type { Snippet } from 'svelte';

export interface ToggleProps {
  onPressedChange?: (pressed: boolean) => void;
  pressed?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  label?: string;
  children?: Snippet;
}
