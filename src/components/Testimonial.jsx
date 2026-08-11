import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Quote, Sparkles } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "What makes Datezo different is that the result isn't just a number. You can actually see the signals behind it.",
    author: "Prototype feedback",
    role: "Speed Dating Event Participant",
    avatarBg: "bg-pastel-pink",
    initials: "PF"
  },
  {
    quote: "Seeing the reasons behind a prediction makes the result feel much more useful than a simple yes or no.",
    author: "Early Beta User",
    role: "Speed Dating Host",
    avatarBg: "bg-pastel-blue",
    initials: "EB"
  },
  {
    quote: "The Datezo Compatibility Index gave us an honest 87.4 breakdown of our shared interests and rating gaps.",
    author: "Datezo Tester",
    role: "Research Participant",
    avatarBg: "bg-pastel-yellow",
    initials: "DT"
  }
];

export function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const active = TESTIMONIALS[currentIndex];

  return (
    <div className="bg-white border-2 border-black rounded-3xl p-6 sm:p-8 shadow-sticker-lg h-full flex flex-col justify-between relative overflow-hidden">
      {/* Top Header */}
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black text-ink">
          What Daters <span className="text-coral">Say ✦</span>
        </h2>

        {/* Oversized Double Quote Mark */}
        <div className="text- coral text-5xl font-black font-serif leading-none select-none text-coral">
          “
        </div>

        {/* Testimonial Quote */}
        <p className="text-lg sm:text-xl font-bold text-ink leading-snug">
          "{active.quote}"
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-3 pt-2">
          <div className={`w-10 h-10 rounded-full border border-black flex items-center justify-center font-black text-xs text-ink ${active.avatarBg}`}>
            {active.initials}
          </div>
          <div>
            <div className="text-sm font-black text-ink">{active.author}</div>
            <div className="text-[10px] font-bold text-body uppercase tracking-wider">{active.role}</div>
          </div>
        </div>
      </div>

      {/* Bottom Area: Carousel Controls Left & Vector Couple Graphic Right */}
      <div className="flex items-end justify-between pt-8 mt-auto border-t border-black/10">
        {/* Carousel Buttons Left */}
        <div className="flex items-center space-x-2">
          <button
            onClick={prevTestimonial}
            className="w-9 h-9 rounded-full border border-black bg-white shadow-sticker-sm flex items-center justify-center text-ink hover:bg-pastel-yellow transition-colors"
            aria-label="Previous Testimonial"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex space-x-1.5 px-1">
            {TESTIMONIALS.map((_, idx) => (
              <div
                key={idx}
                className={`w-2.5 h-2.5 rounded-full border border-black transition-colors ${
                  idx === currentIndex ? 'bg-coral' : 'bg-white'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="w-9 h-9 rounded-full border border-black bg-white shadow-sticker-sm flex items-center justify-center text-ink hover:bg-pastel-yellow transition-colors"
            aria-label="Next Testimonial"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Vector Couple Illustration Right */}
        <div className="w-32 sm:w-40 h-auto shrink-0 select-none pointer-events-none -mb-4 -mr-2">
          <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Man standing */}
            <path d="M40 130 V70 C40 60 55 50 65 50 C75 50 90 60 90 70 V130" fill="#FBECAF" stroke="#1A1A1A" strokeWidth="2.5" />
            <circle cx="65" cy="35" r="16" fill="#FCD5CE" stroke="#1A1A1A" strokeWidth="2.5" />
            <path d="M50 30 C50 15 78 15 80 30 C72 20 58 20 50 30 Z" fill="#1A1A1A" />
            <circle cx="60" cy="34" r="2" fill="#1A1A1A" />
            <path d="M58 40 Q65 44 70 40" stroke="#1A1A1A" strokeWidth="2" fill="none" />

            {/* Woman standing beside */}
            <path d="M85 130 V75 C85 65 100 55 110 55 C120 55 135 65 135 75 V130" fill="#F28B94" stroke="#1A1A1A" strokeWidth="2.5" />
            <circle cx="110" cy="40" r="15" fill="#FCD5CE" stroke="#1A1A1A" strokeWidth="2.5" />
            <path d="M96 35 C96 18 124 20 124 35" fill="#1A1A1A" stroke="#1A1A1A" strokeWidth="2" />
            <circle cx="106" cy="39" r="2" fill="#1A1A1A" />
            <path d="M104 45 Q110 49 114 45" stroke="#1A1A1A" strokeWidth="2" fill="none" />

            {/* Small Heart Above */}
            <path d="M85 20 C80 10 70 15 75 22 Q85 30 85 30 Q85 30 95 22 C100 15 90 10 85 20 Z" fill="#F28B94" stroke="#1A1A1A" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
