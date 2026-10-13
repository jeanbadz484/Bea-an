import { PuzzleData, StickerReward } from '../types';

export const PUZZLES: PuzzleData[] = [
  {
    id: 'safari',
    title: 'Safari Animal Friends',
    theme: 'Lion, Elephant & Giraffe',
    emoji: '🦁',
    imageSrc: '/src/assets/images/toddler_cute_safari_1791857751496.jpg',
  },
  {
    id: 'ocean',
    title: 'Ocean Whale & Friends',
    theme: 'Smiling Whale, Turtle & Fish',
    emoji: '🐳',
    imageSrc: '/src/assets/images/toddler_underwater_ocean_1791857752153.jpg',
  },
  {
    id: 'farm',
    title: 'Happy Sunny Farm',
    theme: 'Tractor, Cow & Sheep',
    emoji: '🚜',
    imageSrc: '/src/assets/images/toddler_friendly_farm_1791857752789.jpg',
  },
  {
    id: 'space',
    title: 'Astro Puppy in Space',
    theme: 'Rocket, Stars & Planets',
    emoji: '🚀',
    imageSrc: '/src/assets/images/toddler_space_adventure_1791857753356.jpg',
  },
];

export const ALL_STICKERS: StickerReward[] = [
  { id: 'stk-star', name: 'Golden Star', emoji: '⭐', description: 'Awarded for bright work!' },
  { id: 'stk-sun', name: 'Sunny Smile', emoji: '☀️', description: 'Warm and cheerful!' },
  { id: 'stk-rainbow', name: 'Magic Rainbow', emoji: '🌈', description: 'Full of wonderful colors!' },
  { id: 'stk-teddy', name: 'Fluffy Bear', emoji: '🧸', description: 'Best hugging friend!' },
  { id: 'stk-dino', name: 'Baby Dino', emoji: '🦕', description: 'Rawr means I like it!' },
  { id: 'stk-crown', name: 'Golden Crown', emoji: '👑', description: 'Toddler champion!' },
  { id: 'stk-butterfly', name: 'Cute Butterfly', emoji: '🦋', description: 'Fluttering with joy!' },
  { id: 'stk-balloon', name: 'Party Balloon', emoji: '🎈', description: 'Up into the sky!' },
  { id: 'stk-heart', name: 'Love Heart', emoji: '💖', description: 'Made with lots of love!' },
  { id: 'stk-rocket', name: 'Rocket Spark', emoji: '🚀', description: 'To infinity and beyond!' },
  { id: 'stk-turtle', name: 'Happy Turtle', emoji: '🐢', description: 'Slow, steady and sweet!' },
  { id: 'stk-cupcake', name: 'Sweet Cupcake', emoji: '🧁', description: 'A tasty little treat!' },
];
