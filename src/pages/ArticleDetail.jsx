import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { DeveloperContact } from '../components/DeveloperContact';
import { ARTICLES } from '../data/articles';
import { StickerCard } from '../components/StickerCard';
import { ArrowLeft, Calendar, Clock, Sparkles, Bot, Share2, BookOpen } from 'lucide-react';
import { HandDrawnUnderline } from '../components/illustrations/DecorativeShapes';

export function ArticleDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const article = ARTICLES.find((a) => a.slug === slug || a.id === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FFFBF8]">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-8">
          <div className="bg-white border-2 border-black rounded-3xl p-12 text-center shadow-sticker-lg max-w-md space-y-4">
            <h1 className="text-2xl font-black text-ink">Article Not Found</h1>
            <p className="text-xs text-body font-medium">The article you are looking for does not exist or has been moved.</p>
            <Link to="/blog" className="btn-primary py-2.5 px-6 text-xs font-black inline-block">
              ← Return to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF8]">
      <Navbar />

      <main className="flex-grow py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-8 mb-16">
          {/* Top Navigation */}
          <div className="flex items-center justify-between">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-extrabold text-ink hover:text-coral transition-colors bg-white px-4 py-2 rounded-full border border-black shadow-sticker-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Knowledge Base
            </Link>

            <span className={`px-3.5 py-1 rounded-full border border-black text-xs font-black text-ink ${article.categoryBg} shadow-sticker-sm`}>
              {article.category}
            </span>
          </div>

          {/* Hero Title Section */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-body border-b border-black/10 pb-6">
              <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-black shadow-sticker-sm text-ink font-black">
                SP {article.author} ({article.authorRole})
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-coral" />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-coral" />
                {article.readTime}
              </span>
            </div>
          </div>

          {/* Featured Summary Callout */}
          <div className="bg-pastel-yellow/50 border-2 border-black rounded-2xl p-6 shadow-sticker-sm">
            <div className="text-xs font-black uppercase text-ink tracking-wider mb-1 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-coral fill-current" /> Executive Summary
            </div>
            <p className="text-sm font-bold text-ink leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          {/* Full Article Content */}
          <article className="bg-white border-2 border-black rounded-3xl p-6 sm:p-12 shadow-sticker-lg space-y-6">
            <div
              className="article-body-content text-ink font-medium leading-relaxed space-y-6 text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>

          {/* Bottom Interactive CTA Box */}
          <div className="bg-pastel-pink/50 border-2 border-black rounded-3xl p-8 text-center shadow-sticker-lg space-y-4">
            <h3 className="text-2xl font-black text-ink">Have Questions About This Article?</h3>
            <p className="text-xs sm:text-sm text-body font-medium max-w-md mx-auto">
              Ask Datezo AI (Powered by Google Gemini) to explain any equation, model metric, or concept in plain language.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link to="/chat" className="btn-primary py-3 px-6 text-xs font-black flex items-center gap-2">
                <Bot className="w-4 h-4" /> Ask Datezo AI →
              </Link>
              <Link to="/predict" className="btn-secondary py-3 px-6 text-xs font-black flex items-center gap-2">
                <Sparkles className="w-4 h-4 fill-current text-coral" /> Test Match Predictor →
              </Link>
            </div>
          </div>
        </div>

        {/* Reusable Developer Contact */}
        <DeveloperContact />
      </main>

      <Footer />
    </div>
  );
}
