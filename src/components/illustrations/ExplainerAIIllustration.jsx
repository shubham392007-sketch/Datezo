import React from 'react';

export function ExplainerAIIllustration({ className = "w-full max-w-sm mx-auto" }) {
  return (
    <div className={`relative ${className}`}>
      <div className="bg-pastel-yellow border border-black rounded-2xl p-4 shadow-sticker space-y-3">
        <div className="flex items-center gap-2 border-b border-black pb-2">
          <div className="w-3 h-3 rounded-full bg-coral border border-black" />
          <div className="w-3 h-3 rounded-full bg-pastel-blue border border-black" />
          <div className="w-3 h-3 rounded-full bg-pastel-green border border-black" />
          <span className="text-xs font-extrabold text-ink ml-auto">SHAP EXPLAINER ENGINE</span>
        </div>

        <div className="space-y-2 text-xs font-semibold">
          <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-black shadow-sticker-sm">
            <span>Shared Interests</span>
            <span className="text-pastel-green font-bold bg-ink px-2 py-0.5 rounded text-white">+18.4%</span>
          </div>

          <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-black shadow-sticker-sm">
            <span>Mutual Attractiveness</span>
            <span className="text-pastel-green font-bold bg-ink px-2 py-0.5 rounded text-white">+21.2%</span>
          </div>

          <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-black shadow-sticker-sm">
            <span>Preference Alignment</span>
            <span className="text-pastel-green font-bold bg-ink px-2 py-0.5 rounded text-white">+14.0%</span>
          </div>

          <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-black shadow-sticker-sm">
            <span>Lifestyle Difference</span>
            <span className="text-coral font-bold bg-ink px-2 py-0.5 rounded text-white">-6.2%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
