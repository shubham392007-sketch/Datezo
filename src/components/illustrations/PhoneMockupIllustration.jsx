import React from 'react';

export function PhoneMockupIllustration({ className = "w-full max-w-xs mx-auto" }) {
  return (
    <div className={`relative ${className}`}>
      {/* Hand / Phone Outer Sticker Frame */}
      <div className="relative bg-white border-2 border-black rounded-[38px] p-4 shadow-sticker-lg">
        {/* Phone Notch & Speaker */}
        <div className="w-24 h-4 bg-ink rounded-full mx-auto mb-3 flex items-center justify-center">
          <div className="w-8 h-1 bg-gray-600 rounded-full" />
        </div>

        {/* Screen Content */}
        <div className="bg-[#FFFBF8] border border-black rounded-[28px] p-4 space-y-4 text-center overflow-hidden">
          {/* Header Badge */}
          <div className="inline-flex items-center gap-1.5 bg-pastel-pink px-3 py-1 rounded-full border border-black text-[11px] font-bold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-coral animate-ping" />
            DATEZO AI
          </div>

          {/* Match Probability Block */}
          <div>
            <div className="text-[11px] font-bold text-body uppercase tracking-wider">MATCH PROBABILITY</div>
            <div className="text-4xl font-black text-coral my-1">84.7%</div>
            <div className="inline-flex items-center gap-1 bg-pastel-green text-ink px-3 py-0.5 rounded-full border border-black text-xs font-bold">
              ✓ VERY HIGH COMPATIBILITY
            </div>
          </div>

          {/* Prediction Outcome Pill */}
          <div className="bg-coral text-white font-extrabold text-lg py-2 rounded-full border border-black shadow-sticker-sm">
            MATCH
          </div>

          {/* Compatibility Index Circle */}
          <div className="bg-white border border-black rounded-2xl p-3 shadow-sticker-sm">
            <div className="text-[10px] font-bold text-body uppercase tracking-wider mb-1">
              DATEZO COMPATIBILITY INDEX
            </div>
            <div className="flex items-center justify-between px-2">
              <div className="text-left">
                <div className="text-2xl font-black text-ink">87.4 <span className="text-sm font-normal text-body">/ 100</span></div>
                <div className="text-[9px] text-body italic">Derived score, not ground truth</div>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-pastel-green flex items-center justify-center font-extrabold text-sm text-ink bg-pastel-yellow border-t-coral border-r-coral">
                87
              </div>
            </div>
          </div>

          {/* Bottom Action Controls (Heart & X) */}
          <div className="flex justify-center items-center gap-4 pt-1">
            <div className="w-10 h-10 rounded-full border border-black bg-white flex items-center justify-center shadow-sticker-sm text-ink cursor-pointer hover:bg-pastel-pink">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="w-12 h-12 rounded-full border border-black bg-coral text-white flex items-center justify-center shadow-sticker-sm cursor-pointer hover:bg-coral-dark">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
