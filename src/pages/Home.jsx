import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { FeatureRow } from '../components/FeatureRow';
import { Testimonial } from '../components/Testimonial';
import { HowItWorks } from '../components/HowItWorks';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF8]">
      <Navbar />
      <main className="flex-grow">
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: 3-Column Feature Row */}
        <FeatureRow />

        {/* Section 3: Middle Section (What Daters Say & How Datezo Works Side-by-Side Grid) */}
        <section className="py-16 px-4 md:px-8 border-b border-black bg-[#FFFBF8]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 5 Cols: What Daters Say */}
            <div className="lg:col-span-5 h-full">
              <Testimonial />
            </div>

            {/* Right 7 Cols: How Datezo Works */}
            <div className="lg:col-span-7 h-full">
              <HowItWorks />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
