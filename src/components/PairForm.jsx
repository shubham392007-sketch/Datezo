import React, { useState } from 'react';
import { usePrediction } from '../hooks/usePrediction';
import { RatingSlider } from './RatingSlider';
import { LoveLetterSticker, DatingCoffeeSticker, SparkleCluster } from './illustrations/CuteMascotGraphics';
import { Info, Sparkles, Heart, Smile, Brain, Flame, Award, User, ArrowRight, X, Minus, Plus } from 'lucide-react';

export function PairForm({ onSubmitSuccess }) {
  const { formData, updateFormField, runPrediction, isLoading, error } = usePrediction();
  const [showDisclosureModal, setShowDisclosureModal] = useState(false);

  // Auto-calculated age gap
  const mAgeNum = parseInt(formData.male_age, 10) || 28;
  const fAgeNum = parseInt(formData.female_age, 10) || 27;
  const ageGap = Math.abs(mAgeNum - fAgeNum);

  // Lifestyle similarity check
  const lifestyleMap = { rarely: 1, sometimes: 2, often: 3, very_often: 4 };
  const mLife = lifestyleMap[formData.male_goes_out] || 2;
  const fLife = lifestyleMap[formData.female_goes_out] || 2;
  const diff = Math.abs(mLife - fLife);
  const similarityLabel = diff === 0 ? "HIGH" : diff === 1 ? "MODERATE" : "LOW";
  const similarityBg = diff === 0 ? "bg-pastel-green" : diff === 1 ? "bg-pastel-yellow" : "bg-pastel-pink";

  const handleAgeChange = (field, value) => {
    if (value === '') {
      updateFormField(field, '');
      return;
    }
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      updateFormField(field, Math.min(100, Math.max(1, num)));
    }
  };

  const handleAgeBlur = (field) => {
    const val = formData[field];
    if (val === '' || val === null || val === undefined || parseInt(val, 10) < 18) {
      updateFormField(field, 18);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Sanitize any empty age inputs before running prediction
    const sanitizedData = {
      ...formData,
      male_age: parseInt(formData.male_age, 10) || 18,
      female_age: parseInt(formData.female_age, 10) || 18
    };

    try {
      await runPrediction(sanitizedData);
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err) {
      console.error("Form submission failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10 max-w-4xl mx-auto relative px-2 sm:px-4">
      {/* Background Decorative Cute Graphics (Non-Overlapping Side Margins on Large Displays) */}
      <div className="absolute -left-16 top-12 opacity-80 hidden lg:block pointer-events-none z-0">
        <LoveLetterSticker className="w-14 h-14 -rotate-12" />
      </div>
      <div className="absolute -right-16 top-64 opacity-80 hidden lg:block pointer-events-none z-0">
        <DatingCoffeeSticker className="w-14 h-14 rotate-12" />
      </div>
      <div className="absolute -left-16 bottom-32 opacity-75 hidden lg:block pointer-events-none z-0">
        <SparkleCluster className="w-12 h-12" />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: BASIC INFORMATION (Pastel Blue) */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-pastel-blue p-5 sm:p-8 rounded-3xl border border-black shadow-sticker-lg space-y-6 relative z-10">
        <div className="flex flex-wrap items-center justify-between border-b border-black/20 pb-3 gap-2">
          <h3 className="text-lg sm:text-xl font-black text-ink flex items-center gap-2">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white border border-black flex items-center justify-center text-xs font-black shadow-sticker-sm">01</span>
            Basic Information
          </h3>
          <span className="text-xs font-bold text-ink bg-white px-3 py-1 rounded-full border border-black shadow-sticker-sm">
            Demographics
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {/* Male Age Input Card */}
          <div className="space-y-2.5 bg-white p-4 rounded-2xl border border-black shadow-sticker-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-ink flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-coral" /> Male Age
              </label>
              <span className="text-xs font-black text-coral bg-pastel-pink/60 px-2 py-0.5 rounded-md border border-black/20">
                {formData.male_age !== '' ? `${formData.male_age} yrs` : '18 yrs'}
              </span>
            </div>

            {/* Stepper + Number Input */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateFormField('male_age', Math.max(18, (parseInt(formData.male_age, 10) || 18) - 1))}
                className="w-10 h-10 rounded-xl border border-black bg-pastel-yellow hover:bg-yellow-200 text-ink font-black text-lg flex items-center justify-center shadow-sticker-sm active:translate-y-0.5 transition-all shrink-0"
                aria-label="Decrease male age"
              >
                <Minus className="w-4 h-4 stroke-[3]" />
              </button>

              <input
                type="number"
                min="18"
                max="100"
                value={formData.male_age}
                onChange={(e) => handleAgeChange('male_age', e.target.value)}
                onBlur={() => handleAgeBlur('male_age')}
                className="w-full bg-[#FFFBF8] border border-black rounded-xl p-2 text-center text-base sm:text-sm font-black text-ink focus:ring-0"
                placeholder="28"
                required
              />

              <button
                type="button"
                onClick={() => updateFormField('male_age', Math.min(100, (parseInt(formData.male_age, 10) || 18) + 1))}
                className="w-10 h-10 rounded-xl border border-black bg-pastel-green hover:bg-green-200 text-ink font-black text-lg flex items-center justify-center shadow-sticker-sm active:translate-y-0.5 transition-all shrink-0"
                aria-label="Increase male age"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            {/* Age Range Drag Slider */}
            <div className="space-y-1 pt-1">
              <input
                type="range"
                min="18"
                max="80"
                value={formData.male_age || 18}
                onChange={(e) => updateFormField('male_age', parseInt(e.target.value, 10))}
                className="w-full cursor-pointer accent-coral"
              />
              <div className="flex justify-between text-[10px] font-bold text-gray-500 px-0.5">
                <span>18</span>
                <span>40</span>
                <span>80</span>
              </div>
            </div>

            {/* Quick Age Presets */}
            <div className="flex flex-wrap gap-1 pt-1">
              {[21, 25, 28, 32, 35, 40].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => updateFormField('male_age', preset)}
                  className={`px-2 py-0.5 text-[10px] sm:text-[11px] font-bold rounded-lg border border-black transition-all ${
                    Number(formData.male_age) === preset ? 'bg-coral text-white shadow-sticker-sm' : 'bg-gray-100 text-ink hover:bg-gray-200'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Female Age Input Card */}
          <div className="space-y-2.5 bg-white p-4 rounded-2xl border border-black shadow-sticker-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-ink flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-coral" /> Female Age
              </label>
              <span className="text-xs font-black text-coral bg-pastel-pink/60 px-2 py-0.5 rounded-md border border-black/20">
                {formData.female_age !== '' ? `${formData.female_age} yrs` : '18 yrs'}
              </span>
            </div>

            {/* Stepper + Number Input */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateFormField('female_age', Math.max(18, (parseInt(formData.female_age, 10) || 18) - 1))}
                className="w-10 h-10 rounded-xl border border-black bg-pastel-yellow hover:bg-yellow-200 text-ink font-black text-lg flex items-center justify-center shadow-sticker-sm active:translate-y-0.5 transition-all shrink-0"
                aria-label="Decrease female age"
              >
                <Minus className="w-4 h-4 stroke-[3]" />
              </button>

              <input
                type="number"
                min="18"
                max="100"
                value={formData.female_age}
                onChange={(e) => handleAgeChange('female_age', e.target.value)}
                onBlur={() => handleAgeBlur('female_age')}
                className="w-full bg-[#FFFBF8] border border-black rounded-xl p-2 text-center text-base sm:text-sm font-black text-ink focus:ring-0"
                placeholder="27"
                required
              />

              <button
                type="button"
                onClick={() => updateFormField('female_age', Math.min(100, (parseInt(formData.female_age, 10) || 18) + 1))}
                className="w-10 h-10 rounded-xl border border-black bg-pastel-green hover:bg-green-200 text-ink font-black text-lg flex items-center justify-center shadow-sticker-sm active:translate-y-0.5 transition-all shrink-0"
                aria-label="Increase female age"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            {/* Age Range Drag Slider */}
            <div className="space-y-1 pt-1">
              <input
                type="range"
                min="18"
                max="80"
                value={formData.female_age || 18}
                onChange={(e) => updateFormField('female_age', parseInt(e.target.value, 10))}
                className="w-full cursor-pointer accent-coral"
              />
              <div className="flex justify-between text-[10px] font-bold text-gray-500 px-0.5">
                <span>18</span>
                <span>40</span>
                <span>80</span>
              </div>
            </div>

            {/* Quick Age Presets */}
            <div className="flex flex-wrap gap-1 pt-1">
              {[21, 25, 27, 30, 35, 40].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => updateFormField('female_age', preset)}
                  className={`px-2 py-0.5 text-[10px] sm:text-[11px] font-bold rounded-lg border border-black transition-all ${
                    Number(formData.female_age) === preset ? 'bg-coral text-white shadow-sticker-sm' : 'bg-gray-100 text-ink hover:bg-gray-200'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Auto-Calculated Age Gap Badge Card */}
          <div className="bg-white p-5 rounded-2xl border border-black shadow-sticker-sm flex flex-col justify-between items-center text-center space-y-2">
            <div className="text-xs font-extrabold text-body">Auto-Calculated Age Gap</div>
            <div className="text-2xl font-black text-ink bg-pastel-yellow px-5 py-2 rounded-2xl border-2 border-black shadow-sticker-sm">
              {ageGap} {ageGap === 1 ? 'year' : 'years'}
            </div>
            <div className="text-[11px] font-medium text-gray-600">
              {ageGap === 0 ? "Identical ages" : `Male is ${mAgeNum > fAgeNum ? 'older' : 'younger'} by ${ageGap} ${ageGap === 1 ? 'yr' : 'yrs'}`}
            </div>
          </div>
        </div>

        {/* Toggles: Same Race & Same Field */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
          <div className="bg-white p-4 rounded-2xl border border-black shadow-sticker-sm flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-extrabold text-ink">Same Cultural/Race Group</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => updateFormField('same_race', 1)}
                className={`px-4 py-1.5 text-xs font-bold rounded-xl border border-black transition-all ${
                  formData.same_race === 1 ? 'bg-pastel-green shadow-sticker-sm' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => updateFormField('same_race', 0)}
                className={`px-4 py-1.5 text-xs font-bold rounded-xl border border-black transition-all ${
                  formData.same_race === 0 ? 'bg-pastel-pink shadow-sticker-sm' : 'bg-gray-100 text-gray-600'
                }`}
              >
                No
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-black shadow-sticker-sm flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-extrabold text-ink">Same Academic / Work Field</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => updateFormField('same_field', 1)}
                className={`px-4 py-1.5 text-xs font-bold rounded-xl border border-black transition-all ${
                  formData.same_field === 1 ? 'bg-pastel-green shadow-sticker-sm' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => updateFormField('same_field', 0)}
                className={`px-4 py-1.5 text-xs font-bold rounded-xl border border-black transition-all ${
                  formData.same_field === 0 ? 'bg-pastel-pink shadow-sticker-sm' : 'bg-gray-100 text-gray-600'
                }`}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: COMPATIBILITY SIGNALS (Pastel Yellow) */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-pastel-yellow p-5 sm:p-8 rounded-3xl border border-black shadow-sticker-lg space-y-6 relative z-10">
        <div className="flex flex-wrap items-center justify-between border-b border-black/20 pb-3 gap-2">
          <h3 className="text-lg sm:text-xl font-black text-ink flex items-center gap-2">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white border border-black flex items-center justify-center text-xs font-black shadow-sticker-sm">02</span>
            Compatibility Signals
          </h3>
          <span className="text-xs font-bold text-ink bg-white px-3 py-1 rounded-full border border-black shadow-sticker-sm">
            Interests & Lifestyle
          </span>
        </div>

        {/* Shared Interests Slider */}
        <div className="bg-white p-4 rounded-2xl border border-black shadow-sticker-sm">
          <RatingSlider
            label="Shared Interests Rating"
            value={formData.shared_interests}
            onChange={(val) => updateFormField('shared_interests', val)}
            icon={Sparkles}
            min={0}
            max={10}
          />
        </div>

        {/* Going Out Dropdowns & Similarity Badge */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-end">
          <div className="space-y-1.5 bg-white p-4 rounded-2xl border border-black shadow-sticker-sm">
            <label className="text-xs font-extrabold text-ink">Male Going Out Frequency</label>
            <select
              value={formData.male_goes_out}
              onChange={(e) => updateFormField('male_goes_out', e.target.value)}
              className="w-full bg-[#FFFBF8] border border-black rounded-xl p-2.5 text-xs font-bold text-ink focus:ring-0"
            >
              <option value="rarely">Rarely</option>
              <option value="sometimes">Sometimes</option>
              <option value="often">Often</option>
              <option value="very_often">Very Often</option>
            </select>
          </div>

          <div className="space-y-1.5 bg-white p-4 rounded-2xl border border-black shadow-sticker-sm">
            <label className="text-xs font-extrabold text-ink">Female Going Out Frequency</label>
            <select
              value={formData.female_goes_out}
              onChange={(e) => updateFormField('female_goes_out', e.target.value)}
              className="w-full bg-[#FFFBF8] border border-black rounded-xl p-2.5 text-xs font-bold text-ink focus:ring-0"
            >
              <option value="rarely">Rarely</option>
              <option value="sometimes">Sometimes</option>
              <option value="often">Often</option>
              <option value="very_often">Very Often</option>
            </select>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-black shadow-sticker-sm flex items-center justify-between">
            <span className="text-xs font-extrabold text-body">Lifestyle Similarity</span>
            <span className={`text-xs font-black px-3 py-1 rounded-full border border-black ${similarityBg}`}>
              {similarityLabel}
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: WHAT THEY SEE IN EACH OTHER (Pastel Green) */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-pastel-green p-5 sm:p-8 rounded-3xl border border-black shadow-sticker-lg space-y-6 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-black/20 pb-3 gap-2">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-ink flex items-center gap-2">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white border border-black flex items-center justify-center text-xs font-black shadow-sticker-sm">03</span>
              What They See In Each Other
            </h3>
            <p className="text-xs text-ink/80 font-medium pt-1">
              Rate the qualities each participant perceived during the speed-dating interaction.
            </p>
          </div>
          <span className="text-xs font-bold text-ink bg-white px-3 py-1 rounded-full border border-black shadow-sticker-sm self-start sm:self-auto">
            Perceptions (0-10)
          </span>
        </div>

        {/* Column Labels Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 text-xs font-black text-ink uppercase tracking-wider px-2">
          <div className="col-span-4">Attribute</div>
          <div className="col-span-4 text-center">Male's View (0-10)</div>
          <div className="col-span-4 text-center">Female's View (0-10)</div>
        </div>

        {/* Paired Rating Sliders */}
        <div className="space-y-4">
          {/* Attractiveness */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white p-4 rounded-2xl border border-black shadow-sticker-sm items-center">
            <div className="md:col-span-4 text-xs font-extrabold text-ink flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-coral fill-current" /> Attractiveness
            </div>
            <div className="md:col-span-4">
              <RatingSlider label="Male → Female" value={formData.attr_of_female} onChange={(v) => updateFormField('attr_of_female', v)} />
            </div>
            <div className="md:col-span-4">
              <RatingSlider label="Female → Male" value={formData.attr_of_male} onChange={(v) => updateFormField('attr_of_male', v)} />
            </div>
          </div>

          {/* Sincerity */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white p-4 rounded-2xl border border-black shadow-sticker-sm items-center">
            <div className="md:col-span-4 text-xs font-extrabold text-ink flex items-center gap-1.5">
              <Smile className="w-4 h-4 text-coral" /> Sincerity
            </div>
            <div className="md:col-span-4">
              <RatingSlider label="Male → Female" value={formData.sinc_of_female} onChange={(v) => updateFormField('sinc_of_female', v)} />
            </div>
            <div className="md:col-span-4">
              <RatingSlider label="Female → Male" value={formData.sinc_of_male} onChange={(v) => updateFormField('sinc_of_male', v)} />
            </div>
          </div>

          {/* Intelligence */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white p-4 rounded-2xl border border-black shadow-sticker-sm items-center">
            <div className="md:col-span-4 text-xs font-extrabold text-ink flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-coral" /> Intelligence
            </div>
            <div className="md:col-span-4">
              <RatingSlider label="Male → Female" value={formData.intel_of_female} onChange={(v) => updateFormField('intel_of_female', v)} />
            </div>
            <div className="md:col-span-4">
              <RatingSlider label="Female → Male" value={formData.intel_of_male} onChange={(v) => updateFormField('intel_of_male', v)} />
            </div>
          </div>

          {/* Fun */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white p-4 rounded-2xl border border-black shadow-sticker-sm items-center">
            <div className="md:col-span-4 text-xs font-extrabold text-ink flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-coral" /> Fun
            </div>
            <div className="md:col-span-4">
              <RatingSlider label="Male → Female" value={formData.fun_of_female} onChange={(v) => updateFormField('fun_of_female', v)} />
            </div>
            <div className="md:col-span-4">
              <RatingSlider label="Female → Male" value={formData.fun_of_male} onChange={(v) => updateFormField('fun_of_male', v)} />
            </div>
          </div>

          {/* Ambition */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white p-4 rounded-2xl border border-black shadow-sticker-sm items-center">
            <div className="md:col-span-4 text-xs font-extrabold text-ink flex items-center gap-1.5">
              <Award className="w-4 h-4 text-coral" /> Ambition
            </div>
            <div className="md:col-span-4">
              <RatingSlider label="Male → Female" value={formData.amb_of_female} onChange={(v) => updateFormField('amb_of_female', v)} />
            </div>
            <div className="md:col-span-4">
              <RatingSlider label="Female → Male" value={formData.amb_of_male} onChange={(v) => updateFormField('amb_of_male', v)} />
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4: PREFERENCES & SELF-RATINGS (Pastel Lavender) */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-pastel-lavender p-5 sm:p-8 rounded-3xl border border-black shadow-sticker-lg space-y-6 relative z-10">
        <div className="flex flex-wrap items-center justify-between border-b border-black/20 pb-3 gap-2">
          <h3 className="text-lg sm:text-xl font-black text-ink flex items-center gap-2">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white border border-black flex items-center justify-center text-xs font-black shadow-sticker-sm">04</span>
            Preferences & Self-Ratings
          </h3>
          <span className="text-xs font-bold text-ink bg-white px-3 py-1 rounded-full border border-black shadow-sticker-sm">
            Self & Priorities
          </span>
        </div>

        {/* Preferences (0-100) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RatingSlider label="Male Pref - Attractiveness" value={formData.male_pref_attr} onChange={(v) => updateFormField('male_pref_attr', v)} min={0} max={100} unit="/ 100" />
          <RatingSlider label="Male Pref - Intelligence" value={formData.male_pref_intel} onChange={(v) => updateFormField('male_pref_intel', v)} min={0} max={100} unit="/ 100" />
          <RatingSlider label="Female Pref - Attractiveness" value={formData.female_pref_attr} onChange={(v) => updateFormField('female_pref_attr', v)} min={0} max={100} unit="/ 100" />
          <RatingSlider label="Female Pref - Intelligence" value={formData.female_pref_intel} onChange={(v) => updateFormField('female_pref_intel', v)} min={0} max={100} unit="/ 100" />
        </div>

        {/* Self-Rated Attractiveness (0-10) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <RatingSlider label="Male Self-Rated Attractiveness" value={formData.male_self_attr} onChange={(v) => updateFormField('male_self_attr', v)} min={0} max={10} />
          <RatingSlider label="Female Self-Rated Attractiveness" value={formData.female_self_attr} onChange={(v) => updateFormField('female_self_attr', v)} min={0} max={10} />
        </div>
      </div>

      {/* Error Banner if any */}
      {error && (
        <div className="p-4 bg-pastel-pink border-2 border-black rounded-2xl shadow-sticker text-ink text-sm font-bold flex items-center justify-between relative z-10">
          <span>{error}</span>
          <button type="button" onClick={() => updateFormField('error', null)} className="p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Submit Button & Disclosure */}
      <div className="space-y-4 pt-4 text-center relative z-10">
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary text-base sm:text-lg py-3.5 sm:py-4 px-8 sm:px-12 shadow-sticker-lg rounded-full font-black text-white hover:scale-105 transition-transform disabled:opacity-50 w-full sm:w-auto"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing Signals...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Predict Our Compatibility
              <ArrowRight className="w-5 h-5" />
            </span>
          )}
        </button>

        <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-body font-medium pt-2">
          <Info className="w-3.5 h-3.5 text-coral shrink-0" />
          <span>Datezo currently predicts match likelihood using post-interaction ratings. It is not a pre-date attraction predictor.</span>
          <button
            type="button"
            onClick={() => setShowDisclosureModal(true)}
            className="text-coral underline font-bold hover:text-coral-dark"
          >
            Why does this matter?
          </button>
        </div>
      </div>

      {/* Disclosure Modal */}
      {showDisclosureModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-sticker-lg space-y-4 relative animate-in fade-in zoom-in">
            <button
              onClick={() => setShowDisclosureModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full border border-black hover:bg-pastel-pink"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-ink" />
            </button>

            <div className="w-10 h-10 rounded-2xl bg-pastel-yellow border border-black flex items-center justify-center">
              <Info className="w-5 h-5 text-ink" />
            </div>

            <h4 className="text-xl font-black text-ink">Why Does Post-Interaction Matter?</h4>
            
            <p className="text-xs text-body font-medium leading-relaxed">
              The current Datezo model evaluates speed-dating outcomes based on ratings captured during or after the interaction (Scenario A).
            </p>
            <p className="text-xs text-body font-medium leading-relaxed">
              A true pre-date prediction (Scenario B) would require predicting match likelihood strictly before two people meet, excluding post-interaction perception signals.
            </p>

            <button
              onClick={() => setShowDisclosureModal(false)}
              className="btn-secondary w-full py-2 text-xs font-bold"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
