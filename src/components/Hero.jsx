import React from 'react';
import { Link } from 'react-router-dom';
import { HeroIllustration } from './illustrations/HeroIllustration';
import { HandDrawnUnderline, CoralStarburst, HeartSticker } from './illustrations/DecorativeShapes';
import { ArrowRight, HelpCircle, CheckCircle2, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 px-4 md:px-8 border-b border-black bg-[#FFFBF8]">
      {/* Background Decorative Shapes */}
      <div className="absolute top-12 left-8 opacity-60 hidden md:block">
        <CoralStarburst className="w-8 h-8 text-coral animate-spin-slow" />
      </div>
      <div className="absolute top-24 right-12 opacity-60 hidden md:block">
        <HeartSticker className="w-10 h-10" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Headline & Content (7 Cols) */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-pastel-pink border border-black px-4 py-1.5 rounded-full text-xs font-bold tracking-wider text-ink shadow-sticker-sm">
            <Sparkles className="w-3.5 h-3.5 text-coral fill-current" />
            AI-POWERED SPEED DATING PREDICTION
          </div>

          {/* Two-Tone Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-ink tracking-tight leading-[1.1]">
            Know Your Real{' '}
            <span className="relative inline-block text-coral">
              Compatibility
              <HandDrawnUnderline className="absolute -bottom-2 left-0 w-full text-coral" />
            </span>
          </h1>

          {/* Supporting Subtext */}
          <p className="text-base sm:text-lg text-body font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
            Datezo uses a calibrated machine-learning model to estimate mutual match likelihood and explain the signals behind every prediction.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <Link
              to="/predict"
              className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto shadow-sticker text-white flex items-center justify-center gap-2"
            >
              Try a Prediction
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="#how-it-works"
              className="btn-secondary text-base px-6 py-3.5 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-ink" />
              How It Works
            </a>
          </div>

          {/* Micro Trust Indicators */}
          <div className="flex items-center justify-center lg:justify-start space-x-6 pt-4 text-xs font-semibold text-body">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-pastel-green fill-ink" />
              Calibrated Probabilities
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-pastel-green fill-ink" />
              SHAP Explanations
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-pastel-green fill-ink" />
              0-100 Compatibility Index
            </div>
          </div>
        </div>

        {/* Right Hero Illustration (5 Cols) */}
        <div className="lg:col-span-5 relative">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
