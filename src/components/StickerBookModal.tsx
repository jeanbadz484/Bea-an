import React from 'react';
import { X, Sparkles, Award } from 'lucide-react';
import { ALL_STICKERS } from '../data/puzzles';
import { sound } from '../utils/audio';

interface StickerBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  starCount: number;
}

export const StickerBookModal: React.FC<StickerBookModalProps> = ({
  isOpen,
  onClose,
  starCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border-4 border-amber-300 shadow-xl overflow-hidden animate-gentle-bounce flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-100 via-pink-100 to-purple-100 p-5 flex items-center justify-between border-b border-amber-200">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⭐</span>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800">My Sticker Album</h2>
              <p className="text-xs md:text-sm text-slate-600 font-semibold">
                Tap your stickers to hear them play!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-amber-500 text-white font-bold px-3 py-1.5 rounded-full text-sm shadow-xs">
              <span>⭐</span>
              <span className="font-mono tabular-nums">{starCount} Stars</span>
            </div>
            <button
              onClick={() => {
                sound.playPop(400);
                onClose();
              }}
              className="p-2 bg-white/80 hover:bg-white text-slate-700 rounded-full transition-colors cursor-pointer"
              aria-label="Close sticker book"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stickers Grid */}
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {ALL_STICKERS.map((sticker, idx) => {
              // Unlock progressively based on stars earned (e.g. 1 star per 2 stickers, or minimum 3 free to start)
              const isUnlocked = idx < 3 || starCount >= idx;

              return (
                <div
                  key={sticker.id}
                  onClick={() => {
                    if (isUnlocked) {
                      sound.playPop(500 + idx * 40);
                      sound.speak(sticker.name);
                    } else {
                      sound.playPop(300);
                    }
                  }}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    isUnlocked
                      ? 'bg-amber-50/60 border-amber-300 hover:scale-105 hover:bg-amber-100/80 shadow-xs active:scale-95'
                      : 'bg-slate-50 border-slate-200 opacity-40 cursor-not-allowed'
                  }`}
                >
                  <div className="text-5xl mb-2 select-none">
                    {isUnlocked ? sticker.emoji : '🔒'}
                  </div>
                  <span className="text-xs font-bold text-slate-800 text-center leading-tight">
                    {isUnlocked ? sticker.name : 'Mystery'}
                  </span>
                  <span className="text-[10px] text-slate-500 text-center mt-1">
                    {isUnlocked ? sticker.description : `Earn ${idx} ⭐`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-center">
          <button
            onClick={() => {
              sound.playPop(480);
              onClose();
            }}
            className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl transition-colors cursor-pointer shadow-xs"
          >
            Keep Playing!
          </button>
        </div>
      </div>
    </div>
  );
};
