import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { StickerCard } from '../components/StickerCard';
import { DeveloperContact } from '../components/DeveloperContact';
import { ARTICLES } from '../data/articles';
import { HandDrawnUnderline } from '../components/illustrations/DecorativeShapes';
import { ArrowRight, BookOpen, Search, Sparkles, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = ["ALL", "MODELING", "CALIBRATION", "FEATURE ENGINEERING", "DATA SCIENCE", "PSYCHOLOGY", "AI ETHICS", "SYSTEM DESIGN", "DATING INSIGHTS"];

export function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter articles by category and search query
  const filteredArticles = ARTICLES.filter(art => {
    const matchesCategory = selectedCategory === "ALL" || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF8]">
      <Navbar />

      <main className="flex-grow py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-10 mb-16">
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 bg-pastel-yellow border border-black px-3 py-1 rounded-full text-xs font-black text-ink shadow-sticker-sm">
              <BookOpen className="w-3.5 h-3.5 text-coral" />
              DATEZO KNOWLEDGE BASE
            </span>

            <h1 className="text-4xl sm:text-5xl font-black text-ink">
              Date, Data & Better{' '}
              <span className="relative inline-block text-coral">
                Connections
                <HandDrawnUnderline className="absolute -bottom-2 left-0 w-full text-coral" />
              </span>
            </h1>

            <p className="text-sm sm:text-base text-body font-medium">
              18 in-depth articles demystifying machine learning, compatibility features, and calibration in dating.
            </p>
          </div>

          {/* Search Bar & Category Filter Bar */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles by topic, keyword, or algorithm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-black rounded-2xl py-3.5 pl-12 pr-4 text-xs font-extrabold text-ink shadow-sticker-sm focus:ring-0 placeholder:text-gray-400"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-[10px] font-black uppercase text-body tracking-wider shrink-0 flex items-center gap-1 mr-1">
                <Filter className="w-3 h-3 text-coral" /> Filter:
              </span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full border border-black text-xs font-black transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-coral text-white shadow-sticker-sm scale-105'
                      : 'bg-white text-ink hover:bg-pastel-yellow'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Article Cards Grid (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <StickerCard
                  key={article.id}
                  className="flex flex-col justify-between space-y-6 hover:-translate-y-1 transition-transform"
                >
                  <Link to={`/blog/${article.slug}`} className="space-y-4 block">
                    {/* Vector Category Card Top Banner */}
                    <div className={`h-40 ${article.categoryBg} border border-black rounded-xl flex items-center justify-center relative overflow-hidden shadow-sticker-sm`}>
                      <BookOpen className="w-14 h-14 text-ink opacity-30" />
                      <span className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full border border-black text-[10px] font-black text-ink shadow-sticker-sm">
                        {article.category}
                      </span>
                    </div>

                    <div className="flex items-center text-[10px] font-extrabold text-body space-x-3">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-xl font-black text-ink leading-snug hover:text-coral transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-xs text-body font-medium leading-relaxed">
                      {article.excerpt}
                    </p>
                  </Link>

                  <div className="pt-2 border-t border-black/10 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-body">{article.author}</span>
                    <Link
                      to={`/blog/${article.slug}`}
                      className="inline-flex items-center text-xs font-black text-coral hover:underline gap-1"
                    >
                      Read Article <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </StickerCard>
              ))
            ) : (
              <div className="col-span-full bg-white border-2 border-black rounded-3xl p-12 text-center shadow-sticker-lg max-w-md mx-auto space-y-3">
                <div className="text-xl font-black text-ink">No Articles Found</div>
                <p className="text-xs text-body font-medium">Try adjusting your search query or selecting another category.</p>
                <button
                  onClick={() => { setSelectedCategory("ALL"); setSearchQuery(""); }}
                  className="btn-secondary text-xs py-2 px-4 font-extrabold mt-2"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Reusable Developer & Contact Section */}
        <DeveloperContact />
      </main>

      <Footer />
    </div>
  );
}
