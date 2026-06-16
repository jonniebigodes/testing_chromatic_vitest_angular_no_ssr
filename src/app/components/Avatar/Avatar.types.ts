export interface AvatarProps {
  /** The source URL of the avatar image */
  src?: string;
  /** Alternative text for the avatar image */
  alt: string;
  /** Fallback text to display when the image fails to load or is loading */
  fallback: string;
  /** Callback function called when the image loading status changes */
  onStatusChange?: (details: { status: 'loading' | 'loaded' | 'error' }) => void;
  /** Custom IDs for the avatar elements */
  ids?: Partial<{ root: string; image: string; fallback: string }>;
  /** Additional inline styles for the root element */
  rootStyle?: string;
  /** Additional class for the root element */
  rootClass?: string;
}
