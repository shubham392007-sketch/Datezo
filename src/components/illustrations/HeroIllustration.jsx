import React from 'react';

export function HeroIllustration({ className = "w-full max-w-xl mx-auto" }) {
  return (
    <div className={`relative ${className}`}>
      {/* Background Decorative Cloud Blob */}
      <div className="absolute -inset-4 bg-pastel-pink/50 rounded-full blur-2xl -z-10 transform scale-110" />

      {/* Floating DATEZO AI Card (Sticker Badge) */}
      <div className="absolute -top-6 right-12 z-20 bg-white border border-black rounded-xl p-3 shadow-sticker transform rotate-3 animate-pulse">
        <div className="text-[10px] font-bold tracking-widest text-body text-center mb-0.5">DATEZO AI</div>
        <div className="text-xs font-semibold text-center text-ink">MATCH</div>
        <div className="text-2xl font-black text-coral text-center">84.7%</div>
        <div className="flex justify-center mt-1">
          <div className="w-5 h-5 bg-coral rounded-full flex items-center justify-center border border-black shadow-sm">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Floating Envelope Sticker Left */}
      <div className="absolute top-8 left-4 z-20 bg-white border border-black rounded-lg p-2 shadow-sticker-sm transform -rotate-6">
        <svg className="w-6 h-6 text-coral" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      </div>

      {/* Floating Heart Sticker Center Top */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 bg-pastel-pink border border-black rounded-full p-2 shadow-sticker-sm animate-bounce">
        <svg className="w-5 h-5 text-coral fill-current" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>

      {/* Main Flat-Vector Illustration SVG */}
      <svg className="w-full h-auto drop-shadow-md" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Table Shadow */}
        <ellipse cx="300" cy="370" rx="220" ry="18" fill="#1A1A1A" opacity="0.08" />

        {/* Table Top */}
        <ellipse cx="300" cy="340" rx="160" ry="24" fill="#FBECAF" stroke="#1A1A1A" strokeWidth="3" />
        <path d="M140 340 v40 M460 340 v40" stroke="#1A1A1A" strokeWidth="4" />
        <ellipse cx="300" cy="348" rx="140" ry="16" fill="#F8E59B" />

        {/* Flower Vase & Teacups on Table */}
        <path d="M292 320 h16 l-3 20 h-10 z" fill="#FFFBF8" stroke="#1A1A1A" strokeWidth="2" />
        <path d="M295 305 Q300 290 302 280" stroke="#1A1A1A" strokeWidth="2" />
        <circle cx="302" cy="278" r="6" fill="#F28B94" stroke="#1A1A1A" strokeWidth="1.5" />
        
        {/* Male Teacup */}
        <path d="M230 330 h16 v10 h-16 z" fill="#CDEFFB" stroke="#1A1A1A" strokeWidth="2" />
        <path d="M246 332 a 4 4 0 0 1 0 6" stroke="#1A1A1A" strokeWidth="2" fill="none" />

        {/* Female Teacup */}
        <path d="M350 330 h16 v10 h-16 z" fill="#FFD5D8" stroke="#1A1A1A" strokeWidth="2" />
        <path d="M350 332 a 4 4 0 0 0 0 6" stroke="#1A1A1A" strokeWidth="2" fill="none" />

        {/* --- MALE CHARACTER (LEFT) --- */}
        <g id="male-character">
          {/* Chair Left */}
          <path d="M170 280 v90 M150 250 h40 v40 h-40 z" fill="#F28B94" stroke="#1A1A1A" strokeWidth="3" />
          
          {/* Male Body / Sweater */}
          <path d="M210 330 C200 260 250 230 270 240 C280 270 260 330 260 340 Z" fill="#F28B94" stroke="#1A1A1A" strokeWidth="3" />
          {/* Male Arm reaching forward */}
          <path d="M250 270 Q270 300 240 330" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
          
          {/* Male Neck & Head */}
          <rect x="238" y="210" width="16" height="25" fill="#FCD5CE" stroke="#1A1A1A" strokeWidth="2.5" rx="4" />
          <ellipse cx="245" cy="180" rx="28" ry="32" fill="#FCD5CE" stroke="#1A1A1A" strokeWidth="3" />
          
          {/* Male Hair */}
          <path d="M218 175 C220 145 270 145 275 170 C265 155 235 155 218 175 Z" fill="#1A1A1A" stroke="#1A1A1A" strokeWidth="2" />
          
          {/* Male Facial Features */}
          <circle cx="255" cy="178" r="3" fill="#1A1A1A" />
          <path d="M258 192 Q265 198 258 202" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M248 168 Q258 165 262 170" fill="none" stroke="#1A1A1A" strokeWidth="2" />
          {/* Ear */}
          <circle cx="218" cy="182" r="5" fill="#FCD5CE" stroke="#1A1A1A" strokeWidth="2" />
        </g>

        {/* --- FEMALE CHARACTER (RIGHT) --- */}
        <g id="female-character">
          {/* Chair Right */}
          <path d="M430 280 v90 M410 250 h40 v40 h-40 z" fill="#FBECAF" stroke="#1A1A1A" strokeWidth="3" />

          {/* Female Hair Back */}
          <path d="M335 180 C325 240 340 310 365 330 C380 320 375 240 365 180 Z" fill="#1A1A1A" />

          {/* Female Body / Dress */}
          <path d="M390 330 C400 260 350 230 330 240 C320 270 340 330 340 340 Z" fill="#FBECAF" stroke="#1A1A1A" strokeWidth="3" />
          {/* Female Arm */}
          <path d="M350 270 Q330 300 360 330" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Female Neck & Head */}
          <rect x="346" y="210" width="16" height="25" fill="#FCD5CE" stroke="#1A1A1A" strokeWidth="2.5" rx="4" />
          <ellipse cx="355" cy="180" rx="26" ry="30" fill="#FCD5CE" stroke="#1A1A1A" strokeWidth="3" />

          {/* Female Hair Front */}
          <path d="M330 170 C340 140 385 145 385 175 C370 155 340 155 330 170 Z" fill="#1A1A1A" stroke="#1A1A1A" strokeWidth="2" />

          {/* Female Facial Features */}
          <circle cx="345" cy="178" r="3" fill="#1A1A1A" />
          <path d="M342 192 Q335 198 342 202" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M338 168 Q348 165 352 170" fill="none" stroke="#1A1A1A" strokeWidth="2" />
          {/* Ear */}
          <circle cx="382" cy="182" r="5" fill="#FCD5CE" stroke="#1A1A1A" strokeWidth="2" />
        </g>

        {/* Big Pink Heart Between Them */}
        <path d="M300 230 C290 200 250 200 250 235 C250 265 300 290 300 290 C300 290 350 265 350 235 C350 200 310 200 300 230 Z" fill="#FFD5D8" stroke="#1A1A1A" strokeWidth="3" />
        <path d="M285 220 Q292 215 295 222" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Decorative Sparkles & Lines */}
        <path d="M120 120 L128 136 L144 144 L128 152 L120 168 L112 152 L96 144 L112 136 Z" fill="#F28B94" stroke="#1A1A1A" strokeWidth="2" />
        <circle cx="480" cy="100" r="10" fill="#CDEFFB" stroke="#1A1A1A" strokeWidth="2" />
        <path d="M495 140 Q510 130 520 150" stroke="#1A1A1A" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}
