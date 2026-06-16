export interface AccordionItem {
  title: string;
  content: string;
}

export interface AccordionProps {
  inverted?: boolean;
  items: AccordionItem[];
}
