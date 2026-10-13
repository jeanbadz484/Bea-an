import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { ActivityTab } from '../types';
import { sound } from '../utils/audio';

interface NavbarProps {
  currentTab: ActivityTab;
  onSelectTab: (tab: ActivityTab) => void;
  starCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  starCount,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-amber-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single line, characterful display) */}
        <button
          onClick={() => {
            sound.playPop(520);
            onSelectTab('home');
          }}
          className="text-2xl font-bold tracking-tight text-amber-600 hover:text-amber-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <span className="text-3xl" role="img" aria-label="balloons">🎈</span>
          <span>ToddlerPlay</span>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="flex items-center gap-1 sm:gap-6 text-sm sm:text-base font-semibold text-slate-600">
          <button
            onClick={() => {
              sound.playPop(480);
              onSelectTab('home');
            }}
            className={`px-2 sm:px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              currentTab === 'home'
                ? 'bg-amber-100 text-amber-900 font-bold shadow-xs'
                : 'hover:text-amber-700 hover:bg-amber-50/60'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              sound.playPop(520);
              onSelectTab('coloring');
            }}
            className={`px-2 sm:px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              currentTab === 'coloring'
                ? 'bg-pink-100 text-pink-900 font-bold shadow-xs'
                : 'hover:text-pink-700 hover:bg-pink-50/60'
            }`}
          >
            Coloring
          </button>
          <button
            onClick={() => {
              sound.playPop(560);
              onSelectTab('tracing');
            }}
            className={`px-2 sm:px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              currentTab === 'tracing'
                ? 'bg-sky-100 text-sky-900 font-bold shadow-xs'
                : 'hover:text-sky-700 hover:bg-sky-50/60'
            }`}
          >
            Tracing
          </button>
          <button
            onClick={() => {
              sound.playPop(600);
              onSelectTab('puzzle');
            }}
            className={`px-2 sm:px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              currentTab === 'puzzle'
                ? 'bg-emerald-100 text-emerald-900 font-bold shadow-xs'
                : 'hover:text-emerald-700 hover:bg-emerald-50/60'
            }`}
          >
            Puzzles
          </button>
          <button
            onClick={() => {
              sound.playTwinkle();
              onSelectTab('stickers');
            }}
            className={`px-2 sm:px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              currentTab === 'stickers'
                ? 'bg-purple-100 text-purple-900 font-bold shadow-xs'
                : 'hover:text-purple-700 hover:bg-purple-50/60'
            }`}
          >
            Stickers
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Sound Toggle with Star Counter) */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            onClick={() => {
              sound.playTwinkle();
              onSelectTab('stickers');
            }}
            className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/90 px-3 py-1.5 rounded-full text-amber-900 font-bold text-sm cursor-pointer hover:bg-amber-100 transition-colors"
            title="View earned stars and stickers"
          >
            <span className="text-base">⭐</span>
            <span className="font-mono tabular-nums">{starCount}</span>
          </div>

          <button
            onClick={() => {
              onToggleSound();
              if (!soundEnabled) sound.playPop(600);
            }}
            className={`p-2.5 rounded-full border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
            }`}
            title={soundEnabled ? 'Mute Sounds' : 'Turn Sound On'}
            aria-label="Sound settings"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
