import React from 'react';
import { Sparkles, Star, Heart, ArrowRight } from 'lucide-react';
import { ActivityTab } from '../types';
import { sound } from '../utils/audio';

interface HomeHeroProps {
  onSelectTab: (tab: ActivityTab) => void;
  starCount: number;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onSelectTab, starCount }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10 flex flex-col gap-10">
      {/* Playful Hero Banner */}
      <div className="relative bg-gradient-to-r from-amber-200 via-pink-200 to-sky-200 rounded-3xl p-6 md:p-10 border-4 border-white shadow-md overflow-hidden text-center flex flex-col items-center">
        {/* Floating decorative elements */}
        <span className="absolute top-4 left-6 text-3xl animate-gentle-bounce select-none">🎈</span>
        <span className="absolute bottom-4 left-10 text-3xl animate-gentle-wiggle select-none hidden sm:inline">🌟</span>
        <span className="absolute top-4 right-8 text-3xl animate-gentle-bounce select-none">🎨</span>
        <span className="absolute bottom-4 right-12 text-3xl animate-gentle-wiggle select-none hidden sm:inline">🚀</span>

        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-amber-900 font-extrabold text-sm mb-4 shadow-xs">
          <span>🌟</span>
          <span>Fun Early Learning for Toddlers & Preschoolers</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight max-w-2xl text-balance mb-4">
          Color, Trace & Solve Big Puzzles!
        </h1>

        <p className="text-base md:text-xl text-slate-700 max-w-xl font-medium mb-6">
          Designed specifically for tiny hands. Tap to color, follow cheerful tracing paths, and snap vibrant jigsaw puzzles into place!
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              sound.playPop(520);
              onSelectTab('coloring');
            }}
            className="flex items-center gap-2 px-6 py-3.5 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-2xl shadow-sm hover:scale-105 transition-all cursor-pointer text-base md:text-lg"
          >
            <span>🎨</span>
            <span>Coloring Book</span>
          </button>
          <button
            onClick={() => {
              sound.playPop(560);
              onSelectTab('tracing');
            }}
            className="flex items-center gap-2 px-6 py-3.5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-2xl shadow-sm hover:scale-105 transition-all cursor-pointer text-base md:text-lg"
          >
            <span>✏️</span>
            <span>Tracing Fun</span>
          </button>
          <button
            onClick={() => {
              sound.playPop(600);
              onSelectTab('puzzle');
            }}
            className="flex items-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-sm hover:scale-105 transition-all cursor-pointer text-base md:text-lg"
          >
            <span>🧩</span>
            <span>Jigsaw Puzzles</span>
          </button>
        </div>
      </div>

      {/* 3 Main Activity Hub Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Coloring Card */}
        <div
          onClick={() => {
            sound.playPop(520);
            onSelectTab('coloring');
          }}
          className="group relative bg-white rounded-3xl border-3 border-pink-200 hover:border-pink-400 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
        >
          <div>
            <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform">
              🎨
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Coloring Activities</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Tap-to-fill and magic crayon brush! Color cheerful kittens, happy cars, rockets, dinos, and rainbows. Includes printable coloring sheets.
            </p>
            <div className="flex flex-wrap gap-1.5 text-xs font-semibold text-slate-500 mb-6">
              <span>🐱 Kitty</span>
              <span>·</span>
              <span>🚗 Car</span>
              <span>·</span>
              <span>🚀 Rocket</span>
              <span>·</span>
              <span>🌈 Rainbow</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-pink-600 font-bold text-sm pt-4 border-t border-slate-100">
            <span>Play Coloring</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 2. Tracing Card */}
        <div
          onClick={() => {
            sound.playPop(560);
            onSelectTab('tracing');
          }}
          className="group relative bg-white rounded-3xl border-3 border-sky-200 hover:border-sky-400 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
        >
          <div>
            <div className="w-16 h-16 rounded-2xl bg-sky-100 flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform">
              ✏️
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Tracing & Phonics</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Gentle guided finger tracing for letters, numbers, and basic shapes. Real-time audio encouragement with phonetic speech pronunciation!
            </p>
            <div className="flex flex-wrap gap-1.5 text-xs font-semibold text-slate-500 mb-6">
              <span>ABC Letters</span>
              <span>·</span>
              <span>123 Numbers</span>
              <span>·</span>
              <span>Shapes & Paths</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sky-600 font-bold text-sm pt-4 border-t border-slate-100">
            <span>Play Tracing</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 3. Jigsaw Puzzles Card */}
        <div
          onClick={() => {
            sound.playPop(600);
            onSelectTab('puzzle');
          }}
          className="group relative bg-white rounded-3xl border-3 border-emerald-200 hover:border-emerald-400 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
        >
          <div>
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform">
              🧩
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Jigsaw Puzzles</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Magnetic snapping puzzle pieces designed for toddlers! 4, 6, and 9-piece difficulties featuring safari animals, ocean whales, and space pups.
            </p>
            <div className="flex flex-wrap gap-1.5 text-xs font-semibold text-slate-500 mb-6">
              <span>🦁 Safari</span>
              <span>·</span>
              <span>🐳 Ocean</span>
              <span>·</span>
              <span>🚜 Farm</span>
              <span>·</span>
              <span>🚀 Space</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-emerald-600 font-bold text-sm pt-4 border-t border-slate-100">
            <span>Play Puzzles</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Rewards Strip */}
      <div className="bg-amber-100/60 rounded-3xl border-2 border-amber-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-200 rounded-2xl flex items-center justify-center text-2xl">
            🏆
          </div>
          <div>
            <h3 className="text-base font-bold text-amber-950">My Rewards & Stickers</h3>
            <p className="text-xs text-amber-800 font-medium">
              You have earned <span className="font-bold tabular-nums">{starCount}</span> stars! Complete activities to unlock secret stickers.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playTwinkle();
            onSelectTab('stickers');
          }}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer shadow-xs whitespace-nowrap"
        >
          Open Sticker Book 🌟
        </button>
      </div>
    </div>
  );
};
