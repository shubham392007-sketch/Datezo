import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Quote, Sparkles } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "What makes Datezo different is that the result isn't just a number. You can actually see the signals behind it.",
    author: "Prototype feedback",
    role: "Speed Dating Event Participant",
    avatarBg: "bg-pastel-pink",
    initials: "PF"
  },
  {
    quote: "Seeing the reasons behind a prediction makes the result feel much more useful than a simple yes or no.",
    author: "Early Beta User",
    role: "Speed Dating Host",
    avatarBg: "bg-pastel-blue",
    initials: "EB"
  },
  {
    quote: "The Datezo Compatibility Index gave us an honest 87.4 breakdown of our shared interests and rating gaps.",
    author: "Datezo Tester",
    role: "Research Participant",
    avatarBg: "bg-pastel-yellow",
    initials: "DT"
  }
];

export function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const active = TESTIMONIALS[currentIndex];

  return (
    <section className="py-16 px-4 md:px-8 border-b border-black bg-[#FFFBF8]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Title & Description Left (4 Cols) */}
        <div className="lg:col-span-4 space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-coral uppercase tracking-widest">
            <Sparkles className="w-4 h-4 fill-current" />
            EARLY FEEDBACK
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-ink">
            What Daters <span className="text-coral">Say ✦</span>
          </h2>
          <p className="text-sm text-body leading-relaxed">
            Real reactions from early speed-dating participants testing our explainable match prediction engine.
          </p>

          {/* Carousel Buttons */}
          <div className="flex items-center justify-center lg:justify-start space-x-3 pt-2">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full border border-black bg-white shadow-sticker-sm flex items-center justify-center text-ink hover:bg-pastel-yellow transition-colors"
              aria-label="Previous Testimonial"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex space-x-1.5">
              {TESTIMONIALS.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full border border-black transition-colors ${
                    idx === currentIndex ? 'bg-coral' : 'bg-white'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full border border-black bg-white shadow-sticker-sm flex items-center justify-center text-ink hover:bg-pastel-yellow transition-colors"
              aria-label="Next Testimonial"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Big Editorial Quote Card Right (8 Cols) */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-black rounded-3xl p-8 sm:p-12 shadow-sticker-lg relative overflow-hidden">
            {/* Oversized Background Quote Mark */}
            <Quote className="absolute -top-4 -right-4 w-32 h-32 text-pastel-pink/60 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <p className="text-xl sm:text-2xl font-bold text-ink leading-snug">
                "{active.quote}"
              </p>

              <div className="flex items-center gap-4 border-t border-black/10 pt-4">
                <div className={`w-12 h-12 rounded-full border border-black flex items-center justify-center font-extrabold text-ink ${active.avatarBg}`}>
                  {active.initials}
                </div>
                <div>
                  <div className="text-base font-extrabold text-ink">{active.author}</div>
                  <div className="text-xs font-medium text-body">{active.role}</div>
                </div>
                <div className="ml-auto bg-pastel-yellow text-ink text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-black">
                  PROTOTYPE FEEDBACK
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
