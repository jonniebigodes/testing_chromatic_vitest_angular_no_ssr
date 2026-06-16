import './Button.css';

export interface ButtonProps {
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onclick?: () => void;
}
