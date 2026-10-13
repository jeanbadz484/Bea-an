import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Eye, 
  EyeOff, 
  RotateCcw, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Volume2
} from 'lucide-react';
import { PUZZLES } from '../data/puzzles';
import { PuzzleData } from '../types';
import { sound } from '../utils/audio';

interface PuzzleActivityProps {
  onEarnStar: () => void;
}

type GridSize = 4 | 6 | 9; // 2x2, 3x2, 3x3

interface PuzzlePiece {
  id: number;
  row: number;
  col: number;
  currentSlot: number | null; // null if in tray, index if placed on board
  isLocked: boolean;
}

export const PuzzleActivity: React.FC<PuzzleActivityProps> = ({ onEarnStar }) => {
  const [selectedPuzzleIdx, setSelectedPuzzleIdx] = useState(0);
  const activePuzzle: PuzzleData = PUZZLES[selectedPuzzleIdx];

  const [pieceCount, setPieceCount] = useState<GridSize>(4);
  const [showGhostHint, setShowGhostHint] = useState<boolean>(true);
  const [selectedPieceId, setSelectedPieceId] = useState<number | null>(null);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const hasCelebrated = useRef(false);

  // Grid dimensions
  const cols = pieceCount === 4 ? 2 : pieceCount === 6 ? 3 : 3;
  const rows = pieceCount === 4 ? 2 : pieceCount === 6 ? 2 : 3;

  // Initialize and shuffle puzzle pieces
  const initPuzzle = () => {
    hasCelebrated.current = false;
    setIsCompleted(false);
    setSelectedPieceId(null);

    const newPieces: PuzzlePiece[] = [];
    let idCounter = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        newPieces.push({
          id: idCounter,
          row: r,
          col: c,
          currentSlot: null,
          isLocked: false,
        });
        idCounter++;
      }
    }

    // Shuffle tray order randomly
    const shuffled = [...newPieces].sort(() => Math.random() - 0.5);
    setPieces(shuffled);
    sound.speak(`Can you solve the ${activePuzzle.title}?`);
  };

  useEffect(() => {
    initPuzzle();
  }, [selectedPuzzleIdx, pieceCount]);

  // Handle piece selection from tray or board
  const handlePieceClick = (piece: PuzzlePiece) => {
    if (piece.isLocked || isCompleted) return;

    sound.playPop(520);
    if (selectedPieceId === piece.id) {
      setSelectedPieceId(null);
    } else {
      setSelectedPieceId(piece.id);
    }
  };

  // Handle slot click on board
  const handleSlotClick = (slotIndex: number) => {
    if (isCompleted) return;

    if (selectedPieceId === null) {
      // If a piece is already in this slot and not locked, pick it up
      const pieceInSlot = pieces.find(p => p.currentSlot === slotIndex && !p.isLocked);
      if (pieceInSlot) {
        sound.playPop(480);
        setSelectedPieceId(pieceInSlot.id);
      }
      return;
    }

    // Target position for slotIndex
    const targetRow = Math.floor(slotIndex / cols);
    const targetCol = slotIndex % cols;

    const piece = pieces.find(p => p.id === selectedPieceId);
    if (!piece) return;

    // Check if another locked piece is in this slot
    const existingPiece = pieces.find(p => p.currentSlot === slotIndex && p.id !== selectedPieceId);
    if (existingPiece && existingPiece.isLocked) return;

    const isCorrectPosition = piece.row === targetRow && piece.col === targetCol;

    // Update piece placement
    setPieces(prev => {
      const updated = prev.map(p => {
        if (p.id === piece.id) {
          return {
            ...p,
            currentSlot: slotIndex,
            isLocked: isCorrectPosition, // Magnetic snap locks correct piece!
          };
        }
        // If an unlocked piece was previously in this slot, return it to tray
        if (p.currentSlot === slotIndex && p.id !== piece.id && !p.isLocked) {
          return { ...p, currentSlot: null };
        }
        return p;
      });

      // Sound feedback
      if (isCorrectPosition) {
        sound.playSnap();
      } else {
        sound.playPop(420);
      }

      // Check win condition
      const allLocked = updated.every(p => p.isLocked);
      if (allLocked && !hasCelebrated.current) {
        hasCelebrated.current = true;
        setIsCompleted(true);
        handleVictory();
      }

      return updated;
    });

    setSelectedPieceId(null);
  };

  // Drag and drop support
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, piece: PuzzlePiece) => {
    if (piece.isLocked || isCompleted) return;
    sound.playPop(500);
    setSelectedPieceId(piece.id);
    e.dataTransfer.setData('text/plain', piece.id.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, slotIndex: number) => {
    e.preventDefault();
    const pieceIdStr = e.dataTransfer.getData('text/plain');
    const pId = parseInt(pieceIdStr, 10);
    if (!isNaN(pId)) {
      setSelectedPieceId(pId);
      handleSlotClick(slotIndex);
    }
  };

  const handleVictory = () => {
    sound.playCelebration();
    sound.speak(`Hooray! You completed the ${activePuzzle.title}! You are amazing!`);
    onEarnStar();
    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6']
    });
  };

  // Tray pieces are those with currentSlot === null
  const trayPieces = pieces.filter(p => p.currentSlot === null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 md:py-6 flex flex-col gap-6">
      {/* Puzzle Carousel */}
      <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-emerald-200 shadow-xs">
        <button
          onClick={() => {
            sound.playPop(480);
            setSelectedPuzzleIdx(i => (i > 0 ? i - 1 : PUZZLES.length - 1));
          }}
          className="p-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl transition-colors cursor-pointer shrink-0"
          aria-label="Previous puzzle"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 overflow-x-auto py-1 px-2 no-scrollbar">
          {PUZZLES.map((puzzle, idx) => (
            <button
              key={puzzle.id}
              onClick={() => {
                sound.playPop(520);
                setSelectedPuzzleIdx(idx);
              }}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 transition-all whitespace-nowrap cursor-pointer ${
                idx === selectedPuzzleIdx
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold scale-105 shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-emerald-50/50 text-slate-700'
              }`}
            >
              <span className="text-2xl">{puzzle.emoji}</span>
              <span className="text-sm md:text-base font-semibold">{puzzle.title}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            sound.playPop(480);
            setSelectedPuzzleIdx(i => (i < PUZZLES.length - 1 ? i + 1 : 0));
          }}
          className="p-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl transition-colors cursor-pointer shrink-0"
          aria-label="Next puzzle"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Main Board Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Puzzle Board Area */}
        <div className="lg:col-span-8 flex flex-col items-center">
          {/* Header Bar */}
          <div className="w-full flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{activePuzzle.emoji}</span>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800">{activePuzzle.title}</h2>
              <button
                onClick={() => sound.speak(activePuzzle.title)}
                className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                title="Hear name"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Ghost Guide Toggle */}
              <button
                onClick={() => {
                  sound.playPop(450);
                  setShowGhostHint(v => !v);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border font-bold text-xs md:text-sm shadow-xs transition-colors cursor-pointer ${
                  showGhostHint
                    ? 'bg-amber-100 border-amber-300 text-amber-900'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
                title="Toggle picture guide"
              >
                {showGhostHint ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                <span>{showGhostHint ? 'Hint ON' : 'Hint OFF'}</span>
              </button>

              {/* Reset / Reshuffle */}
              <button
                onClick={() => {
                  sound.playPop(380);
                  initPuzzle();
                }}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-xs md:text-sm shadow-xs cursor-pointer"
                title="Shuffle pieces"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Puzzle Frame */}
          <div className="relative w-full max-w-[560px] aspect-[4/3] bg-amber-100/70 p-3 sm:p-4 rounded-3xl border-4 border-emerald-400 shadow-md overflow-hidden">
            {/* Ghost Background Image (Optional Helper) */}
            {showGhostHint && !isCompleted && (
              <img
                src={activePuzzle.imageSrc}
                alt={activePuzzle.title}
                referrerPolicy="no-referrer"
                className="absolute inset-3 sm:inset-4 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] h-[calc(100%-1.5rem)] sm:h-[calc(100%-2rem)] object-cover opacity-25 rounded-2xl pointer-events-none"
              />
            )}

            {/* Victory Completed Full Image Banner */}
            {isCompleted ? (
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-inner animate-gentle-bounce">
                <img
                  src={activePuzzle.imageSrc}
                  alt={activePuzzle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end items-center p-6 text-white text-center">
                  <div className="flex items-center gap-2 text-2xl font-bold text-amber-300 mb-1">
                    <Sparkles className="w-7 h-7" />
                    <span>Puzzle Complete!</span>
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <p className="text-base text-white/90 font-medium">You did it all by yourself!</p>
                </div>
              </div>
            ) : (
              /* Puzzle Grid Slots */
              <div
                className="w-full h-full grid gap-2 sm:gap-2.5 rounded-2xl"
                style={{
                  gridTemplateColumns: `repeat(${cols}, 1fr)`,
                  gridTemplateRows: `repeat(${rows}, 1fr)`,
                }}
              >
                {Array.from({ length: pieceCount }).map((_, slotIndex) => {
                  const targetRow = Math.floor(slotIndex / cols);
                  const targetCol = slotIndex % cols;
                  const pieceInSlot = pieces.find(p => p.currentSlot === slotIndex);
                  const isSelected = selectedPieceId !== null && pieceInSlot?.id === selectedPieceId;

                  return (
                    <div
                      key={`slot-${slotIndex}`}
                      onClick={() => handleSlotClick(slotIndex)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, slotIndex)}
                      className={`relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all cursor-pointer select-none ${
                        pieceInSlot
                          ? pieceInSlot.isLocked
                            ? 'border-emerald-500 shadow-xs'
                            : 'border-amber-400 ring-2 ring-amber-300 shadow-xs'
                          : selectedPieceId !== null
                          ? 'border-emerald-400 border-dashed bg-emerald-50/50 hover:bg-emerald-100/60'
                          : 'border-slate-300 border-dashed bg-white/70'
                      }`}
                    >
                      {pieceInSlot ? (
                        /* Placed Piece Rendered with CSS Background Coordinates */
                        <div
                          className={`w-full h-full relative ${
                            isSelected ? 'ring-4 ring-pink-500' : ''
                          }`}
                          style={{
                            backgroundImage: `url(${activePuzzle.imageSrc})`,
                            backgroundSize: `${cols * 100}% ${rows * 100}%`,
                            backgroundPosition: `${(pieceInSlot.col / (cols - 1)) * 100}% ${(pieceInSlot.row / (rows - 1)) * 100}%`,
                          }}
                        >
                          {pieceInSlot.isLocked && (
                            <div className="absolute top-1.5 right-1.5 bg-emerald-500 text-white rounded-full p-0.5 shadow-xs">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs font-bold">
                          {slotIndex + 1}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <p className="mt-3 text-sm text-slate-500 font-medium text-center">
            {isCompleted
              ? '🎉 Super puzzle champion! Choose another puzzle above or change difficulty!'
              : selectedPieceId !== null
              ? '👉 Tap a slot on the board to place your chosen piece!'
              : '👆 Tap or drag a puzzle piece below to place it into the puzzle!'}
          </p>
        </div>

        {/* Right Sidebar: Difficulty & Shuffled Piece Tray */}
        <div className="lg:col-span-4 flex flex-col gap-5 bg-white p-4 sm:p-5 rounded-3xl border border-emerald-200 shadow-xs">
          {/* Toddler Difficulty Selector */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Puzzle Difficulty
            </label>
            <div className="grid grid-cols-3 gap-2">
              {([4, 6, 9] as GridSize[]).map(count => (
                <button
                  key={count}
                  onClick={() => {
                    sound.playPop(540);
                    setPieceCount(count);
                  }}
                  className={`py-2.5 px-2 rounded-2xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                    pieceCount === count
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-lg font-bold">{count} Pieces</span>
                  <span className="text-[11px] text-slate-500">
                    {count === 4 ? 'Toddler' : count === 6 ? 'Junior' : 'Master'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Piece Tray */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Puzzle Pieces ({trayPieces.length} Left)
              </label>
              {trayPieces.length === 0 && !isCompleted && (
                <span className="text-xs text-amber-600 font-bold">Almost there!</span>
              )}
            </div>

            {trayPieces.length === 0 && !isCompleted ? (
              <div className="p-6 text-center bg-emerald-50 rounded-2xl border border-emerald-200">
                <p className="text-sm font-bold text-emerald-800">All pieces placed on board!</p>
                <p className="text-xs text-emerald-600 mt-1">Tap pieces on board to rearrange if needed.</p>
              </div>
            ) : isCompleted ? (
              <div className="p-6 text-center bg-amber-50 rounded-2xl border border-amber-200 flex flex-col items-center">
                <Award className="w-12 h-12 text-amber-500 mb-2" />
                <h3 className="text-lg font-bold text-amber-900">Puzzle Solved!</h3>
                <p className="text-xs text-amber-700 mt-1 mb-4">You earned a shining gold star!</p>
                <button
                  onClick={() => {
                    sound.playPop(520);
                    setSelectedPuzzleIdx(i => (i < PUZZLES.length - 1 ? i + 1 : 0));
                  }}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl text-sm transition-colors cursor-pointer"
                >
                  Next Puzzle →
                </button>
              </div>
            ) : (
              /* Grid of pieces in tray */
              <div className="grid grid-cols-2 gap-3 max-h-[360px] overflow-y-auto p-1">
                {trayPieces.map(piece => {
                  const isSelected = selectedPieceId === piece.id;

                  return (
                    <div
                      key={`tray-${piece.id}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, piece)}
                      onClick={() => handlePieceClick(piece)}
                      className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-3 transition-all cursor-pointer select-none shadow-xs hover:scale-103 ${
                        isSelected
                          ? 'border-pink-500 ring-4 ring-pink-300 scale-105 z-10'
                          : 'border-emerald-300 hover:border-emerald-400'
                      }`}
                      style={{
                        backgroundImage: `url(${activePuzzle.imageSrc})`,
                        backgroundSize: `${cols * 100}% ${rows * 100}%`,
                        backgroundPosition: `${(piece.col / (cols - 1)) * 100}% ${(piece.row / (rows - 1)) * 100}%`,
                      }}
                    >
                      <div className="absolute inset-0 bg-black/5 hover:bg-transparent transition-colors" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
