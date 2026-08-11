import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { StickerCard } from '../components/StickerCard';
import { DeveloperContact } from '../components/DeveloperContact';
import { Scale, Gauge, AlertTriangle, ArrowRight } from 'lucide-react';
import { HandDrawnUnderline } from '../components/illustrations/DecorativeShapes';

export function Insights() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF8]">
      <Navbar />
      <main className="flex-grow py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-12 mb-16">
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-black text-ink">
              Understanding Your{' '}
              <span className="relative inline-block text-coral">
                Score
                <HandDrawnUnderline className="absolute -bottom-2 left-0 w-full text-coral" />
              </span>
            </h1>
            <p className="text-base text-body font-medium">
              Machine learning gives you a prediction. Datezo shows you what it means.
            </p>
          </div>

          {/* 3 Sticker Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StickerCard bgColor="bg-pastel-blue" className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-black flex items-center justify-center shadow-sticker-sm text-ink">
                  <Scale className="w-6 h-6 text-coral" />
                </div>
                <h3 className="text-xl font-black text-ink">How Compatibility Index Works</h3>
                <p className="text-xs text-ink/80 font-medium leading-relaxed">
                  The Datezo Compatibility Index is a transparent derived score (0–100) aggregating 11 dimensions including mutual attraction, shared interests, rating gap balance, preference alignment, and lifestyle similarity.
                </p>
              </div>
              <Link to="/about#compatibility-index" className="inline-flex items-center text-xs font-black text-ink hover:text-coral gap-1 pt-2 border-t border-black/20">
                Read More <ArrowRight className="w-4 h-4" />
              </Link>
            </StickerCard>

            <StickerCard bgColor="bg-pastel-yellow" className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-black flex items-center justify-center shadow-sticker-sm text-ink">
                  <Gauge className="w-6 h-6 text-ink" />
                </div>
                <h3 className="text-xl font-black text-ink">What Does Calibration Mean?</h3>
                <p className="text-xs text-ink/80 font-medium leading-relaxed">
                  Raw classifier probabilities can be uncalibrated and misleading. Datezo uses sigmoid calibration (Platt scaling) to ensure an 84.7% score reflects genuine empirical match probability.
                </p>
              </div>
              <Link to="/about#calibration" className="inline-flex items-center text-xs font-black text-ink hover:text-coral gap-1 pt-2 border-t border-black/20">
                Read More <ArrowRight className="w-4 h-4" />
              </Link>
            </StickerCard>

            <StickerCard bgColor="bg-pastel-green" className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-black flex items-center justify-center shadow-sticker-sm text-ink">
                  <AlertTriangle className="w-6 h-6 text-coral" />
                </div>
                <h3 className="text-xl font-black text-ink">Model Limitations</h3>
                <p className="text-xs text-ink/80 font-medium leading-relaxed">
                  Datezo currently operates under <strong>Scenario A</strong> (post-interaction prediction). It analyzes ratings recorded during/after speed dating and does not claim pre-date attraction certainty.
                </p>
              </div>
              <Link to="/about#limitations" className="inline-flex items-center text-xs font-black text-ink hover:text-coral gap-1 pt-2 border-t border-black/20">
                Read More <ArrowRight className="w-4 h-4" />
              </Link>
            </StickerCard>
          </div>
        </div>

        {/* Reusable Developer & Contact Section */}
        <DeveloperContact />
      </main>
      <Footer />
    </div>
  );
}
