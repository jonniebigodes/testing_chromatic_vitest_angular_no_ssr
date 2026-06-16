export interface SpringOscillatorProps {
  spanPx?: number;
}

export type SpringConfig = {
  target: number;
  damping: number;
  stiffness: number;
};
