export interface FooterProps {
  /** Color of the footer background */
  color?: string;
  /** Label text displayed in the footer */
  label?: string;
  /** Array of link labels to populate the footer */
  links?: string[];
  /** Renders the footer in inverted colors */
  inverted?: boolean;
  /** Callback when a link is clicked */
  onLinkClick?: (link: string) => void;
}
