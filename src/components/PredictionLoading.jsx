import React from 'react';
import { Sparkles, Brain, Cpu, FileCheck } from 'lucide-react';

export function PredictionLoading({ step = 1 }) {
  const stepsText = [
    "Reading the signals...",
    "Engineering compatibility features...",
    "Running Datezo AI classifier...",
    "Preparing your compatibility report..."
  ];

  const currentMessage = stepsText[Math.min(step - 1, stepsText.length - 1)];

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white border-2 border-black rounded-3xl p-8 sm:p-12 max-w-xl w-full shadow-sticker-lg space-y-8 relative overflow-hidden">
        {/* Top Header Badge */}
        <div className="inline-flex items-center gap-2 bg-pastel-pink border border-black px-4 py-1.5 rounded-full text-xs font-bold text-ink shadow-sticker-sm animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-coral fill-current" />
          DATEZO ML PIPELINE IN PROGRESS
        </div>

        {/* Animated ML Pipeline Visual Nodes */}
        <div className="flex items-center justify-between px-2 sm:px-6 relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-8 right-8 h-1 bg-gray-200 -z-0 -translate-y-1/2" />
          <div
            className="absolute top-1/2 left-8 h-1 bg-coral transition-all duration-500 -z-0 -translate-y-1/2"
            style={{ width: `${((step - 1) / 3) * 80}%` }}
          />

          {/* Node 1 */}
          <div className={`relative z-10 w-12 h-12 rounded-2xl border border-black flex items-center justify-center transition-all ${
            step >= 1 ? 'bg-pastel-blue shadow-sticker-sm scale-110' : 'bg-white text-gray-400'
          }`}>
            <Sparkles className="w-5 h-5 text-ink" />
          </div>

          {/* Node 2 */}
          <div className={`relative z-10 w-12 h-12 rounded-2xl border border-black flex items-center justify-center transition-all ${
            step >= 2 ? 'bg-pastel-yellow shadow-sticker-sm scale-110' : 'bg-white text-gray-400'
          }`}>
            <Brain className="w-5 h-5 text-ink" />
          </div>

          {/* Node 3 */}
          <div className={`relative z-10 w-12 h-12 rounded-2xl border border-black flex items-center justify-center transition-all ${
            step >= 3 ? 'bg-pastel-green shadow-sticker-sm scale-110' : 'bg-white text-gray-400'
          }`}>
            <Cpu className="w-5 h-5 text-ink" />
          </div>

          {/* Node 4 */}
          <div className={`relative z-10 w-12 h-12 rounded-2xl border border-black flex items-center justify-center transition-all ${
            step >= 4 ? 'bg-pastel-pink shadow-sticker-sm scale-110' : 'bg-white text-gray-400'
          }`}>
            <FileCheck className="w-5 h-5 text-ink" />
          </div>
        </div>

        {/* Current Step Message */}
        <div className="space-y-2">
          <div className="text-2xl font-black text-ink">{currentMessage}</div>
          <p className="text-xs text-body font-medium">
            Applying 5-Fold calibrated probabilities and feature engineering transforms.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-3 border border-black overflow-hidden p-0.5">
          <div
            className="bg-coral h-full rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
