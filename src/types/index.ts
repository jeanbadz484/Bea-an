export type ActivityTab = 'home' | 'coloring' | 'tracing' | 'puzzle' | 'stickers';

export interface ColoringShape {
  id: string;
  name: string;
  d: string;
  defaultColor?: string;
}

export interface ColoringPageData {
  id: string;
  title: string;
  category: 'animals' | 'vehicles' | 'nature';
  emoji: string;
  viewBox: string;
  shapes: ColoringShape[];
  outlinePaths: string[]; // Black strokes for borders/details
}

export type TracingCategory = 'letters' | 'numbers' | 'shapes';

export interface TracingPathData {
  id: string;
  category: TracingCategory;
  symbol: string;       // e.g. "A", "1", "Circle"
  label: string;        // e.g. "A is for Apple"
  icon: string;         // e.g. "🍎"
  viewBox: string;
  // Sequence of strokes. Each stroke has waypoints (x, y)
  strokes: {
    id: number;
    startPoint: { x: number; y: number };
    waypoints: { x: number; y: number }[];
    guidePath: string; // SVG path command d="..."
  }[];
}

export interface PuzzleData {
  id: string;
  title: string;
  theme: string;
  emoji: string;
  imageSrc: string;
}

export interface StickerReward {
  id: string;
  name: string;
  emoji: string;
  description: string;
  unlockedAt?: number;
}
