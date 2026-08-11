import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { StickerCard } from '../components/StickerCard';
import { DeveloperContact } from '../components/DeveloperContact';
import { HandDrawnUnderline } from '../components/illustrations/DecorativeShapes';
import { ArrowRight, BookOpen } from 'lucide-react';

const ARTICLES = [
  {
    id: 1,
    title: "How Compatibility Scores Actually Work",
    category: "MODELING",
    categoryBg: "bg-pastel-blue",
    excerpt: "Demystifying feature engineering, mutual rating averages, and how perception gap features drive match probability.",
    date: "Aug 10, 2026",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "What Does an 84% Match Really Mean?",
    category: "CALIBRATION",
    categoryBg: "bg-pastel-yellow",
    excerpt: "Understanding the difference between raw model confidence scores and true empirical probabilities.",
    date: "Aug 08, 2026",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "Why Model Calibration Matters",
    category: "AI ETHICS",
    categoryBg: "bg-pastel-green",
    excerpt: "Why uncalibrated AI models output overconfident predictions and how Platt scaling restores real-world meaning.",
    date: "Aug 05, 2026",
    readTime: "6 min read"
  }
];

export function Blog() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF8]">
      <Navbar />
      <main className="flex-grow py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-12 mb-16">
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-black text-ink">
              Date, Data & Better{' '}
              <span className="relative inline-block text-coral">
                Connections
                <HandDrawnUnderline className="absolute -bottom-2 left-0 w-full text-coral" />
              </span>
            </h1>
            <p className="text-base text-body font-medium">
              Simple explanations for the signals behind modern compatibility prediction.
            </p>
          </div>

          {/* 3 Article Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTICLES.map((article) => (
              <StickerCard key={article.id} className="flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className={`h-40 ${article.categoryBg} border border-black rounded-xl flex items-center justify-center relative overflow-hidden shadow-sticker-sm`}>
                    <BookOpen className="w-12 h-12 text-ink opacity-40" />
                    <span className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full border border-black text-[10px] font-black text-ink">
                      {article.category}
                    </span>
                  </div>

                  <div className="flex items-center text-[10px] font-bold text-body space-x-3">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-xl font-black text-ink leading-tight hover:text-coral transition-colors cursor-pointer">
                    {article.title}
                  </h3>

                  <p className="text-xs text-body font-medium leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-2 border-t border-black/10">
                  <span className="inline-flex items-center text-xs font-black text-ink hover:text-coral gap-1 cursor-pointer">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </StickerCard>
            ))}
          </div>
        </div>

        {/* Reusable Developer & Contact Section */}
        <DeveloperContact />
      </main>
      <Footer />
    </div>
  );
}
