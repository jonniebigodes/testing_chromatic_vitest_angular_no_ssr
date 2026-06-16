export interface DropDownMenuProps {
  color?: string;
  label: string;
  children: string[];
  inverted?: boolean;
  onSelect?: (item: string) => void;
}
