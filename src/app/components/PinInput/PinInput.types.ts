import type { Snippet } from 'svelte';

export interface PinInputProps {
  value?: string[];
  onValueChange?: (details: { value: string[]; valueAsString: string }) => void;
  disabled?: boolean;
  maxLength?: number;
  label?: string;
  children?: Snippet;
  required?: boolean;
  name?: string;
  type?: 'numeric' | 'alphanumeric' | 'alphabetic';
  mask?: boolean;
  placeholder?: string;
  otp?: boolean;
}
