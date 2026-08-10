import React from 'react';

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
  return (
    <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-black shadow-sticker-sm">
      <div className="flex items-center justify-between text-xs font-extrabold text-ink">
        <span className="flex items-center gap-1.5">
          {Icon && <Icon className="w-3.5 h-3.5 text-coral" />}
          {label}
        </span>
        <span className="bg-pastel-yellow px-2 py-0.5 rounded border border-black text-ink font-bold">
          {Number(value).toFixed(1)} <span className="text-[10px] text-body font-normal">{unit}</span>
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full cursor-pointer accent-coral"
      />
    </div>
  );
}
