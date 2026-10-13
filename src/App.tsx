/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { ColoringActivity } from './components/ColoringActivity';
import { TracingActivity } from './components/TracingActivity';
import { PuzzleActivity } from './components/PuzzleActivity';
import { StickerBookModal } from './components/StickerBookModal';
import { ActivityTab } from './types';
import { sound } from './utils/audio';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ActivityTab>('home');
  const [starCount, setStarCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('toddlerplay_stars');
      return saved ? parseInt(saved, 10) : 3; // start with 3 friendly stars!
    } catch {
      return 3;
    }
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('toddlerplay_sound');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });
  const [isStickerModalOpen, setIsStickerModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('toddlerplay_stars', starCount.toString());
    } catch {}
  }, [starCount]);

  useEffect(() => {
    sound.enabled = soundEnabled;
    try {
      localStorage.setItem('toddlerplay_sound', soundEnabled.toString());
    } catch {}
  }, [soundEnabled]);

  const handleEarnStar = () => {
    setStarCount(prev => prev + 1);
  };

  const handleToggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  const handleSelectTab = (tab: ActivityTab) => {
    if (tab === 'stickers') {
      setIsStickerModalOpen(true);
    } else {
      setCurrentTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-800">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        starCount={starCount}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {currentTab === 'home' && (
          <HomeHero
            onSelectTab={handleSelectTab}
            starCount={starCount}
          />
        )}

        {currentTab === 'coloring' && (
          <ColoringActivity
            onEarnStar={handleEarnStar}
          />
        )}

        {currentTab === 'tracing' && (
          <TracingActivity
            onEarnStar={handleEarnStar}
          />
        )}

        {currentTab === 'puzzle' && (
          <PuzzleActivity
            onEarnStar={handleEarnStar}
          />
        )}
      </main>

      {/* Floating Bottom Quick Bar on Mobile for Tiny Toddler Thumbs */}
      <div className="md:hidden fixed bottom-3 left-4 right-4 z-30 bg-white/95 backdrop-blur border-2 border-amber-300 rounded-2xl shadow-lg p-2 flex items-center justify-around">
        <button
          onClick={() => handleSelectTab('home')}
          className={`flex flex-col items-center p-1.5 rounded-xl text-xs font-bold ${
            currentTab === 'home' ? 'text-amber-600' : 'text-slate-500'
          }`}
        >
          <span className="text-xl">🏠</span>
          <span>Home</span>
        </button>
        <button
          onClick={() => handleSelectTab('coloring')}
          className={`flex flex-col items-center p-1.5 rounded-xl text-xs font-bold ${
            currentTab === 'coloring' ? 'text-pink-600' : 'text-slate-500'
          }`}
        >
          <span className="text-xl">🎨</span>
          <span>Color</span>
        </button>
        <button
          onClick={() => handleSelectTab('tracing')}
          className={`flex flex-col items-center p-1.5 rounded-xl text-xs font-bold ${
            currentTab === 'tracing' ? 'text-sky-600' : 'text-slate-500'
          }`}
        >
          <span className="text-xl">✏️</span>
          <span>Trace</span>
        </button>
        <button
          onClick={() => handleSelectTab('puzzle')}
          className={`flex flex-col items-center p-1.5 rounded-xl text-xs font-bold ${
            currentTab === 'puzzle' ? 'text-emerald-600' : 'text-slate-500'
          }`}
        >
          <span className="text-xl">🧩</span>
          <span>Puzzle</span>
        </button>
        <button
          onClick={() => handleSelectTab('stickers')}
          className="flex flex-col items-center p-1.5 rounded-xl text-xs font-bold text-amber-500"
        >
          <span className="text-xl">⭐</span>
          <span>Stars</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-amber-200/80 py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎈</span>
            <span className="font-bold text-slate-700">ToddlerPlay</span>
            <span aria-hidden="true">·</span>
            <span>Early Childhood Learning, Coloring & Puzzles</span>
          </div>
          <div className="flex items-center gap-4 font-semibold text-slate-600">
            <span>Preschool Safe</span>
            <span aria-hidden="true">·</span>
            <span>No Ads</span>
            <span aria-hidden="true">·</span>
            <span>Web Audio Feedback</span>
          </div>
        </div>
      </footer>

      {/* Sticker Album Modal */}
      <StickerBookModal
        isOpen={isStickerModalOpen}
        onClose={() => setIsStickerModalOpen(false)}
        starCount={starCount}
      />
    </div>
  );
}
