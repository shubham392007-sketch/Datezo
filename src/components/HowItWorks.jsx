import React from 'react';
import { PhoneMockupIllustration } from './illustrations/PhoneMockupIllustration';

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Enter Pair Details",
      desc: "Provide the participant ages, shared interests, lifestyle and rating signals.",
      color: "bg-pastel-blue"
    },
    {
      number: "02",
      title: "Engineer Compatibility",
      desc: "Datezo transforms the raw inputs into mutual ratings, gaps and preference-alignment features.",
      color: "bg-pastel-green"
    },
    {
      number: "03",
      title: "Run the Model",
      desc: "The trained classifier produces a calibrated match probability and threshold-based decision.",
      color: "bg-pastel-pink"
    },
    {
      number: "04",
      title: "View Your Report",
      desc: "See MATCH or NO MATCH, probability, Compatibility Index and the factors behind the result.",
      color: "bg-pastel-lavender"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 px-4 md:px-8 bg-pastel-yellow border-b border-black">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-ink">
            How <span className="text-coral">Datezo</span> Works
          </h2>
          <p className="text-base text-ink/80 font-medium">
            Four steps from pair details to an explainable match prediction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 2x2 Numbered Cards Left (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-white border border-black rounded-2xl p-6 shadow-sticker relative space-y-3 transition-transform hover:-translate-y-1"
              >
                <div className={`w-10 h-10 ${step.color} border border-black rounded-xl flex items-center justify-center font-black text-ink text-base shadow-sticker-sm`}>
                  {step.number}
                </div>
                <h3 className="text-lg font-black text-ink">{step.title}</h3>
                <p className="text-xs text-body font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Phone Mockup Right (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <PhoneMockupIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
