import React from 'react';
import { Sparkles, Heart, Code, Cpu, Activity } from 'lucide-react';
import { DatezoLogo } from './DatezoLogo';

export function DeveloperIllustration({ className = "w-full max-w-lg mx-auto" }) {
  return (
    <div className={`relative ${className}`}>
      {/* Background Soft Pastel Glow */}
      <div className="absolute -inset-4 bg-pastel-yellow/50 rounded-full blur-3xl -z-10 transform scale-110" />

      {/* ------------------------------------------------------------- */}
      {/* STICKER BADGE 1: "MADE BY SHUBHAM" (Top Right) */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute -top-4 right-2 z-30 bg-coral text-ink font-black text-xs px-3.5 py-1.5 rounded-full border border-black shadow-sticker transform rotate-3 hover:rotate-0 transition-transform flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-white fill-current" />
        <span>MADE BY SHUBHAM</span>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* STICKER BADGE 2: "AI / ML × WEB" (Top Left) */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute -top-2 left-4 z-30 bg-pastel-yellow text-ink font-black text-[11px] px-3 py-1 rounded-full border border-black shadow-sticker transform -rotate-4 flex items-center gap-1">
        <Cpu className="w-3.5 h-3.5 text-coral" />
        <span>AI / ML × WEB</span>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* FLOATING CARD: DATEZO PREDICTION CARD (Right) */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute bottom-12 -right-4 z-20 bg-white border border-black rounded-xl p-3 shadow-sticker transform rotate-6 hidden sm:block">
        <div className="flex items-center gap-1.5 mb-1">
          <DatezoLogo variant="compact" />
          <span className="text-[9px] font-black text-ink">MODEL v1.0</span>
        </div>
        <div className="text-xs font-black text-coral">84.7% MATCH</div>
        <div className="text-[9px] font-bold text-pastel-green bg-ink px-2 py-0.5 rounded-full text-center mt-1">
          CALIBRATED
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* FLOATING CODE STICKER (Left) */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute bottom-20 -left-2 z-20 bg-white border border-black rounded-xl p-2 shadow-sticker transform -rotate-6 flex items-center gap-1 text-[10px] font-black text-ink">
        <Code className="w-4 h-4 text-coral" />
        <span>&lt;ML Pipeline /&gt;</span>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MAIN FLAT-VECTOR DEVELOPER ILLUSTRATION */}
      {/* ------------------------------------------------------------- */}
      <svg className="w-full h-auto drop-shadow-md" viewBox="0 0 520 380" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ground Shadow */}
        <ellipse cx="260" cy="355" rx="200" ry="16" fill="#1A1A1A" opacity="0.08" />

        {/* Desk Top */}
        <rect x="70" y="300" width="380" height="14" rx="4" fill="#FBECAF" stroke="#1A1A1A" strokeWidth="2.5" />
        <path d="M100 314 V355 M420 314 V355" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />

        {/* Laptop Base & Screen */}
        <path d="M180 300 H340 L350 310 H170 Z" fill="#E2E8F0" stroke="#1A1A1A" strokeWidth="2" />
        <rect x="195" y="210" width="130" height="90" rx="6" fill="#1A1A1A" stroke="#1A1A1A" strokeWidth="2.5" />
        <rect x="202" y="217" width="116" height="76" rx="4" fill="#CDEFFB" />
        {/* Laptop Screen Code Lines */}
        <path d="M210 228 H240 M210 236 H280 M210 244 H260 M210 258 H290 M210 266 H250 M210 274 H275" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
        {/* Glowing Logo on Laptop Screen */}
        <circle cx="295" cy="235" r="8" fill="#F28B94" stroke="#1A1A1A" strokeWidth="1.5" />
        <path d="M292 235 L295 238 L299 233" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />

        {/* Developer Coffee Mug on Desk */}
        <rect x="375" y="280" width="18" height="20" rx="3" fill="#F28B94" stroke="#1A1A1A" strokeWidth="2" />
        <path d="M393 284 C398 284 398 296 393 296" stroke="#1A1A1A" strokeWidth="2" fill="none" />
        {/* Steam */}
        <path d="M380 273 Q382 268 380 263 M388 274 Q390 269 388 264" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* ------------------------------------------------------------- */}
        {/* DEVELOPER (SHUBHAM) CHARACTER */}
        {/* ------------------------------------------------------------- */}
        <g id="shubham-developer">
          {/* Chair Backrest */}
          <rect x="125" y="210" width="40" height="85" rx="8" fill="#F28B94" stroke="#1A1A1A" strokeWidth="2.5" />

          {/* Torso / Hoodie (Pastel Yellow Hoodie) */}
          <path d="M140 310 C130 260 170 235 195 245 C205 270 190 310 190 310 Z" fill="#FBECAF" stroke="#1A1A1A" strokeWidth="2.5" />
          {/* Arms typing on laptop */}
          <path d="M175 270 Q205 295 220 300" stroke="#1A1A1A" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* Neck & Head */}
          <rect x="156" y="210" width="14" height="22" fill="#FCD5CE" stroke="#1A1A1A" strokeWidth="2" rx="3" />
          <ellipse cx="163" cy="182" rx="24" ry="28" fill="#FCD5CE" stroke="#1A1A1A" strokeWidth="2.5" />

          {/* Hair (Black Stylized Modern Hair) */}
          <path d="M138 178 C140 145 188 145 192 172 C180 156 150 156 138 178 Z" fill="#1A1A1A" stroke="#1A1A1A" strokeWidth="2" />

          {/* Face Features (Focus Glasses, Eye, Smile) */}
          {/* Glasses */}
          <rect x="165" y="174" width="16" height="12" rx="3" fill="#FFFBF8" stroke="#1A1A1A" strokeWidth="2" opacity="0.9" />
          <circle cx="173" cy="180" r="2.5" fill="#1A1A1A" />
          <path d="M158 178 H165" stroke="#1A1A1A" strokeWidth="2" />

          {/* Focused Eyebrow */}
          <path d="M166 170 Q174 167 179 171" stroke="#1A1A1A" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Smile */}
          <path d="M173 194 Q180 198 175 202" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
          {/* Ear */}
          <circle cx="140" cy="184" r="4.5" fill="#FCD5CE" stroke="#1A1A1A" strokeWidth="2" />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* ML MODEL VISUALIZATION NODE CHART (Top Floating Right) */}
        {/* ------------------------------------------------------------- */}
        <g id="ml-chart-node" transform="translate(320, 100)">
          <rect x="0" y="0" width="150" height="90" rx="12" fill="#FFFBF8" stroke="#1A1A1A" strokeWidth="2" filter="drop-shadow(3px 3px 0px #1A1A1A)" />
          <text x="12" y="20" fill="#1A1A1A" fontSize="9" fontWeight="900" fontFamily="sans-serif">ML MODEL FLOW</text>
          
          {/* Nodes */}
          <circle cx="25" cy="45" r="7" fill="#CDEFFB" stroke="#1A1A1A" strokeWidth="1.5" />
          <circle cx="25" cy="68" r="7" fill="#CDEFFB" stroke="#1A1A1A" strokeWidth="1.5" />

          <circle cx="75" cy="56.5" r="10" fill="#F28B94" stroke="#1A1A1A" strokeWidth="1.5" />

          <circle cx="125" cy="56.5" r="7" fill="#D7F3D3" stroke="#1A1A1A" strokeWidth="1.5" />

          {/* Connection Lines */}
          <path d="M32 45 L65 56.5 M32 68 L65 56.5 M85 56.5 L118 56.5" stroke="#1A1A1A" strokeWidth="1.5" strokeDasharray="3 3" />
        </g>

        {/* Floating Hearts & Code Squiggles */}
        <path d="M110 110 C105 100 95 105 100 112 Q110 120 110 120 Q110 120 120 112 C125 105 115 100 110 110 Z" fill="#F28B94" stroke="#1A1A1A" strokeWidth="1.5" />
        <path d="M260 130 Q270 120 280 140" stroke="#1A1A1A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="290" cy="160" r="4" fill="#FBECAF" stroke="#1A1A1A" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
