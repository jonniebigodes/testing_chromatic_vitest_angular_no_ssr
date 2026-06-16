export type PillVariant = 'default' | 'inverted' | 'warning' | 'success';
export type PillSize = 'small' | 'medium' | 'large';

export interface PillProps {
  /** Variant style of the pill */
  variant?: PillVariant;
  /** Size of the pill: 'small', 'medium', or 'large' */
  size?: PillSize;
  /** Click event handler */
  onclick?: () => void;
  /** Whether the pill is disabled */
  disabled?: boolean;
}
