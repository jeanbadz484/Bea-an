import { ColoringPageData } from '../types';

export const COLOR_PALETTE = [
  { name: 'Cherry Red', hex: '#EF4444' },
  { name: 'Warm Orange', hex: '#F97316' },
  { name: 'Sunny Yellow', hex: '#FBBF24' },
  { name: 'Lemon', hex: '#FDE047' },
  { name: 'Grass Green', hex: '#22C55E' },
  { name: 'Mint Green', hex: '#34D399' },
  { name: 'Sky Blue', hex: '#38BDF8' },
  { name: 'Ocean Blue', hex: '#3B82F6' },
  { name: 'Lavender', hex: '#A855F7' },
  { name: 'Bubblegum Pink', hex: '#EC4899' },
  { name: 'Soft Rose', hex: '#F472B6' },
  { name: 'Warm Brown', hex: '#92400E' },
  { name: 'Teddy Tan', hex: '#D97706' },
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Soft Gray', hex: '#94A3B8' },
  { name: 'Eraser', hex: 'eraser' },
];

export const STAMP_ICONS = [
  { id: 'star', emoji: '⭐', label: 'Star' },
  { id: 'heart', emoji: '💖', label: 'Heart' },
  { id: 'flower', emoji: '🌸', label: 'Flower' },
  { id: 'sparkles', emoji: '✨', label: 'Sparkles' },
  { id: 'paw', emoji: '🐾', label: 'Paw' },
  { id: 'balloon', emoji: '🎈', label: 'Balloon' },
  { id: 'sun', emoji: '☀️', label: 'Sun' },
  { id: 'butterfly', emoji: '🦋', label: 'Butterfly' },
];

