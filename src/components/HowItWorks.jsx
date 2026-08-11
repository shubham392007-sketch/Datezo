import React from 'react';
import { PhoneMockupIllustration } from './illustrations/PhoneMockupIllustration';

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Enter Pair Details",
      desc: "Provide participant ages, shared interests, lifestyle and rating signals.",
      color: "bg-pastel-blue"
    },
    {
      number: "02",
      title: "Engineer Compatibility",
      desc: "Transforms raw inputs into mutual ratings, gaps and preference features.",
      color: "bg-pastel-green"
    },
    {
      number: "03",
      title: "Run the Model",
      desc: "Classifier produces a calibrated match probability & threshold decision.",
      color: "bg-pastel-pink"
    },
    {
      number: "04",
      title: "View Your Report",
      desc: "See MATCH or NO MATCH, probability, Index and feature breakdown.",
      color: "bg-pastel-lavender"
    }
  ];

  return (
    <div id="how-it-works" className="bg-pastel-yellow border-2 border-black rounded-3xl p-6 sm:p-8 shadow-sticker-lg h-full flex flex-col justify-between space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-black text-ink">
          How <span className="text-coral">Datezo</span> Works
        </h2>
        <p className="text-xs text-ink/80 font-medium">
          Four steps from pair details to an explainable match prediction report.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-center flex-1">
        {/* 2x2 Step Cards Left (7 Cols) */}
        <div className="xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white border border-black rounded-2xl p-4 shadow-sticker-sm space-y-2 transition-transform hover:-translate-y-1"
            >
              <div className={`w-8 h-8 ${step.color} border border-black rounded-lg flex items-center justify-center font-black text-ink text-xs shadow-sticker-sm`}>
                {step.number}
              </div>
              <h3 className="text-sm font-black text-ink">{step.title}</h3>
              <p className="text-[11px] text-body font-medium leading-normal">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Phone Mockup Right (5 Cols) */}
        <div className="xl:col-span-5 flex justify-center scale-90 sm:scale-100 origin-center">
          <PhoneMockupIllustration />
        </div>
      </div>
    </div>
  );
}
