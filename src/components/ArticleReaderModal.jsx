import React from 'react';
import { Link } from 'react-router-dom';
import { X, Calendar, Clock, User, Sparkles, BookOpen, ArrowRight, Bot } from 'lucide-react';
import { DatezoLogo } from './illustrations/DatezoLogo';

export function ArticleReaderModal({ article, onClose }) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#FFFBF8] border-2 border-black rounded-3xl max-w-3xl w-full shadow-sticker-lg my-8 overflow-hidden relative animate-in fade-in zoom-in duration-200">
        {/* Header Bar */}
        <div className="bg-coral px-6 py-4 border-b border-black flex items-center justify-between text-white sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <DatezoLogo variant="white" />
            <span className="text-xs font-black uppercase tracking-wider bg-ink px-2.5 py-0.5 rounded-full border border-black">
              ARTICLE READER
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white text-ink border border-black hover:bg-pastel-pink transition-colors"
            aria-label="Close Article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Body Content */}
        <div className="p-6 sm:p-10 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className={`px-3.5 py-1 rounded-full border border-black text-xs font-black text-ink ${article.categoryBg} shadow-sticker-sm`}>
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-body">
              <Calendar className="w-3.5 h-3.5 text-coral" />
              {article.date}
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-body">
              <Clock className="w-3.5 h-3.5 text-coral" />
              {article.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink leading-tight">
            {article.title}
          </h1>

          {/* Author Card */}
          <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-black shadow-sticker-sm max-w-fit">
            <div className="w-9 h-9 rounded-full bg-pastel-yellow border border-black flex items-center justify-center font-black text-xs text-ink">
              SP
            </div>
            <div>
              <div className="text-xs font-black text-ink">{article.author}</div>
              <div className="text-[10px] font-bold text-body uppercase">{article.authorRole}</div>
            </div>
          </div>

          <hr className="border-black/10" />

          {/* Article Full Body Text */}
          <div
            className="prose prose-sm sm:prose-base max-w-none text-ink font-normal leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/predict"
              onClick={onClose}
              className="btn-primary py-3 px-6 text-xs font-black w-full sm:w-auto text-center inline-flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              Test Compatibility Model →
            </Link>

            <Link
              to="/chat"
              onClick={onClose}
              className="btn-secondary py-3 px-6 text-xs font-black w-full sm:w-auto text-center inline-flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4 text-coral" />
              Ask Datezo AI About This →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
