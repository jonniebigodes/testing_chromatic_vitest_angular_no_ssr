export interface HeaderLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  title?: string;
  links?: HeaderLink[];
  isSticky?: boolean;
  inverted?: boolean;
  logo?: string;
  fullWidth?: boolean;
  onLinkClick?: (link: HeaderLink) => void;
}
