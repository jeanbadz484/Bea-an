import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  RotateCcw, 
  Download, 
  Printer, 
  Sparkles, 
  Paintbrush, 
  CheckCircle2, 
  Eraser, 
  Sticker as StickerIcon,
  ChevronLeft,
  ChevronRight,
  Volume2
} from 'lucide-react';
import { COLORING_PAGES, COLOR_PALETTE, STAMP_ICONS } from '../data/coloringPages';
import { ColoringPageData } from '../types';
import { sound } from '../utils/audio';

interface ColoringActivityProps {
  onEarnStar: () => void;
}

type DrawMode = 'fill' | 'brush' | 'stamp';

interface StampItem {
  id: string;
  emoji: string;
  x: number;
  y: number;
  scale: number;
}

export const ColoringActivity: React.FC<ColoringActivityProps> = ({ onEarnStar }) => {
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);
  const activePage: ColoringPageData = COLORING_PAGES[selectedPageIndex];

  // Colors map for SVG shapes
  const [shapeColors, setShapeColors] = useState<Record<string, string>>({});
  // History stack for undo
  const [history, setHistory] = useState<Record<string, string>[]>([]);

  // Selected tool states
  const [activeColor, setActiveColor] = useState<string>(COLOR_PALETTE[0].hex);
  const [drawMode, setDrawMode] = useState<DrawMode>('fill');
  const [brushSize, setBrushSize] = useState<number>(18);
  const [activeStamp, setActiveStamp] = useState<string>(STAMP_ICONS[0].emoji);
  const [placedStamps, setPlacedStamps] = useState<StampItem[]>([]);
  const [hasEarnedStar, setHasEarnedStar] = useState<boolean>(false);

  // Freehand drawing canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef<boolean>(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  // Reset page state when switching pages
  useEffect(() => {
    setShapeColors({});
    setHistory([]);
    setPlacedStamps([]);
    setHasEarnedStar(false);
    clearCanvas();
    sound.speak(`Let's color the ${activePage.title}!`);
  }, [selectedPageIndex]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  // Tap-to-fill handler
  const handleShapeClick = (shapeId: string) => {
    if (drawMode !== 'fill') return;

    sound.playPop(500 + Math.random() * 200);

    setShapeColors(prev => {
      const next = { ...prev, [shapeId]: activeColor === 'eraser' ? '#FFFFFF' : activeColor };
      setHistory(h => [...h, prev]);

      // Check if toddler colored 4+ shapes to reward a star!
      const coloredCount = Object.keys(next).length;
      if (coloredCount >= 4 && !hasEarnedStar) {
        setHasEarnedStar(true);
        triggerToddlerCelebration();
      }
      return next;
    });
  };

  const triggerToddlerCelebration = () => {
    sound.playCelebration();
    sound.speak("Wow, beautiful coloring! You earned a star!");
    onEarnStar();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Stamp placement
  const handleSvgOrCanvasClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (drawMode !== 'stamp') return;

    const rect = e.currentTarget.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = ((clientX - rect.left) / rect.width) * 500;
    const y = ((clientY - rect.top) / rect.height) * 500;

    sound.playPop(750);
    setPlacedStamps(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        emoji: activeStamp,
        x,
        y,
        scale: 1 + (Math.random() * 0.4 - 0.2)
      }
    ]);
  };

  // Freehand drawing handlers
  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (drawMode !== 'brush') return;
    isDrawing.current = true;
    sound.playBrush();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    lastPoint.current = { x, y };

    drawStroke(x, y);
  };

  const drawMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || drawMode !== 'brush') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    drawStroke(x, y);
  };

  const stopDrawing = () => {
    isDrawing.current = false;
    lastPoint.current = null;
  };

  const drawStroke = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;

    if (activeColor === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = activeColor;
    }

    ctx.beginPath();
    if (lastPoint.current) {
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    lastPoint.current = { x, y };
  };

  const handleUndo = () => {
    if (history.length > 0) {
      sound.playPop(420);
      const previous = history[history.length - 1];
      setHistory(h => h.slice(0, -1));
      setShapeColors(previous);
    } else if (placedStamps.length > 0) {
      sound.playPop(420);
      setPlacedStamps(s => s.slice(0, -1));
    }
  };

  const handleClearAll = () => {
    sound.playPop(350);
    setShapeColors({});
    setHistory([]);
    setPlacedStamps([]);
    clearCanvas();
  };

  const handleDownload = () => {
    sound.playTwinkle();
    // Render SVG and Canvas onto an offscreen canvas to download as PNG
    const offscreen = document.createElement('canvas');
    offscreen.width = 1000;
    offscreen.height = 1000;
    const ctx = offscreen.getContext('2d');
    if (!ctx) return;

    // White background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 1000, 1000);

    const svgElement = document.getElementById('coloring-svg-art');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 1000, 1000);

      // Draw canvas strokes if any
      if (canvasRef.current) {
        ctx.drawImage(canvasRef.current, 0, 0, 1000, 1000);
      }

      // Draw stamps
      placedStamps.forEach(s => {
        ctx.font = `${40 * s.scale * 2}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(s.emoji, s.x * 2, s.y * 2);
      });

      const a = document.createElement('a');
      a.download = `toddler-artwork-${activePage.id}.png`;
      a.href = offscreen.toDataURL('image/png');
      a.click();
      URL.revokeObjectURL(blobURL);
      sound.speak("Saved your wonderful painting!");
    };
    img.src = blobURL;
  };

  const handlePrint = () => {
    sound.playTwinkle();
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 md:py-6 flex flex-col gap-6">
      {/* Page Selector Carousel / Strip */}
      <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-amber-200 shadow-xs">
        <button
          onClick={() => {
            sound.playPop(480);
            setSelectedPageIndex(p => (p > 0 ? p - 1 : COLORING_PAGES.length - 1));
          }}
          className="p-3 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl transition-colors cursor-pointer shrink-0"
          aria-label="Previous coloring page"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 overflow-x-auto py-1 px-2 no-scrollbar">
          {COLORING_PAGES.map((page, idx) => (
            <button
              key={page.id}
              onClick={() => {
                sound.playPop(520);
                setSelectedPageIndex(idx);
              }}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 transition-all whitespace-nowrap cursor-pointer ${
                idx === selectedPageIndex
                  ? 'border-pink-500 bg-pink-50 text-pink-950 font-bold scale-105 shadow-sm'
                  : 'border-slate-200 bg-white hover:bg-amber-50 text-slate-700'
              }`}
            >
              <span className="text-2xl">{page.emoji}</span>
              <span className="text-sm md:text-base font-semibold">{page.title}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            sound.playPop(480);
            setSelectedPageIndex(p => (p < COLORING_PAGES.length - 1 ? p + 1 : 0));
          }}
          className="p-3 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl transition-colors cursor-pointer shrink-0"
          aria-label="Next coloring page"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Main Activity Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center: The Canvas & Coloring Sheet */}
        <div className="lg:col-span-8 flex flex-col items-center">
          {/* Header Controls for toddlers */}
          <div className="w-full flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{activePage.emoji}</span>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800">{activePage.title}</h2>
              <button
                onClick={() => sound.speak(activePage.title)}
                className="p-1.5 text-amber-600 hover:text-amber-700 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
                title="Hear name"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleUndo}
                className="flex items-center gap-1 px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-sm shadow-xs cursor-pointer"
                title="Undo last action"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Undo</span>
              </button>
              <button
                onClick={handleClearAll}
                className="px-3 py-2 bg-white border border-rose-200 hover:bg-rose-50 text-rose-700 rounded-xl font-bold text-sm shadow-xs cursor-pointer"
                title="Clear Page"
              >
                Reset
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-xs transition-colors cursor-pointer"
                title="Save picture"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Save</span>
              </button>
            </div>
          </div>

          {/* Interactive Artboard Container */}
          <div 
            onClick={handleSvgOrCanvasClick}
            className="relative w-full max-w-[540px] aspect-square bg-white rounded-3xl border-4 border-amber-300 shadow-md p-4 sm:p-6 overflow-hidden select-none cursor-pointer"
          >
            {/* SVG Interactive Outlines & Colored Shapes */}
            <svg
              id="coloring-svg-art"
              viewBox={activePage.viewBox}
              className="w-full h-full pointer-events-auto"
            >
              {/* Closed filled shapes that toddlers tap */}
              {activePage.shapes.map(shape => {
                const fillColor = shapeColors[shape.id] || shape.defaultColor || '#FFFFFF';
                return (
                  <path
                    key={shape.id}
                    d={shape.d}
                    fill={fillColor}
                    stroke="#334155"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShapeClick(shape.id);
                    }}
                    className={`transition-colors duration-150 ${
                      drawMode === 'fill' ? 'hover:brightness-95 cursor-pointer' : ''
                    }`}
                  />
                );
              })}

              {/* Bold black detail outlines on top */}
              {activePage.outlinePaths.map((d, i) => (
                <path
                  key={`outline-${i}`}
                  d={d}
                  fill="none"
                  stroke="#1E293B"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="pointer-events-none"
                />
              ))}
            </svg>

            {/* Freehand Canvas Overlay */}
            <canvas
              ref={canvasRef}
              width={500}
              height={500}
              onPointerDown={startDrawing}
              onPointerMove={drawMove}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
              className={`absolute inset-0 w-full h-full canvas-touch-none ${
                drawMode === 'brush' ? 'pointer-events-auto cursor-crosshair' : 'pointer-events-none'
              }`}
            />

            {/* Placed Sticker Stamps Overlay */}
            {placedStamps.map(stamp => (
              <div
                key={stamp.id}
                style={{
                  left: `${(stamp.x / 500) * 100}%`,
                  top: `${(stamp.y / 500) * 100}%`,
                  transform: `translate(-50%, -50%) scale(${stamp.scale})`,
                }}
                className="absolute pointer-events-none text-4xl select-none animate-gentle-bounce"
              >
                {stamp.emoji}
              </div>
            ))}
          </div>

          <p className="mt-3 text-sm text-slate-500 font-medium text-center">
            {drawMode === 'fill' && '👉 Tap any area of the drawing to fill it with color!'}
            {drawMode === 'brush' && '✏️ Drag your finger or mouse to draw and scribble!'}
            {drawMode === 'stamp' && '⭐ Tap anywhere on the page to place fun stickers!'}
          </p>
        </div>

        {/* Right Sidebar: Toddler Toolset & Giant Color Palettes */}
        <div className="lg:col-span-4 flex flex-col gap-5 bg-white p-4 sm:p-5 rounded-3xl border border-amber-200 shadow-xs">
          {/* Tool Modes (Tap-to-Fill, Freehand Brush, Cute Stamps) */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Coloring Mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  sound.playPop(520);
                  setDrawMode('fill');
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                  drawMode === 'fill'
                    ? 'border-pink-500 bg-pink-50 text-pink-900 font-bold shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <span className="text-2xl mb-1">🪣</span>
                <span className="text-xs font-bold whitespace-nowrap">Tap & Fill</span>
              </button>

              <button
                onClick={() => {
                  sound.playPop(560);
                  setDrawMode('brush');
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                  drawMode === 'brush'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-900 font-bold shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Paintbrush className="w-6 h-6 mb-1 text-indigo-600" />
                <span className="text-xs font-bold whitespace-nowrap">Magic Brush</span>
              </button>

              <button
                onClick={() => {
                  sound.playPop(600);
                  setDrawMode('stamp');
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                  drawMode === 'stamp'
                    ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <span className="text-2xl mb-1">✨</span>
                <span className="text-xs font-bold whitespace-nowrap">Stickers</span>
              </button>
            </div>
          </div>

          {/* If Stamp Mode: Stamp Picker */}
          {drawMode === 'stamp' ? (
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Choose a Stamp
              </label>
              <div className="grid grid-cols-4 gap-2">
                {STAMP_ICONS.map(stamp => (
                  <button
                    key={stamp.id}
                    onClick={() => {
                      sound.playPop(650);
                      setActiveStamp(stamp.emoji);
                    }}
                    className={`aspect-square flex items-center justify-center text-3xl rounded-2xl border-2 transition-all cursor-pointer ${
                      activeStamp === stamp.emoji
                        ? 'border-amber-500 bg-amber-100 scale-110 shadow-xs'
                        : 'border-slate-200 hover:bg-amber-50'
                    }`}
                  >
                    {stamp.emoji}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Color Palette for Fill and Brush */
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Jumbo Kid Colors
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {COLOR_PALETTE.map(color => {
                  const isEraser = color.hex === 'eraser';
                  const isSelected = activeColor === color.hex;

                  return (
                    <button
                      key={color.name}
                      onClick={() => {
                        sound.playPop(580);
                        setActiveColor(color.hex);
                      }}
                      className={`h-12 rounded-2xl flex items-center justify-center border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'ring-4 ring-offset-2 ring-pink-400 scale-105 shadow-sm'
                          : 'hover:scale-102 border-slate-200'
                      }`}
                      style={{
                        backgroundColor: isEraser ? '#F1F5F9' : color.hex,
                      }}
                      title={color.name}
                    >
                      {isEraser ? (
                        <Eraser className="w-5 h-5 text-slate-600" />
                      ) : (
                        isSelected && (
                          <CheckCircle2
                            className={`w-5 h-5 ${
                              color.hex === '#FFFFFF' || color.hex === '#FDE047' || color.hex === '#FBBF24'
                                ? 'text-slate-800'
                                : 'text-white'
                            }`}
                          />
                        )
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Brush Thickness (When in Brush mode) */}
              {drawMode === 'brush' && (
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Crayon Size
                  </span>
                  <div className="flex items-center gap-3">
                    {[10, 18, 30].map(size => (
                      <button
                        key={size}
                        onClick={() => {
                          sound.playPop(490);
                          setBrushSize(size);
                        }}
                        className={`flex-1 py-2 rounded-xl border-2 flex items-center justify-center gap-1 font-bold text-xs cursor-pointer ${
                          brushSize === size
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span
                          className="rounded-full bg-slate-800 inline-block"
                          style={{ width: size / 2, height: size / 2 }}
                        />
                        {size === 10 ? 'Thin' : size === 18 ? 'Medium' : 'Jumbo'}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Print Out for parents */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-2 py-3 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold rounded-2xl transition-colors cursor-pointer"
            >
              <Printer className="w-5 h-5" />
              <span>Print Coloring Page</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
