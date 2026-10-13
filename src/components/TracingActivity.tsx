import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Volume2, 
  Sparkles, 
  Check, 
  Star,
  Award
} from 'lucide-react';
import { TRACING_ITEMS } from '../data/tracingItems';
import { TracingPathData, TracingCategory } from '../types';
import { sound } from '../utils/audio';

interface TracingActivityProps {
  onEarnStar: () => void;
}

export const TracingActivity: React.FC<TracingActivityProps> = ({ onEarnStar }) => {
  const [activeCategory, setActiveCategory] = useState<TracingCategory>('letters');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredItems = TRACING_ITEMS.filter(item => item.category === activeCategory);
  const activeItem: TracingPathData = filteredItems[selectedIndex] || TRACING_ITEMS[0];

  // Traced points recorded by user
  const [userStrokes, setUserStrokes] = useState<{ x: number; y: number }[][]>([]);
  const [currentStroke, setCurrentStroke] = useState<{ x: number; y: number }[]>([]);
  const isTracing = useRef(false);

  // Waypoints progress tracking
  const [completedWaypoints, setCompletedWaypoints] = useState<Set<string>>(new Set());
  const [isCompleted, setIsCompleted] = useState(false);
  const hasCelebrated = useRef(false);

  // SVG ref for bounding rect coordinates
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Total waypoints across all strokes of this item
  const totalWaypointsCount = activeItem.strokes.reduce((acc, s) => acc + s.waypoints.length, 0);

  // Reset when item changes
  useEffect(() => {
    setUserStrokes([]);
    setCurrentStroke([]);
    setCompletedWaypoints(new Set());
    setIsCompleted(false);
    hasCelebrated.current = false;
    sound.speak(`${activeItem.symbol}! ${activeItem.label}`);
  }, [activeItem.id]);

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (isCompleted) return;
    isTracing.current = true;
    const pt = getSvgCoordinates(e);
    if (!pt) return;

    setCurrentStroke([pt]);
    checkWaypointHit(pt);
    sound.playPop(480);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isTracing.current || isCompleted) return;
    const pt = getSvgCoordinates(e);
    if (!pt) return;

    setCurrentStroke(prev => [...prev, pt]);
    checkWaypointHit(pt);
  };

  const handlePointerUp = () => {
    if (!isTracing.current) return;
    isTracing.current = false;
    if (currentStroke.length > 0) {
      setUserStrokes(prev => [...prev, currentStroke]);
      setCurrentStroke([]);
    }
  };

  const getSvgCoordinates = (e: React.PointerEvent<SVGSVGElement>): { x: number; y: number } | null => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const scaleX = 400 / rect.width;
    const scaleY = 400 / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    return { x, y };
  };

  // Check if toddler's finger came near one of the waypoints
  const checkWaypointHit = (pt: { x: number; y: number }) => {
    const hitRadius = 38; // generous toddler touch tolerance

    activeItem.strokes.forEach((stroke, sIdx) => {
      stroke.waypoints.forEach((wp, wpIdx) => {
        const wpKey = `${sIdx}-${wpIdx}`;
        if (!completedWaypoints.has(wpKey)) {
          const dist = Math.hypot(pt.x - wp.x, pt.y - wp.y);
          if (dist <= hitRadius) {
            setCompletedWaypoints(prev => {
              const next = new Set(prev);
              next.add(wpKey);

              // Sound cue for every newly hit waypoint!
              sound.playPop(420 + (next.size * 35));

              // Check if sufficient proportion of waypoints is hit (80%+ threshold for toddlers)
              const ratio = next.size / totalWaypointsCount;
              if (ratio >= 0.8 && !hasCelebrated.current) {
                hasCelebrated.current = true;
                setIsCompleted(true);
                handleCompletion();
              }
              return next;
            });
          }
        }
      });
    });
  };

  const handleCompletion = () => {
    sound.playCelebration();
    sound.speak(`Super! You traced ${activeItem.symbol}!`);
    onEarnStar();
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.55 },
      colors: ['#F59E0B', '#EC4899', '#3B82F6', '#10B981', '#8B5CF6']
    });
  };

  const handleReset = () => {
    sound.playPop(350);
    setUserStrokes([]);
    setCurrentStroke([]);
    setCompletedWaypoints(new Set());
    setIsCompleted(false);
    hasCelebrated.current = false;
  };

  const progressPercent = Math.min(100, Math.round((completedWaypoints.size / totalWaypointsCount) * 100));

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 md:py-6 flex flex-col gap-6">
      {/* Category Tabs: Letters, Numbers, Shapes */}
      <div className="flex items-center justify-center gap-3">
        {(['letters', 'numbers', 'shapes'] as TracingCategory[]).map(cat => {
          const isActive = activeCategory === cat;
          const label = cat === 'letters' ? 'ABC Letters' : cat === 'numbers' ? '123 Numbers' : 'Fun Shapes';
          const icon = cat === 'letters' ? '🔤' : cat === 'numbers' ? '🔢' : '🔷';

          return (
            <button
              key={cat}
              onClick={() => {
                sound.playPop(520);
                setActiveCategory(cat);
                setSelectedIndex(0);
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl border-2 font-bold text-base md:text-lg transition-all cursor-pointer ${
                isActive
                  ? 'border-sky-500 bg-sky-100 text-sky-950 scale-105 shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-sky-50 text-slate-700'
              }`}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Item Carousel Bar */}
      <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-sky-200 shadow-xs">
        <button
          onClick={() => {
            sound.playPop(480);
            setSelectedIndex(i => (i > 0 ? i - 1 : filteredItems.length - 1));
          }}
          className="p-3 bg-sky-100 hover:bg-sky-200 text-sky-900 rounded-xl transition-colors cursor-pointer shrink-0"
          aria-label="Previous item"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2.5 overflow-x-auto py-1 px-2 no-scrollbar">
          {filteredItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                sound.playPop(500);
                setSelectedIndex(idx);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all cursor-pointer ${
                idx === selectedIndex
                  ? 'border-sky-500 bg-sky-50 text-sky-900 font-extrabold scale-105 shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-lg">{item.symbol}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            sound.playPop(480);
            setSelectedIndex(i => (i < filteredItems.length - 1 ? i + 1 : 0));
          }}
          className="p-3 bg-sky-100 hover:bg-sky-200 text-sky-900 rounded-xl transition-colors cursor-pointer shrink-0"
          aria-label="Next item"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Main Tracing Board */}
      <div className="bg-white rounded-3xl border-4 border-sky-300 shadow-md p-6 flex flex-col md:flex-row items-center gap-8 justify-around">
        {/* Left: Phonics Card & Progress */}
        <div className="flex flex-col items-center text-center max-w-xs">
          <div className="text-7xl mb-3 animate-gentle-wiggle" role="img" aria-label="symbol icon">
            {activeItem.icon}
          </div>

          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-3xl font-extrabold text-slate-800">{activeItem.symbol}</h2>
            <button
              onClick={() => sound.speak(`${activeItem.symbol}! ${activeItem.label}`)}
              className="p-2 text-sky-600 hover:text-sky-700 hover:bg-sky-50 rounded-xl transition-colors cursor-pointer"
              title="Hear sound"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          <p className="text-lg text-slate-600 font-semibold mb-6">
            {activeItem.label}
          </p>

          {/* Progress Indicator */}
          <div className="w-full bg-slate-100 rounded-full h-5 p-1 border border-slate-200 mb-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-sky-400 to-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
            <span>Stars: {completedWaypoints.size} / {totalWaypointsCount}</span>
            <span>·</span>
            <span>{progressPercent}%</span>
          </div>

          {/* Victory Card */}
          {isCompleted && (
            <div className="mt-4 p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex flex-col items-center animate-gentle-bounce">
              <div className="flex items-center gap-1 text-emerald-700 font-bold text-base mb-2">
                <Award className="w-6 h-6 text-amber-500" />
                <span>Great Job, Star!</span>
              </div>
              <button
                onClick={() => {
                  sound.playPop(520);
                  setSelectedIndex(i => (i < filteredItems.length - 1 ? i + 1 : 0));
                }}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm shadow-xs transition-colors cursor-pointer"
              >
                Next Item →
              </button>
            </div>
          )}

          {/* Try Again Button */}
          <button
            onClick={handleReset}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Trace Again</span>
          </button>
        </div>

        {/* Right: SVG Interactive Tracing Board */}
        <div className="relative w-full max-w-[420px] aspect-square bg-sky-50/60 rounded-3xl border-3 border-dashed border-sky-300 p-4 select-none">
          <svg
            ref={svgRef}
            viewBox="0 0 400 400"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="w-full h-full canvas-touch-none cursor-pointer"
          >
            {/* Background Target Guide Track (Grey thick path) */}
            {activeItem.strokes.map((stroke, sIdx) => (
              <path
                key={`bg-stroke-${sIdx}`}
                d={stroke.guidePath}
                fill="none"
                stroke="#CBD5E1"
                strokeWidth="42"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {/* Dotted Centerline Guide */}
            {activeItem.strokes.map((stroke, sIdx) => (
              <path
                key={`dash-stroke-${sIdx}`}
                d={stroke.guidePath}
                fill="none"
                stroke="#64748B"
                strokeWidth="4"
                strokeDasharray="8 8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {/* Waypoint Star Nodes */}
            {activeItem.strokes.map((stroke, sIdx) => (
              stroke.waypoints.map((wp, wpIdx) => {
                const wpKey = `${sIdx}-${wpIdx}`;
                const isHit = completedWaypoints.has(wpKey);
                const isStart = wpIdx === 0;

                return (
                  <g key={wpKey} transform={`translate(${wp.x}, ${wp.y})`}>
                    <circle
                      r={isStart ? 18 : 12}
                      fill={isHit ? '#10B981' : isStart ? '#F59E0B' : '#E2E8F0'}
                      stroke={isHit ? '#059669' : isStart ? '#D97706' : '#94A3B8'}
                      strokeWidth="3"
                    />
                    {isHit ? (
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="14"
                        fill="#FFFFFF"
                        fontWeight="bold"
                      >
                        ✓
                      </text>
                    ) : isStart ? (
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="14"
                        fill="#FFFFFF"
                        fontWeight="bold"
                      >
                        {sIdx + 1}
                      </text>
                    ) : (
                      <circle r="3" fill="#64748B" />
                    )}
                  </g>
                );
              })
            ))}

            {/* User Traced Lines (Completed user strokes) */}
            {userStrokes.map((stroke, sIdx) => {
              if (stroke.length < 2) return null;
              const d = stroke.reduce(
                (acc, pt, i) => (i === 0 ? `M${pt.x},${pt.y}` : `${acc} L${pt.x},${pt.y}`),
                ''
              );
              return (
                <path
                  key={`user-stroke-${sIdx}`}
                  d={d}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="28"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.85"
                />
              );
            })}

            {/* Active User Current Stroke being drawn */}
            {currentStroke.length > 1 && (
              <path
                d={currentStroke.reduce(
                  (acc, pt, i) => (i === 0 ? `M${pt.x},${pt.y}` : `${acc} L${pt.x},${pt.y}`),
                  ''
                )}
                fill="none"
                stroke="#38BDF8"
                strokeWidth="28"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.9"
              />
            )}
          </svg>

          {/* Toddler Hint Toast */}
          <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none">
            <span className="bg-white/90 border border-sky-200 text-sky-800 text-xs md:text-sm font-bold px-3 py-1 rounded-full shadow-xs">
              👆 Drag finger or mouse along the dotted line!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
