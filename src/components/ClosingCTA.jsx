import React from 'react';
import { Link } from 'react-router-dom';
import { HandDrawnUnderline, HeartSticker, CoralStarburst } from './illustrations/DecorativeShapes';
import { SmileyMatchSticker, CuteSparkleHeart } from './illustrations/CuteMascotGraphics';
import { ArrowRight, Sparkles } from 'lucide-react';

export function ClosingCTA() {
  return (
    <section className="py-16 px-4 md:px-8 bg-pastel-pink/40 border-b border-black relative overflow-hidden">
      {/* Background Cute Decorative Graphics */}
      <div className="absolute top-4 left-6 opacity-75 hidden md:block pointer-events-none z-0">
        <CuteSparkleHeart className="w-12 h-12 rotate-12" />
      </div>
      <div className="absolute bottom-4 right-12 opacity-80 hidden lg:block pointer-events-none z-0">
        <SmileyMatchSticker className="w-16 h-16" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left White Sticker Card (7 Cols) */}
        <div className="lg:col-span-7 bg-white border-2 border-black rounded-3xl p-8 sm:p-12 shadow-sticker-lg space-y-6 relative">
          <div className="inline-flex items-center gap-2 bg-pastel-yellow px-3 py-1 rounded-full border border-black text-xs font-bold text-ink">
            <Sparkles className="w-3.5 h-3.5 text-coral fill-current" />
            START PREDICTING
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink leading-tight">
            Ready to Know Your{' '}
            <span className="relative inline-block text-coral">
              Real Compatibility?
              <HandDrawnUnderline className="absolute -bottom-2 left-0 w-full text-coral" />
            </span>
          </h2>

          <p className="text-base text-body font-normal leading-relaxed max-w-lg">
            Run a Datezo prediction and see the signals behind the result across mutual attraction, shared interests, and lifestyle compatibility.
          </p>

          <div className="pt-2">
            <Link
              to="/predict"
              className="btn-primary text-base py-3.5 px-8 inline-flex items-center gap-2 shadow-sticker text-white"
            >
              Start a Prediction
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Right CTA Decorative Graphic (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative space-y-4">
          <div className="relative bg-white border border-black rounded-2xl p-6 shadow-sticker text-center max-w-sm w-full space-y-3">
            <div className="flex justify-center">
              <HeartSticker className="w-12 h-12" />
            </div>
            <div className="text-xs font-extrabold tracking-widest text-body uppercase">DATEZO AI MODEL v1.0</div>
            <div className="text-2xl font-black text-ink">84.7% MATCH</div>
            <div className="inline-block bg-pastel-green px-3 py-1 rounded-full border border-black text-xs font-bold text-ink">
              ✓ VERY HIGH COMPATIBILITY
            </div>
            <p className="text-xs text-body italic pt-1">
              "Turn compatibility signals into actionable dating insights."
            </p>
          </div>
          <CoralStarburst className="w-10 h-10 text-coral animate-spin-slow" />
        </div>
      </div>
    </section>
  );
}
