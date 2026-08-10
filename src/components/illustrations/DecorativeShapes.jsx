import React from 'react';

export function CoralStarburst({ className = "w-6 h-6 text-coral" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" stroke="#1A1A1A" strokeWidth="1.5" />
    </svg>
  );
}

export function SpiralSquiggle({ className = "w-12 h-6 text-ink" }) {
  return (
    <svg className={className} viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <path d="M10 20 Q 25 5, 40 20 T 70 20 T 90 20" />
    </svg>
  );
}

export function HandDrawnUnderline({ className = "w-full h-3 text-coral" }) {
  return (
    <svg className={className} viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
      <path d="M4 8 C 40 2, 80 10, 120 4 C 150 1, 180 8, 196 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function HeartSticker({ className = "w-8 h-8 text-coral" }) {
  return (
    <div className={`inline-flex items-center justify-center p-1.5 bg-pastel-pink border border-black rounded-full shadow-sticker-sm ${className}`}>
      <svg className="w-full h-full text-coral fill-current" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </div>
  );
}
