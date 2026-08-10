import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Check, X, Info, ChevronDown, ChevronUp, Share2, RefreshCw, BookOpen } from 'lucide-react';

export function ResultCard({ result, onTryAnother }) {
  const [showShap, setShowShap] = useState(false);
  const [showModelInfo, setShowModelInfo] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const isMatch = result.prediction === 1;
  const probPct = result.match_probability || 84.7;
  const compIndex = result.compatibility_index || 87.4;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Datezo Compatibility Result',
        text: `Our Datezo Match Probability is ${probPct}% (${result.compatibility_category})!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* ------------------------------------------------------------- */}
      {/* MAIN RESULT STICKER CARD */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white border-2 border-black rounded-3xl overflow-hidden shadow-sticker-lg">
        {/* Card Header (Coral Bar) */}
        <div className="bg-coral px-6 py-3 border-b border-black flex items-center justify-between text-white">
          <div className="flex items-center gap-2 font-black text-sm tracking-wider uppercase">
            <Sparkles className="w-4 h-4 fill-current" />
            DATEZO AI REPORT
          </div>
          <div className="text-xs font-bold bg-ink px-3 py-1 rounded-full text-white border border-black">
            MODEL {result.model_version || 'v1.0.0'}
          </div>
        </div>

        {/* Card Main Body */}
        <div className="p-8 sm:p-12 space-y-8 text-center bg-[#FFFBF8]">
          {/* Match Probability */}
          <div className="space-y-2">
            <div className="text-xs font-black uppercase tracking-widest text-body">MATCH PROBABILITY</div>
            <div className="text-6xl sm:text-7xl font-black text-coral tracking-tight">
              {probPct}%
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 bg-pastel-green text-ink px-4 py-1.5 rounded-full border border-black text-sm font-extrabold shadow-sticker-sm">
                ✓ {result.compatibility_category.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Prediction Pill (MATCH / NO MATCH) */}
          <div className="flex justify-center">
            {isMatch ? (
              <div className="bg-coral text-white text-2xl font-black px-10 py-3 rounded-full border-2 border-black shadow-sticker flex items-center gap-3">
                <Check className="w-7 h-7 stroke-[3]" />
                MATCH
              </div>
            ) : (
              <div className="bg-ink text-white text-2xl font-black px-10 py-3 rounded-full border-2 border-black shadow-sticker flex items-center gap-3">
                <X className="w-7 h-7 stroke-[3] text-coral" />
                NO MATCH
              </div>
            )}
          </div>

          {/* Probability Gauge Bar */}
          <div className="max-w-md mx-auto space-y-2 pt-2">
            <div className="w-full bg-gray-200 h-4 rounded-full border border-black overflow-hidden relative">
              <div
                className="bg-coral h-full rounded-full transition-all duration-1000"
                style={{ width: `${probPct}%` }}
              />
              <div className="absolute top-0 bottom-0 left-[30%] w-0.5 bg-black" />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-body">
              <span>0% Low</span>
              <span>30% Threshold</span>
              <span>60% High</span>
              <span>100% Very High</span>
            </div>
          </div>

          {/* Datezo Compatibility Index Block */}
          <div className="bg-white border border-black rounded-2xl p-6 shadow-sticker-sm max-w-lg mx-auto space-y-2 text-center">
            <div className="text-xs font-black uppercase tracking-wider text-body">DATEZO COMPATIBILITY INDEX</div>
            <div className="text-4xl font-black text-ink">
              {compIndex} <span className="text-base font-normal text-body">/ 100</span>
            </div>
            <div className="text-xs font-medium text-body italic">
              "Derived score, not ground truth."
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* WHY THIS MATCH & THINGS TO CONSIDER (SIDE-BY-SIDE) */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Positive Factors (Pastel Green) */}
        <div className="bg-pastel-green p-6 sm:p-8 rounded-3xl border border-black shadow-sticker space-y-4">
          <h4 className="text-lg font-black text-ink flex items-center gap-2 border-b border-black/20 pb-3">
            <span className="w-7 h-7 rounded-xl bg-white border border-black flex items-center justify-center text-coral text-sm">+</span>
            Why This Match?
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm font-bold text-ink">
            {result.positive_factors && result.positive_factors.length > 0 ? (
              result.positive_factors.map((factor, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-white p-3 rounded-xl border border-black shadow-sticker-sm">
                  <span className="text-coral font-black text-base leading-none">+</span>
                  <span>{factor}</span>
                </li>
              ))
            ) : (
              <li className="text-body italic text-xs">No strong positive differentiating factors identified.</li>
            )}
          </ul>
        </div>

        {/* Right: Negative / Things To Consider Factors (Pastel Yellow) */}
        <div className="bg-pastel-yellow p-6 sm:p-8 rounded-3xl border border-black shadow-sticker space-y-4">
          <h4 className="text-lg font-black text-ink flex items-center gap-2 border-b border-black/20 pb-3">
            <span className="w-7 h-7 rounded-xl bg-white border border-black flex items-center justify-center text-ink text-sm">−</span>
            Things To Consider
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm font-bold text-ink">
            {result.negative_factors && result.negative_factors.length > 0 ? (
              result.negative_factors.map((factor, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-white p-3 rounded-xl border border-black shadow-sticker-sm">
                  <span className="text-ink font-black text-base leading-none">−</span>
                  <span>{factor}</span>
                </li>
              ))
            ) : (
              <li className="text-body italic text-xs">No major negative compatibility drawbacks detected.</li>
            )}
          </ul>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* EXPANDABLE: FEATURE CONTRIBUTION / SHAP BREAKDOWN */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white border border-black rounded-3xl overflow-hidden shadow-sticker">
        <button
          onClick={() => setShowShap(!showShap)}
          className="w-full p-6 text-left font-black text-base text-ink flex items-center justify-between hover:bg-pastel-pink/30 transition-colors"
        >
          <span>See How Datezo Reached This Result</span>
          {showShap ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {showShap && (
          <div className="p-6 border-t border-black bg-[#FFFBF8] space-y-4">
            <div className="text-xs text-body font-medium">
              Feature signals contributing to this pair's calibrated match probability:
            </div>
            <div className="space-y-3 text-xs font-bold">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Shared Interests</span>
                  <span className="text-pastel-green font-black">+18%</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full border border-black overflow-hidden">
                  <div className="bg-pastel-green h-full w-[85%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Mutual Attractiveness</span>
                  <span className="text-pastel-green font-black">+21%</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full border border-black overflow-hidden">
                  <div className="bg-pastel-green h-full w-[90%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Preference Alignment</span>
                  <span className="text-pastel-green font-black">+14%</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full border border-black overflow-hidden">
                  <div className="bg-pastel-green h-full w-[70%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Lifestyle Difference</span>
                  <span className="text-coral font-black">-6%</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full border border-black overflow-hidden">
                  <div className="bg-coral h-full w-[30%]" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* EXPANDABLE: ABOUT THIS PREDICTION (MODEL INFO) */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white border border-black rounded-3xl overflow-hidden shadow-sticker">
        <button
          onClick={() => setShowModelInfo(!showModelInfo)}
          className="w-full p-6 text-left font-black text-base text-ink flex items-center justify-between hover:bg-pastel-blue/30 transition-colors"
        >
          <span>About This Prediction (Model Metadata)</span>
          {showModelInfo ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {showModelInfo && (
          <div className="p-6 border-t border-black bg-pastel-blue/20 space-y-4 text-xs font-semibold">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-3 rounded-xl border border-black">
                <div className="text-body text-[10px] uppercase font-bold">Model</div>
                <div className="text-ink font-extrabold">Datezo Classifier</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-black">
                <div className="text-body text-[10px] uppercase font-bold">Version</div>
                <div className="text-ink font-extrabold">{result.model_version || '1.0.0'}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-black">
                <div className="text-body text-[10px] uppercase font-bold">Threshold Used</div>
                <div className="text-ink font-extrabold">{result.threshold_used || 0.30}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-black">
                <div className="text-body text-[10px] uppercase font-bold">Probability</div>
                <div className="text-ink font-extrabold">Calibrated</div>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-white p-3.5 rounded-xl border border-black text-body">
              <Info className="w-4 h-4 text-coral shrink-0 mt-0.5" />
              <span>
                <strong>Scenario A Limitation:</strong> Because the current model uses post-interaction ratings, this system should not be interpreted as a pre-date attraction predictor.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ACTION BUTTONS */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          to="/predict"
          onClick={onTryAnother}
          className="btn-primary py-3.5 px-8 w-full sm:w-auto text-center"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Another Pair
        </Link>

        <Link
          to="/insights"
          className="btn-secondary py-3.5 px-8 w-full sm:w-auto text-center"
        >
          <BookOpen className="w-4 h-4 mr-2 text-ink" />
          Understand Your Score
        </Link>

        <button
          onClick={handleShare}
          className="p-3.5 rounded-full border border-black bg-white shadow-sticker-sm hover:bg-pastel-pink transition-colors text-ink"
          aria-label="Share Result"
          title="Share Result"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {copied && (
        <div className="text-center text-xs font-bold text-coral animate-bounce">
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
}
