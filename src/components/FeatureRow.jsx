import React from 'react';
import { Gauge, Search, Scale, ShieldCheck } from 'lucide-react';

export function FeatureRow() {
  return (
    <section className="w-full border-b border-black">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black">
        {/* Column 1: Pastel Blue */}
        <div className="bg-pastel-blue p-8 sm:p-10 space-y-4 relative flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-white border border-black flex items-center justify-center shadow-sticker-sm text-ink">
              <Gauge className="w-6 h-6 text-coral" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-ink">Calibrated Predictions</h3>
            <p className="text-sm text-ink/80 font-medium leading-relaxed">
              Datezo reports calibrated match probabilities instead of treating raw model scores as certainty.
            </p>
          </div>
          <div className="pt-4 flex items-center justify-between border-t border-black/20">
            <span className="text-xs font-bold text-ink uppercase tracking-wider">Calibration Metric</span>
            <span className="bg-white border border-black px-3 py-1 rounded-full text-xs font-black text-coral shadow-sticker-sm">
              84.7%
            </span>
          </div>
        </div>

        {/* Column 2: Pastel Yellow */}
        <div className="bg-pastel-yellow p-8 sm:p-10 space-y-4 relative flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-white border border-black flex items-center justify-center shadow-sticker-sm text-ink">
              <Search className="w-6 h-6 text-ink" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-ink">Explainable by Design</h3>
            <p className="text-sm text-ink/80 font-medium leading-relaxed">
              See the real positive and negative factors influencing each prediction.
            </p>
          </div>
          <div className="pt-4 flex items-center justify-between border-t border-black/20">
            <span className="text-xs font-bold text-ink uppercase tracking-wider">Explainer Engine</span>
            <span className="bg-white border border-black px-3 py-1 rounded-full text-xs font-black text-ink shadow-sticker-sm">
              SHAP
            </span>
          </div>
        </div>

        {/* Column 3: Pastel Green */}
        <div className="bg-pastel-green p-8 sm:p-10 space-y-4 relative flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-white border border-black flex items-center justify-center shadow-sticker-sm text-ink">
              <Scale className="w-6 h-6 text-ink" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-ink">Compatibility Index</h3>
            <p className="text-sm text-ink/80 font-medium leading-relaxed">
              A transparent 0–100 derived score across interests, ratings, preferences and lifestyle.
            </p>
          </div>
          <div className="pt-4 flex items-center justify-between border-t border-black/20">
            <span className="text-xs font-bold text-ink uppercase tracking-wider">Derived Index</span>
            <span className="bg-white border border-black px-3 py-1 rounded-full text-xs font-black text-ink shadow-sticker-sm">
              87.4 / 100
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
