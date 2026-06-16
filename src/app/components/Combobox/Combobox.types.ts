export interface ComboboxProps {
  type?: 'single' | 'multiple';
  value?: string[];
  onValueChange?: (details: { value: string[] }) => void;
  open?: boolean;
  onOpenChange?: (details: { open: boolean }) => void;
  disabled?: boolean;
  placeholder?: string;
  name?: string;
  required?: boolean;
  items?: string[];
  label?: string;
}
