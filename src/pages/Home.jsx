import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { FeatureRow } from '../components/FeatureRow';
import { Testimonial } from '../components/Testimonial';
import { HowItWorks } from '../components/HowItWorks';
import { ClosingCTA } from '../components/ClosingCTA';
import { DeveloperContact } from '../components/DeveloperContact';
import { Footer } from '../components/Footer';
import { ArticleReaderModal } from '../components/ArticleReaderModal';
import { ARTICLES } from '../data/articles';
import { Link } from 'react-router-dom';
import { StickerCard } from '../components/StickerCard';
import { Scale, Gauge, AlertTriangle, ArrowRight, BookOpen } from 'lucide-react';
import { HandDrawnUnderline } from '../components/illustrations/DecorativeShapes';

export function Home() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const featuredArticles = ARTICLES.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF8]">
      {/* 1. Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* 2. Hero */}
        <Hero />

        {/* 3. Why Datezo (FeatureRow) */}
        <FeatureRow />

        {/* 4. What Daters Say & How Datezo Works (Middle Grid) */}
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

        {/* 5. Understanding Your Score / Insights */}
        <section className="py-16 px-4 md:px-8 border-b border-black bg-[#FFFBF8]">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black text-ink">
                Understanding Your{' '}
                <span className="relative inline-block text-coral">
                  Score
                  <HandDrawnUnderline className="absolute -bottom-2 left-0 w-full text-coral" />
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-body font-medium">
                Machine learning gives you a prediction. Datezo shows you what it means.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StickerCard bgColor="bg-pastel-blue" className="space-y-4">
                <Scale className="w-6 h-6 text-coral" />
                <h3 className="text-lg font-black text-ink">Compatibility Index</h3>
                <p className="text-xs text-body font-medium">A transparent derived 0–100 score across 11 key dimensions.</p>
                <Link to="/insights" className="inline-flex items-center text-xs font-black text-ink hover:text-coral gap-1 pt-2">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </StickerCard>

              <StickerCard bgColor="bg-pastel-yellow" className="space-y-4">
                <Gauge className="w-6 h-6 text-ink" />
                <h3 className="text-lg font-black text-ink">Model Calibration</h3>
                <p className="text-xs text-body font-medium">Platt scaling converts classifier outputs into empirical match odds.</p>
                <Link to="/insights" className="inline-flex items-center text-xs font-black text-ink hover:text-coral gap-1 pt-2">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </StickerCard>

              <StickerCard bgColor="bg-pastel-green" className="space-y-4">
                <AlertTriangle className="w-6 h-6 text-coral" />
                <h3 className="text-lg font-black text-ink">Scenario A Scope</h3>
                <p className="text-xs text-body font-medium">Evaluates interaction ratings, not pre-date attraction claims.</p>
                <Link to="/insights" className="inline-flex items-center text-xs font-black text-ink hover:text-coral gap-1 pt-2">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </StickerCard>
            </div>
          </div>
        </section>

        {/* 6. Blog / Articles Summary */}
        <section className="py-16 px-4 md:px-8 border-b border-black bg-pastel-yellow/30">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black text-ink">
                  Date, Data & Better <span className="text-coral">Connections</span>
                </h2>
                <p className="text-xs text-body font-medium pt-1">Articles demystifying compatibility signals and ML metrics.</p>
              </div>
              <Link to="/blog" className="btn-secondary py-2.5 px-5 text-xs font-bold self-start sm:self-auto flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> View All 18 Articles
              </Link>
            </div>

            {/* 3 Featured Article Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <StickerCard
                  key={article.id}
                  className="flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-transform cursor-pointer"
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className="space-y-3">
                    <div className={`h-36 ${article.categoryBg} border border-black rounded-xl flex items-center justify-center relative overflow-hidden shadow-sticker-sm`}>
                      <BookOpen className="w-12 h-12 text-ink opacity-30" />
                      <span className="absolute top-2.5 left-2.5 bg-white px-2.5 py-0.5 rounded-full border border-black text-[9px] font-black text-ink">
                        {article.category}
                      </span>
                    </div>

                    <div className="flex items-center text-[10px] font-extrabold text-body space-x-2">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-lg font-black text-ink leading-snug hover:text-coral transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-xs text-body font-medium leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-black/10">
                    <span className="inline-flex items-center text-xs font-black text-coral gap-1">
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </StickerCard>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Closing CTA */}
        <ClosingCTA />

        {/* 8. Developer & Contact Section */}
        <DeveloperContact showFull={true} />
      </main>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <ArticleReaderModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {/* 9. Footer */}
      <Footer />
    </div>
  );
}
