import React from 'react';

export function DatezoLogo({ className = "h-8", variant = "default" }) {
  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center gap-1.5 font-poppins font-extrabold tracking-tight ${className}`}>
        <div className="w-9 h-9 bg-ink rounded-xl border border-black flex items-center justify-center shadow-sticker-sm text-white relative overflow-hidden">
          <span className="text-xl">D</span>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-coral rounded-full border border-black flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  const dateColor = variant === "white" ? "#FFFFFF" : "#1A1A1A";
  const zoColor = "#F28B94";

  return (
    <div className={`inline-flex items-center gap-1 font-poppins font-black text-2xl tracking-tighter uppercase select-none ${className}`}>
      <span style={{ color: dateColor }}>DATE</span>
      <span style={{ color: zoColor }} className="relative">
        ZO
        <svg className="absolute -top-1 -right-3.5 w-4 h-4 text-coral" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          <path d="M9 12l2 2 4-4" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </span>
    </div>
  );
}
