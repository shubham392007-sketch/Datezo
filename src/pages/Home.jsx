import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { FeatureRow } from '../components/FeatureRow';
import { Testimonial } from '../components/Testimonial';
import { HowItWorks } from '../components/HowItWorks';
import { ClosingCTA } from '../components/ClosingCTA';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF8]">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeatureRow />
        <Testimonial />
        <HowItWorks />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
}
