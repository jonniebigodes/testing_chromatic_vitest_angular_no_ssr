export interface ProgressProps {
  min?: number;
  max?: number;
  value?: number;
  disabled?: boolean;
  readonly?: boolean;
  orientation?: 'horizontal' | 'vertical';
}
