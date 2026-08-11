import React from 'react';
import { Sparkles, Heart, Mail, Check, Star } from 'lucide-react';

export function HeroIllustration({ className = "w-full max-w-xl mx-auto" }) {
  return (
    <div className={`relative ${className}`}>
      {/* Background Subtle Pastel Glow */}
      <div className="absolute -inset-4 bg-pastel-pink/40 rounded-full blur-3xl -z-10 transform scale-105" />

      {/* ------------------------------------------------------------- */}
      {/* FLOATING CARD 1: DATEZO AI MATCH 84.7% (Top Center) */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-30 bg-white border-2 border-black rounded-2xl p-3 sm:p-4 shadow-sticker transform -rotate-2 hover:rotate-0 transition-transform">
        <div className="text-[10px] font-black tracking-widest text-body text-center uppercase">DATEZO AI</div>
        <div className="text-xs font-black text-center text-ink uppercase tracking-wider">MATCH</div>
        <div className="text-3xl sm:text-4xl font-black text-coral text-center tracking-tight my-0.5">
          84.7%
        </div>
        <div className="flex justify-center">
          <div className="w-6 h-6 bg-coral rounded-full flex items-center justify-center border border-black shadow-sticker-sm">
            <Check className="w-4 h-4 text-white stroke-[3]" />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* FLOATING CARD 2: PROFILE STICKER WITH 5 STARS (Top Right) */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute top-4 -right-4 z-20 bg-white border border-black rounded-2xl p-2.5 shadow-sticker transform rotate-6 hidden sm:flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-pastel-pink border border-black flex items-center justify-center overflow-hidden font-extrabold text-xs text-ink">
          <span className="text-sm">👩</span>
        </div>
        <div className="space-y-0.5">
          <div className="text-[10px] font-black text-ink">MATCH RATING</div>
          <div className="flex text-amber-400">
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* FLOATING STICKERS: Envelope Left & Heart Right */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute top-12 left-2 z-20 bg-white border border-black rounded-xl p-2 shadow-sticker-sm transform -rotate-12">
        <Mail className="w-5 h-5 text-coral" />
      </div>

      <div className="absolute bottom-16 -left-4 z-20 bg-pastel-pink border border-black rounded-full p-2 shadow-sticker-sm animate-bounce">
        <Heart className="w-5 h-5 text-coral fill-current" />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MAIN CAFÉ TABLE COUPLE SVG ILLUSTRATION */}
      {/* ------------------------------------------------------------- */}
      <svg className="w-full h-auto drop-shadow-md" viewBox="0 0 600 420" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shadow Ground */}
        <ellipse cx="300" cy="385" rx="230" ry="18" fill="#1A1A1A" opacity="0.08" />

        {/* Round Wooden Café Table */}
        <ellipse cx="300" cy="350" rx="170" ry="26" fill="#FBECAF" stroke="#1A1A1A" strokeWidth="3" />
        <ellipse cx="300" cy="358" rx="150" ry="18" fill="#F8E59B" />
        {/* Table Leg Base */}
        <path d="M292 376 L280 405 M308 376 L320 405 M300 376 L300 405" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
        <path d="M260 405 H340" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />

        {/* Table Items: Flower Vase & Teacups */}
        {/* Small Vase & Flower */}
        <path d="M293 328 H307 L304 345 H296 Z" fill="#FFFBF8" stroke="#1A1A1A" strokeWidth="2" />
        <path d="M300 328 Q298 310 300 295" stroke="#1A1A1A" strokeWidth="2" fill="none" />
        <circle cx="300" cy="292" r="6" fill="#F28B94" stroke="#1A1A1A" strokeWidth="1.5" />
        <circle cx="300" cy="292" r="2" fill="#FFFBF8" />

        {/* Male Teacup & Saucer */}
        <ellipse cx="230" cy="344" rx="12" ry="4" fill="#1A1A1A" opacity="0.2" />
        <path d="M222 334 H238 L235 344 H225 Z" fill="#CDEFFB" stroke="#1A1A1A" strokeWidth="2" />
        <path d="M238 336 C242 336 242 342 238 342" stroke="#1A1A1A" strokeWidth="2" fill="none" />

        {/* Female Teacup & Saucer */}
        <ellipse cx="370" cy="344" rx="12" ry="4" fill="#1A1A1A" opacity="0.2" />
        <path d="M362 334 H378 L375 344 H365 Z" fill="#FFD5D8" stroke="#1A1A1A" strokeWidth="2" />
        <path d="M362 336 C358 336 358 342 362 342" stroke="#1A1A1A" strokeWidth="2" fill="none" />

        {/* ------------------------------------------------------------- */}
        {/* MAN CHARACTER (LEFT - RED/CORAL SHIRT) */}
        {/* ------------------------------------------------------------- */}
        <g id="man-character">
          {/* Chair Left */}
          <path d="M165 290 C165 260 175 250 185 250 H195 M170 320 V385 M190 320 V385" stroke="#1A1A1A" strokeWidth="3" fill="none" strokeLinecap="round" />
          <rect x="160" y="270" width="30" height="50" rx="6" fill="#F28B94" stroke="#1A1A1A" strokeWidth="3" />

          {/* Man Torso (Coral Shirt) */}
          <path d="M210 345 C200 270 250 240 275 250 C285 280 265 345 265 345 Z" fill="#F28B94" stroke="#1A1A1A" strokeWidth="3" />
          {/* Arm resting on table */}
          <path d="M245 285 Q265 320 230 338" stroke="#1A1A1A" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* Neck & Head */}
          <rect x="238" y="222" width="16" height="25" fill="#FCD5CE" stroke="#1A1A1A" strokeWidth="2.5" rx="4" />
          <ellipse cx="246" cy="190" rx="28" ry="32" fill="#FCD5CE" stroke="#1A1A1A" strokeWidth="3" />

          {/* Hair (Short Black Hair) */}
          <path d="M218 185 C220 150 272 150 276 180 C265 162 232 162 218 185 Z" fill="#1A1A1A" stroke="#1A1A1A" strokeWidth="2" />

          {/* Face Features (Eye, Eyebrow, Smile, Nose) */}
          <ellipse cx="258" cy="188" rx="2.5" ry="3.5" fill="#1A1A1A" />
          <path d="M252 178 Q260 174 265 178" stroke="#1A1A1A" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M260 200 Q268 206 260 210" stroke="#1A1A1A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M267 190 Q272 192 268 196" stroke="#1A1A1A" strokeWidth="2" fill="none" />
          {/* Blush Spot */}
          <ellipse cx="254" cy="198" rx="5" ry="3" fill="#F28B94" opacity="0.5" />
          {/* Ear */}
          <circle cx="218" cy="192" r="5" fill="#FCD5CE" stroke="#1A1A1A" strokeWidth="2" />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* WOMAN CHARACTER (RIGHT - YELLOW DRESS) */}
        {/* ------------------------------------------------------------- */}
        <g id="woman-character">
          {/* Chair Right */}
          <path d="M435 290 C435 260 425 250 415 250 H405 M430 320 V385 M410 320 V385" stroke="#1A1A1A" strokeWidth="3" fill="none" strokeLinecap="round" />
          <rect x="410" y="270" width="30" height="50" rx="6" fill="#FBECAF" stroke="#1A1A1A" strokeWidth="3" />

          {/* Long Hair Back */}
          <path d="M335 190 C325 250 340 320 365 340 C380 330 375 250 365 190 Z" fill="#1A1A1A" />

          {/* Woman Torso (Yellow Dress) */}
          <path d="M390 345 C400 270 350 240 325 250 C315 280 335 345 335 345 Z" fill="#FBECAF" stroke="#1A1A1A" strokeWidth="3" />
          {/* Arm resting on table */}
          <path d="M355 285 Q335 320 370 338" stroke="#1A1A1A" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* Neck & Head */}
          <rect x="346" y="222" width="16" height="25" fill="#FCD5CE" stroke="#1A1A1A" strokeWidth="2.5" rx="4" />
          <ellipse cx="354" cy="190" rx="26" ry="30" fill="#FCD5CE" stroke="#1A1A1A" strokeWidth="3" />

          {/* Hair Front */}
          <path d="M328 180 C338 145 385 150 385 185 C370 162 338 162 328 180 Z" fill="#1A1A1A" stroke="#1A1A1A" strokeWidth="2" />

          {/* Face Features */}
          <ellipse cx="342" cy="188" rx="2.5" ry="3.5" fill="#1A1A1A" />
          <path d="M338 178 Q346 174 350 178" stroke="#1A1A1A" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M340 200 Q332 206 340 210" stroke="#1A1A1A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M333 190 Q328 192 332 196" stroke="#1A1A1A" strokeWidth="2" fill="none" />
          {/* Blush Spot */}
          <ellipse cx="346" cy="198" rx="5" ry="3" fill="#F28B94" opacity="0.5" />
          {/* Ear */}
          <circle cx="380" cy="192" r="5" fill="#FCD5CE" stroke="#1A1A1A" strokeWidth="2" />
        </g>

        {/* Floating Sparkles & Squiggles */}
        <path d="M120 130 L128 146 L144 154 L128 162 L120 178 L112 162 L96 154 L112 146 Z" fill="#F28B94" stroke="#1A1A1A" strokeWidth="2" />
        <path d="M495 150 Q510 140 520 160" stroke="#1A1A1A" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}
