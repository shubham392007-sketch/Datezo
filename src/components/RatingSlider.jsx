import React from 'react';
import { Minus, Plus } from 'lucide-react';

export function RatingSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 10,
  step = 0.1,
  icon: Icon,
  unit = "/ 10"
}) {
  const numValue = Number(value) || 0;

  const stepIncrement = max > 10 ? 5 : 0.5;

  const handleDecrement = () => {
    const newVal = Math.max(min, Math.round((numValue - stepIncrement) * 10) / 10);
    onChange(newVal);
  };

  const handleIncrement = () => {
    const newVal = Math.min(max, Math.round((numValue + stepIncrement) * 10) / 10);
    onChange(newVal);
  };

  return (
    <div className="space-y-2 bg-white p-3.5 sm:p-4 rounded-2xl border border-black shadow-sticker-sm">
      <div className="flex items-center justify-between text-xs font-extrabold text-ink gap-2">
        <span className="flex items-center gap-1.5 truncate">
          {Icon && <Icon className="w-3.5 h-3.5 text-coral shrink-0" />}
          <span className="truncate">{label}</span>
        </span>
        <span className="bg-pastel-yellow px-2.5 py-0.5 rounded-lg border border-black text-ink font-black text-xs shrink-0 shadow-sticker-sm">
          {numValue.toFixed(max > 10 ? 0 : 1)} <span className="text-[10px] text-body font-bold">{unit}</span>
        </span>
      </div>

      <div className="flex items-center gap-2 pt-0.5">
        <button
          type="button"
          onClick={handleDecrement}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-black bg-gray-50 hover:bg-pastel-pink text-ink font-bold flex items-center justify-center shadow-sticker-sm active:translate-y-0.5 transition-all shrink-0"
          aria-label="Decrease value"
        >
          <Minus className="w-3.5 h-3.5 stroke-[3]" />
        </button>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={numValue}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full cursor-pointer accent-coral py-1"
        />

        <button
          type="button"
          onClick={handleIncrement}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-black bg-gray-50 hover:bg-pastel-green text-ink font-bold flex items-center justify-center shadow-sticker-sm active:translate-y-0.5 transition-all shrink-0"
          aria-label="Increase value"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
        </button>
      </div>
    </div>
  );
}
