import { TracingPathData } from '../types';

export const TRACING_ITEMS: TracingPathData[] = [
  // --- LETTERS ---
  {
    id: 'letter-a',
    category: 'letters',
    symbol: 'A',
    label: 'A is for Apple',
    icon: '🍎',
    viewBox: '0 0 400 400',
    strokes: [
      // Left slant /
      {
        id: 1,
        startPoint: { x: 200, y: 70 },
        waypoints: [
          { x: 200, y: 70 },
          { x: 175, y: 135 },
          { x: 150, y: 200 },
          { x: 125, y: 265 },
          { x: 100, y: 330 },
        ],
        guidePath: 'M200,70 L100,330'
      },
      // Right slant \
      {
        id: 2,
        startPoint: { x: 200, y: 70 },
        waypoints: [
          { x: 200, y: 70 },
          { x: 225, y: 135 },
          { x: 250, y: 200 },
          { x: 275, y: 265 },
          { x: 300, y: 330 },
        ],
        guidePath: 'M200,70 L300,330'
      },
      // Cross bar -
      {
        id: 3,
        startPoint: { x: 140, y: 230 },
        waypoints: [
          { x: 140, y: 230 },
          { x: 180, y: 230 },
          { x: 220, y: 230 },
          { x: 260, y: 230 },
        ],
        guidePath: 'M140,230 L260,230'
      }
    ]
  },
  {
    id: 'letter-b',
    category: 'letters',
    symbol: 'B',
    label: 'B is for Bear',
    icon: '🐻',
    viewBox: '0 0 400 400',
    strokes: [
      // Vertical line |
      {
        id: 1,
        startPoint: { x: 130, y: 70 },
        waypoints: [
          { x: 130, y: 70 },
          { x: 130, y: 135 },
          { x: 130, y: 200 },
          { x: 130, y: 265 },
          { x: 130, y: 330 },
        ],
        guidePath: 'M130,70 L130,330'
      },
      // Top bump
      {
        id: 2,
        startPoint: { x: 130, y: 70 },
        waypoints: [
          { x: 130, y: 70 },
          { x: 210, y: 70 },
          { x: 260, y: 110 },
          { x: 260, y: 160 },
          { x: 210, y: 200 },
          { x: 130, y: 200 },
        ],
        guidePath: 'M130,70 C250,70 280,120 280,140 C280,180 230,200 130,200'
      },
      // Bottom bump
      {
        id: 3,
        startPoint: { x: 130, y: 200 },
        waypoints: [
          { x: 130, y: 200 },
          { x: 220, y: 200 },
          { x: 280, y: 240 },
          { x: 280, y: 290 },
          { x: 220, y: 330 },
          { x: 130, y: 330 },
        ],
        guidePath: 'M130,200 C270,200 300,250 300,270 C300,320 230,330 130,330'
      }
    ]
  },
  {
    id: 'letter-c',
    category: 'letters',
    symbol: 'C',
    label: 'C is for Cat',
    icon: '🐱',
    viewBox: '0 0 400 400',
    strokes: [
      {
        id: 1,
        startPoint: { x: 290, y: 100 },
        waypoints: [
          { x: 290, y: 100 },
          { x: 220, y: 70 },
          { x: 150, y: 120 },
          { x: 120, y: 200 },
          { x: 150, y: 280 },
          { x: 220, y: 330 },
          { x: 290, y: 300 },
        ],
        guidePath: 'M290,100 C200,50 110,120 110,200 C110,280 200,350 290,300'
      }
    ]
  },
  {
    id: 'letter-d',
    category: 'letters',
    symbol: 'D',
    label: 'D is for Duck',
    icon: '🦆',
    viewBox: '0 0 400 400',
    strokes: [
      {
        id: 1,
        startPoint: { x: 130, y: 70 },
        waypoints: [
          { x: 130, y: 70 },
          { x: 130, y: 150 },
          { x: 130, y: 250 },
          { x: 130, y: 330 },
        ],
        guidePath: 'M130,70 L130,330'
      },
      {
        id: 2,
        startPoint: { x: 130, y: 70 },
        waypoints: [
          { x: 130, y: 70 },
          { x: 210, y: 70 },
          { x: 290, y: 130 },
          { x: 300, y: 200 },
          { x: 290, y: 270 },
          { x: 210, y: 330 },
          { x: 130, y: 330 },
        ],
        guidePath: 'M130,70 C280,70 310,130 310,200 C310,270 280,330 130,330'
      }
    ]
  },
  {
    id: 'letter-s',
    category: 'letters',
    symbol: 'S',
    label: 'S is for Star',
    icon: '⭐',
    viewBox: '0 0 400 400',
    strokes: [
      {
        id: 1,
        startPoint: { x: 280, y: 100 },
        waypoints: [
          { x: 280, y: 100 },
          { x: 200, y: 70 },
          { x: 140, y: 120 },
          { x: 200, y: 190 },
          { x: 270, y: 250 },
          { x: 220, y: 330 },
          { x: 130, y: 310 },
        ],
        guidePath: 'M280,100 C170,50 120,130 190,190 C270,250 260,330 130,310'
      }
    ]
  },

  // --- NUMBERS ---
  {
    id: 'number-1',
    category: 'numbers',
    symbol: '1',
    label: 'Number 1 - One Sun',
    icon: '☀️',
    viewBox: '0 0 400 400',
    strokes: [
      {
        id: 1,
        startPoint: { x: 140, y: 120 },
        waypoints: [
          { x: 140, y: 120 },
          { x: 180, y: 90 },
          { x: 210, y: 70 },
        ],
        guidePath: 'M140,120 L210,70'
      },
      {
        id: 2,
        startPoint: { x: 210, y: 70 },
        waypoints: [
          { x: 210, y: 70 },
          { x: 210, y: 150 },
          { x: 210, y: 240 },
          { x: 210, y: 330 },
        ],
        guidePath: 'M210,70 L210,330'
      },
      {
        id: 3,
        startPoint: { x: 130, y: 330 },
        waypoints: [
          { x: 130, y: 330 },
          { x: 210, y: 330 },
          { x: 290, y: 330 },
        ],
        guidePath: 'M130,330 L290,330'
      }
    ]
  },
  {
    id: 'number-2',
    category: 'numbers',
    symbol: '2',
    label: 'Number 2 - Two Eyes',
    icon: '👀',
    viewBox: '0 0 400 400',
    strokes: [
      {
        id: 1,
        startPoint: { x: 130, y: 120 },
        waypoints: [
          { x: 130, y: 120 },
          { x: 170, y: 70 },
          { x: 250, y: 70 },
          { x: 280, y: 130 },
          { x: 230, y: 220 },
          { x: 130, y: 330 },
          { x: 220, y: 330 },
          { x: 290, y: 330 },
        ],
        guidePath: 'M130,120 C140,60 270,60 280,130 C280,200 200,260 130,330 L290,330'
      }
    ]
  },
  {
    id: 'number-3',
    category: 'numbers',
    symbol: '3',
    label: 'Number 3 - Three Hearts',
    icon: '💖',
    viewBox: '0 0 400 400',
    strokes: [
      {
        id: 1,
        startPoint: { x: 130, y: 90 },
        waypoints: [
          { x: 130, y: 90 },
          { x: 250, y: 70 },
          { x: 270, y: 130 },
          { x: 210, y: 190 },
          { x: 280, y: 240 },
          { x: 260, y: 320 },
          { x: 130, y: 320 },
        ],
        guidePath: 'M130,90 C180,70 270,80 270,135 C270,185 200,195 200,195 C250,195 285,230 285,280 C285,340 180,340 130,320'
      }
    ]
  },

  // --- SHAPES & FUN PATHS ---
  {
    id: 'shape-circle',
    category: 'shapes',
    symbol: 'Circle',
    label: 'Round Circle',
    icon: '⭕',
    viewBox: '0 0 400 400',
    strokes: [
      {
        id: 1,
        startPoint: { x: 200, y: 70 },
        waypoints: [
          { x: 200, y: 70 },
          { x: 290, y: 110 },
          { x: 330, y: 200 },
          { x: 290, y: 290 },
          { x: 200, y: 330 },
          { x: 110, y: 290 },
          { x: 70, y: 200 },
          { x: 110, y: 110 },
          { x: 200, y: 70 },
        ],
        guidePath: 'M200,70 A130,130 0 1,1 199,70 Z'
      }
    ]
  },
  {
    id: 'shape-star',
    category: 'shapes',
    symbol: 'Star',
    label: 'Twinkling Star',
    icon: '⭐',
    viewBox: '0 0 400 400',
    strokes: [
      {
        id: 1,
        startPoint: { x: 200, y: 60 },
        waypoints: [
          { x: 200, y: 60 },
          { x: 240, y: 155 },
          { x: 345, y: 165 },
          { x: 265, y: 235 },
          { x: 290, y: 340 },
          { x: 200, y: 280 },
          { x: 110, y: 340 },
          { x: 135, y: 235 },
          { x: 55, y: 165 },
          { x: 160, y: 155 },
          { x: 200, y: 60 },
        ],
        guidePath: 'M200,60 L240,155 L345,165 L265,235 L290,340 L200,280 L110,340 L135,235 L55,165 L160,155 Z'
      }
    ]
  },
  {
    id: 'shape-wavy',
    category: 'shapes',
    symbol: 'Wavy River',
    label: 'Help the Bee reach the Flower!',
    icon: '🐝',
    viewBox: '0 0 400 400',
    strokes: [
      {
        id: 1,
        startPoint: { x: 50, y: 200 },
        waypoints: [
          { x: 50, y: 200 },
          { x: 100, y: 110 },
          { x: 160, y: 200 },
          { x: 220, y: 290 },
          { x: 280, y: 200 },
          { x: 340, y: 110 },
          { x: 370, y: 180 },
        ],
        guidePath: 'M50,200 C110,80 150,320 220,200 C290,80 330,320 370,180'
      }
    ]
  }
];
