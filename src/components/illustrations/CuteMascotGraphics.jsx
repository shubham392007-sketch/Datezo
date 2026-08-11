import React from 'react';

/**
 * Cute Handcrafted Flat Vector Mascot & Decorative Graphics for Datezo
 * Styled with 1.5px black outlines, pastel fills, and playful sticker aesthetics.
 */

// 1. Cute Winking Heart Mascot
export function CuteSparkleHeart({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Heart Base with Hard Black Outline */}
      <path
        d="M50 88 C20 70 8 48 18 28 C26 12 44 14 50 26 C56 14 74 12 82 28 C92 48 80 70 50 88 Z"
        fill="#FFD5D8"
        stroke="#1A1A1A"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Cute Blush Cheek Circles */}
      <circle cx="30" cy="48" r="6" fill="#F28B94" opacity="0.8" />
      <circle cx="70" cy="48" r="6" fill="#F28B94" opacity="0.8" />
      {/* Eyes: Left Eye Open, Right Eye Winking */}
      <circle cx="36" cy="42" r="3.5" fill="#1A1A1A" />
      <path d="M62 42 Q66 38 70 42" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
      {/* Cute Smile Mouth */}
      <path d="M44 54 Q50 62 56 54" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Little Shine Accent */}
      <path d="M26 26 Q30 20 36 22" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// 2. Cute Coffee Date Cup Sticker
export function DatingCoffeeSticker({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Heart Steam */}
      <path d="M50 24 C46 18 40 20 44 26 C48 30 50 32 50 32 C50 32 52 30 56 26 C60 20 54 18 50 24 Z" fill="#F28B94" stroke="#1A1A1A" strokeWidth="2" />
      {/* Cup Body */}
      <path d="M25 36 H75 L70 82 C69 88 64 92 58 92 H42 C36 92 31 88 30 82 L25 36 Z" fill="#FBECAF" stroke="#1A1A1A" strokeWidth="3.5" strokeLinejoin="round" />
      {/* Cup Sleeve */}
      <rect x="27" y="50" width="46" height="20" rx="4" fill="#CDEFFB" stroke="#1A1A1A" strokeWidth="2.5" />
      {/* Cute Heart on Sleeve */}
      <path d="M50 64 C47 61 43 62 45 65 Q50 69 50 69 Q50 69 55 65 C57 62 53 61 50 64 Z" fill="#F28B94" />
      {/* Cup Handle */}
      <path d="M73 44 C84 44 86 64 71 66" stroke="#1A1A1A" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// 3. Love Letter Envelope Sticker
export function LoveLetterSticker({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Envelope Base */}
      <rect x="15" y="30" width="70" height="50" rx="8" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3.5" />
      {/* Envelope Flap Lines */}
      <path d="M15 32 L50 58 L85 32" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" fill="#FFFBF8" />
      {/* Cute Heart Seal */}
      <path d="M50 58 C45 52 38 54 42 60 C46 66 50 70 50 70 C50 70 54 66 58 60 C62 54 55 52 50 58 Z" fill="#F28B94" stroke="#1A1A1A" strokeWidth="2" />
    </svg>
  );
}

// 4. Two Heart Match Pair Winking Sticker
export function SmileyMatchSticker({ className = "w-14 h-14" }) {
  return (
    <svg className={className} viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left Pink Heart */}
      <g transform="translate(10, 10)">
        <path d="M35 65 C14 52 5 36 12 21 C18 9 31 10 35 19 C39 10 52 9 58 21 C65 36 56 52 35 65 Z" fill="#FFD5D8" stroke="#1A1A1A" strokeWidth="3" />
        <circle cx="25" cy="30" r="2.5" fill="#1A1A1A" />
        <circle cx="45" cy="30" r="2.5" fill="#1A1A1A" />
        <path d="M30 40 Q35 46 40 40" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </g>
      {/* Right Yellow Heart */}
      <g transform="translate(50, 18)">
        <path d="M35 65 C14 52 5 36 12 21 C18 9 31 10 35 19 C39 10 52 9 58 21 C65 36 56 52 35 65 Z" fill="#FBECAF" stroke="#1A1A1A" strokeWidth="3" />
        <path d="M22 30 Q25 27 28 30" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="45" cy="30" r="2.5" fill="#1A1A1A" />
        <path d="M30 40 Q35 46 40 40" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </g>
      {/* Sparkle Floating Between */}
      <path d="M58 8 L60 14 L66 16 L60 18 L58 24 L56 18 L50 16 L56 14 Z" fill="#F28B94" stroke="#1A1A1A" strokeWidth="1" />
    </svg>
  );
}

// 5. Floating Pastel Sparkle Cluster
export function SparkleCluster({ className = "w-10 h-10" }) {
  return (
    <svg className={className} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 5 L33 22 L50 25 L33 28 L30 45 L27 28 L10 25 L27 22 Z" fill="#FBECAF" stroke="#1A1A1A" strokeWidth="2" />
      <path d="M48 38 L49 44 L55 45 L49 46 L48 52 L47 46 L41 45 L47 44 Z" fill="#F28B94" stroke="#1A1A1A" strokeWidth="1.5" />
      <path d="M12 8 L13 13 L18 14 L13 15 L12 20 L11 15 L6 14 L11 13 Z" fill="#CDEFFB" stroke="#1A1A1A" strokeWidth="1.5" />
    </svg>
  );
}
