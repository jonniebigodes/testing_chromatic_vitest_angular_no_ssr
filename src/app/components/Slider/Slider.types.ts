import type { Snippet } from 'svelte';

export interface SliderProps {
  value?: number[];
  onValueChange?: (details: { value: number[] }) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  children?: Snippet;
}