export const COLORING_PAGES: ColoringPageData[] = [
  {
    id: 'kitty',
    title: 'Playful Kitty',
    category: 'animals',
    emoji: '🐱',
    viewBox: '0 0 500 500',
    shapes: [
      // Left ear
      { id: 'ear-l', name: 'Left Ear', d: 'M140,180 L110,90 L210,130 Z', defaultColor: '#FFFFFF' },
      { id: 'ear-l-inner', name: 'Left Ear Inner', d: 'M145,160 L125,105 L190,135 Z', defaultColor: '#FFFFFF' },
      // Right ear
      { id: 'ear-r', name: 'Right Ear', d: 'M360,180 L390,90 L290,130 Z', defaultColor: '#FFFFFF' },
      { id: 'ear-r-inner', name: 'Right Ear Inner', d: 'M355,160 L375,105 L310,135 Z', defaultColor: '#FFFFFF' },
      // Head
      { id: 'head', name: 'Kitty Head', d: 'M250,120 C340,120 400,180 400,260 C400,340 330,370 250,370 C170,370 100,340 100,260 C100,180 160,120 250,120 Z', defaultColor: '#FFFFFF' },
      // Body
      { id: 'body', name: 'Kitty Body', d: 'M170,330 C150,390 140,460 140,480 L360,480 C360,460 350,390 330,330 Z', defaultColor: '#FFFFFF' },
      // Belly
      { id: 'belly', name: 'Belly', d: 'M200,370 C200,430 220,460 250,460 C280,460 300,430 300,370 Z', defaultColor: '#FFFFFF' },
      // Paws
      { id: 'paw-l', name: 'Left Paw', d: 'M160,430 C160,470 210,470 210,430 Z', defaultColor: '#FFFFFF' },
      { id: 'paw-r', name: 'Right Paw', d: 'M290,430 C290,470 340,470 340,430 Z', defaultColor: '#FFFFFF' },
      // Tail
      { id: 'tail', name: 'Tail', d: 'M350,440 C430,440 450,340 430,320 C410,300 400,330 400,360 C400,410 350,420 340,430 Z', defaultColor: '#FFFFFF' },
      // Nose
      { id: 'nose', name: 'Nose', d: 'M238,260 L262,260 L250,274 Z', defaultColor: '#FFFFFF' },
      // Cheeks
      { id: 'cheek-l', name: 'Left Cheek', d: 'M160,280 C160,265 185,265 185,280 C185,295 160,295 160,280 Z', defaultColor: '#FFFFFF' },
      { id: 'cheek-r', name: 'Right Cheek', d: 'M315,280 C315,265 340,265 340,280 C340,295 315,295 315,280 Z', defaultColor: '#FFFFFF' },
      // Collar / Bow
      { id: 'bow-center', name: 'Bow Center', d: 'M235,360 C235,350 265,350 265,360 C265,370 235,370 235,360 Z', defaultColor: '#FFFFFF' },
      { id: 'bow-left', name: 'Bow Left Wing', d: 'M235,360 L195,340 L195,380 Z', defaultColor: '#FFFFFF' },
      { id: 'bow-right', name: 'Bow Right Wing', d: 'M265,360 L305,340 L305,380 Z', defaultColor: '#FFFFFF' }
    ],
    outlinePaths: [
      // Left eye & Right eye
      'M190,225 C190,210 210,210 210,225 C210,240 190,240 190,225 Z',
      'M290,225 C290,210 310,210 310,225 C310,240 290,240 290,225 Z',
      // Eye highlights
      'M196,220 C196,216 200,216 200,220 C200,224 196,224 196,220 Z',
      'M296,220 C296,216 300,216 300,220 C300,224 296,224 296,220 Z',
      // Mouth
      'M250,274 L250,288 C240,298 225,296 220,290',
      'M250,288 C260,298 275,296 280,290',
      // Whiskers Left
      'M180,270 L110,260',
      'M180,280 L100,280',
      'M180,290 L115,300',
      // Whiskers Right
      'M320,270 L390,260',
      'M320,280 L400,280',
      'M320,290 L385,300',
    ]
  },
  {
    id: 'car',
    title: 'Happy Little Car',
    category: 'vehicles',
    emoji: '🚗',
    viewBox: '0 0 500 500',
    shapes: [
      // Sky cloud
      { id: 'cloud', name: 'Fluffy Cloud', d: 'M70,80 C60,50 110,40 130,60 C150,40 200,50 190,80 C210,90 200,120 180,120 L80,120 C60,120 50,100 70,80 Z', defaultColor: '#FFFFFF' },
      // Sun
      { id: 'sun', name: 'Sunny Face', d: 'M400,90 C400,60 450,60 450,90 C450,120 400,120 400,90 Z', defaultColor: '#FFFFFF' },
      // Car Body
      { id: 'car-cabin', name: 'Car Roof', d: 'M140,250 C160,180 320,180 340,250 Z', defaultColor: '#FFFFFF' },
      { id: 'car-lower', name: 'Car Body', d: 'M60,250 C60,240 100,240 130,250 L350,250 C380,240 440,250 440,330 C440,350 420,360 400,360 L100,360 C70,360 60,330 60,250 Z', defaultColor: '#FFFFFF' },
      // Windows
      { id: 'win-f', name: 'Front Window', d: 'M160,240 L235,240 L235,200 C200,200 170,220 160,240 Z', defaultColor: '#FFFFFF' },
      { id: 'win-b', name: 'Back Window', d: 'M255,240 L320,240 C310,220 285,200 255,200 Z', defaultColor: '#FFFFFF' },
      // Headlights
      { id: 'light-front', name: 'Headlight', d: 'M55,280 C55,270 70,270 70,285 C70,300 55,300 55,280 Z', defaultColor: '#FFFFFF' },
      { id: 'light-back', name: 'Taillight', d: 'M430,280 C445,280 445,295 430,300 Z', defaultColor: '#FFFFFF' },
      // Wheels
      { id: 'wheel-l', name: 'Front Wheel', d: 'M110,360 C110,320 170,320 170,360 C170,400 110,400 110,360 Z', defaultColor: '#FFFFFF' },
      { id: 'hub-l', name: 'Front Hubcap', d: 'M128,360 C128,345 152,345 152,360 C152,375 128,375 128,360 Z', defaultColor: '#FFFFFF' },
      { id: 'wheel-r', name: 'Rear Wheel', d: 'M320,360 C320,320 380,320 380,360 C380,400 320,400 320,360 Z', defaultColor: '#FFFFFF' },
      { id: 'hub-r', name: 'Rear Hubcap', d: 'M338,360 C338,345 362,345 362,360 C362,375 338,375 338,360 Z', defaultColor: '#FFFFFF' },
      // Road
      { id: 'road', name: 'Paved Road', d: 'M20,410 L480,410 L480,440 L20,440 Z', defaultColor: '#FFFFFF' }
    ],
    outlinePaths: [
      // Smiley grille on bumper
      'M80,310 C90,325 110,325 120,310',
      // Sun rays
      'M425,45 L425,30',
      'M425,135 L425,150',
      'M380,90 L365,90',
      'M470,90 L485,90',
      // Road dashes
      'M70,425 L120,425',
      'M180,425 L230,425',
      'M290,425 L340,425',
      'M400,425 L450,425',
    ]
  },
  {
    id: 'rainbow',
    title: 'Smiling Sun & Rainbow',
    category: 'nature',
    emoji: '🌈',
    viewBox: '0 0 500 500',
    shapes: [
      // Rainbow Arc 1 (Red / Top)
      { id: 'arc-1', name: 'Outer Arc', d: 'M50,380 A200,200 0 0,1 450,380 L420,380 A170,170 0 0,0 80,380 Z', defaultColor: '#FFFFFF' },
      // Rainbow Arc 2 (Orange)
      { id: 'arc-2', name: 'Second Arc', d: 'M80,380 A170,170 0 0,1 420,380 L390,380 A140,140 0 0,0 110,380 Z', defaultColor: '#FFFFFF' },
      // Rainbow Arc 3 (Yellow)
      { id: 'arc-3', name: 'Third Arc', d: 'M110,380 A140,140 0 0,1 390,380 L360,380 A110,110 0 0,0 140,380 Z', defaultColor: '#FFFFFF' },
      // Rainbow Arc 4 (Green)
      { id: 'arc-4', name: 'Fourth Arc', d: 'M140,380 A110,110 0 0,1 360,380 L330,380 A80,80 0 0,0 170,380 Z', defaultColor: '#FFFFFF' },
      // Rainbow Arc 5 (Purple / Inner)
      { id: 'arc-5', name: 'Inner Arc', d: 'M170,380 A80,80 0 0,1 330,380 L300,380 A50,50 0 0,0 200,380 Z', defaultColor: '#FFFFFF' },
      // Left Cloud
      { id: 'cloud-l', name: 'Left Cloud', d: 'M30,410 C10,370 70,330 110,360 C130,330 180,340 180,380 C210,390 200,430 170,440 L60,440 C30,440 20,420 30,410 Z', defaultColor: '#FFFFFF' },
      // Right Cloud
      { id: 'cloud-r', name: 'Right Cloud', d: 'M320,410 C300,370 360,330 400,360 C420,330 470,340 470,380 C500,390 490,430 460,440 L350,440 C320,440 310,420 320,410 Z', defaultColor: '#FFFFFF' },
      // Cheerful Sun
      { id: 'sun-face', name: 'Mr. Sun', d: 'M250,90 C290,90 320,120 320,160 C320,200 290,230 250,230 C210,230 180,200 180,160 C180,120 210,90 250,90 Z', defaultColor: '#FFFFFF' }
    ],
    outlinePaths: [
      // Sun Eyes & Big Smile
      'M225,150 C225,142 235,142 235,150 C235,158 225,158 225,150 Z',
      'M265,150 C265,142 275,142 275,150 C275,158 265,158 265,150 Z',
      'M230,175 C240,195 260,195 270,175',
      // Sun Rays
      'M250,75 L250,55',
      'M250,245 L250,265',
      'M165,160 L145,160',
      'M335,160 L355,160',
      'M190,100 L175,85',
      'M310,100 L325,85',
      'M190,220 L175,235',
      'M310,220 L325,235',
      // Cloud happy faces
      'M80,400 C90,410 105,410 115,400',
      'M380,400 C390,410 405,410 415,400'
    ]
  },
  {
    id: 'dino',
    title: 'Baby Dinosaur',
    category: 'animals',
    emoji: '🦕',
    viewBox: '0 0 500 500',
    shapes: [
      // Head & Long Neck
      { id: 'dino-head-neck', name: 'Dino Head & Neck', d: 'M200,100 C250,80 300,120 290,160 C280,190 250,200 220,250 C200,280 200,320 180,350 L120,330 C150,260 160,210 180,160 C190,130 170,120 200,100 Z', defaultColor: '#FFFFFF' },
      // Big Round Body
      { id: 'dino-body', name: 'Dino Body', d: 'M140,320 C180,280 290,280 340,330 C390,380 370,440 300,440 C220,440 120,410 140,320 Z', defaultColor: '#FFFFFF' },
      // Tail
      { id: 'dino-tail', name: 'Dino Tail', d: 'M340,330 C390,320 450,300 470,280 C470,330 410,380 340,390 Z', defaultColor: '#FFFFFF' },
      // Legs
      { id: 'leg-front', name: 'Front Leg', d: 'M170,400 L170,470 L210,470 L210,410 Z', defaultColor: '#FFFFFF' },
      { id: 'leg-back', name: 'Back Leg', d: 'M270,400 L270,470 L310,470 L310,410 Z', defaultColor: '#FFFFFF' },
      // Back spots / spikes
      { id: 'spike-1', name: 'Back Plate 1', d: 'M180,130 L160,110 L190,120 Z', defaultColor: '#FFFFFF' },
      { id: 'spike-2', name: 'Back Plate 2', d: 'M160,170 L140,150 L170,160 Z', defaultColor: '#FFFFFF' },
      { id: 'spike-3', name: 'Back Plate 3', d: 'M140,220 L120,200 L150,210 Z', defaultColor: '#FFFFFF' },
      { id: 'spike-4', name: 'Back Plate 4', d: 'M200,290 L220,270 L230,295 Z', defaultColor: '#FFFFFF' },
      { id: 'spike-5', name: 'Back Plate 5', d: 'M260,300 L280,280 L290,305 Z', defaultColor: '#FFFFFF' },
      // Belly spot 1
      { id: 'spot-1', name: 'Body Spot 1', d: 'M230,350 C230,335 255,335 255,350 C255,365 230,365 230,350 Z', defaultColor: '#FFFFFF' },
      { id: 'spot-2', name: 'Body Spot 2', d: 'M280,370 C280,355 305,355 305,370 C305,385 280,385 280,370 Z', defaultColor: '#FFFFFF' },
    ],
    outlinePaths: [
      // Big friendly eye
      'M250,130 C250,120 265,120 265,130 C265,140 250,140 250,130 Z',
      'M255,127 C255,124 259,124 259,127 C259,130 255,130 255,127 Z',
      // Cute smile
      'M265,155 C260,165 245,165 240,155',
      // Grass at feet
      'M100,470 L115,455 L130,470 L145,455 L160,470',
      'M320,470 L335,455 L350,470 L365,455 L380,470',
    ]
  },
  {
    id: 'rocket',
    title: 'Rocket to the Stars',
    category: 'vehicles',
    emoji: '🚀',
    viewBox: '0 0 500 500',
    shapes: [
      // Rocket Nose Cone
      { id: 'nose-cone', name: 'Rocket Nose', d: 'M250,60 L200,160 L300,160 Z', defaultColor: '#FFFFFF' },
      // Rocket Main Fuselage
      { id: 'fuselage', name: 'Rocket Body', d: 'M200,160 L200,320 L300,320 L300,160 Z', defaultColor: '#FFFFFF' },
      // Left Wing Fin
      { id: 'fin-l', name: 'Left Wing', d: 'M200,280 L140,360 L200,350 Z', defaultColor: '#FFFFFF' },
      // Right Wing Fin
      { id: 'fin-r', name: 'Right Wing', d: 'M300,280 L360,360 L300,350 Z', defaultColor: '#FFFFFF' },
      // Engine Nozzle
      { id: 'nozzle', name: 'Engine Base', d: 'M220,320 L210,350 L290,350 L280,320 Z', defaultColor: '#FFFFFF' },
      // Flame Outer
      { id: 'flame-outer', name: 'Blast Flame', d: 'M215,350 C200,420 250,470 250,470 C250,470 300,420 285,350 Z', defaultColor: '#FFFFFF' },
      // Flame Inner
      { id: 'flame-inner', name: 'Inner Fire', d: 'M230,350 C220,400 250,430 250,430 C250,430 280,400 270,350 Z', defaultColor: '#FFFFFF' },
      // Porthole Window Ring
      { id: 'window-ring', name: 'Window Frame', d: 'M250,205 C220,205 220,255 250,255 C280,255 280,205 250,205 Z', defaultColor: '#FFFFFF' },
      // Little Planet
      { id: 'planet', name: 'Little Planet', d: 'M100,110 C80,90 120,70 140,90 C160,110 120,130 100,110 Z', defaultColor: '#FFFFFF' },
      // Big Moon
      { id: 'moon', name: 'Gentle Moon', d: 'M380,100 C360,100 340,120 340,150 C340,180 370,200 400,190 C370,180 370,120 380,100 Z', defaultColor: '#FFFFFF' }
    ],
    outlinePaths: [
      // Star sparkles in space
      'M80,260 L85,275 L100,280 L85,285 L80,300 L75,285 L60,280 L75,275 Z',
      'M410,270 L414,282 L426,286 L414,290 L410,302 L406,290 L394,286 L406,282 Z',
      'M330,60 L333,70 L343,73 L333,76 L330,86 L327,76 L317,73 L327,70 Z'
    ]
  },
  {
    id: 'apple',
    title: 'Juicy Apple & Friend',
    category: 'nature',
    emoji: '🍎',
    viewBox: '0 0 500 500',
    shapes: [
      // Apple Body
      { id: 'apple-body', name: 'Big Apple', d: 'M250,160 C210,130 120,140 120,250 C120,360 210,430 250,430 C290,430 380,360 380,250 C380,140 290,130 250,160 Z', defaultColor: '#FFFFFF' },
      // Leaf
      { id: 'leaf', name: 'Green Leaf', d: 'M250,140 C250,80 330,80 330,120 C330,160 250,140 250,140 Z', defaultColor: '#FFFFFF' },
      // Stem
      { id: 'stem', name: 'Stem', d: 'M245,160 C240,110 230,90 230,80 L245,80 C245,90 255,110 255,160 Z', defaultColor: '#FFFFFF' },
      // Little worm / caterpillar friend popping out
      { id: 'worm-head', name: 'Friendly Caterpillar', d: 'M350,220 C340,180 380,170 395,200 C405,220 380,240 350,220 Z', defaultColor: '#FFFFFF' },
    ],
    outlinePaths: [
      // Apple cheek blush
      'M170,270 C160,280 160,290 170,300',
      'M330,270 C340,280 340,290 330,300',
      // Happy Apple face
      'M200,240 C200,230 215,230 215,240 C215,250 200,250 200,240 Z',
      'M285,240 C285,230 300,230 300,240 C300,250 285,250 285,240 Z',
      'M230,280 C240,300 260,300 270,280',
      // Worm eye & smile
      'M375,190 C375,186 380,186 380,190 Z',
      'M370,202 C375,206 382,204 384,200'
    ]
  }
];
