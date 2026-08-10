import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { StickerCard } from '../components/StickerCard';
import { Sparkles, ArrowRight, User, Mail, Lock } from 'lucide-react';

export function Signup() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF8]">
      <Navbar />
      <main className="flex-grow py-16 px-4 md:px-8 flex items-center justify-center">
        <StickerCard className="max-w-md w-full p-8 sm:p-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-pastel-yellow px-3 py-1 rounded-full border border-black text-xs font-bold text-ink">
              <Sparkles className="w-3.5 h-3.5 text-coral fill-current" />
              JOIN DATEZO AI
            </div>
            <h1 className="text-3xl font-black text-ink">Create Account</h1>
            <p className="text-xs text-body font-medium">Start estimating mutual match probabilities with explainability.</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-ink flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-coral" /> Full Name
              </label>
              <input
                type="text"
                placeholder="Alex Morgan"
                className="w-full bg-[#FFFBF8] border border-black rounded-xl p-3 text-xs font-bold text-ink"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-ink flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-coral" /> Email Address
              </label>
              <input
                type="email"
                placeholder="alex@example.com"
                className="w-full bg-[#FFFBF8] border border-black rounded-xl p-3 text-xs font-bold text-ink"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-ink flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-coral" /> Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#FFFBF8] border border-black rounded-xl p-3 text-xs font-bold text-ink"
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full py-3 text-sm font-black shadow-sticker-sm">
              Create My Datezo Account <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </form>

          <div className="text-center text-xs text-body pt-2 border-t border-black/10">
            Already have an account?{' '}
            <Link to="/login" className="text-coral font-bold underline">
              Log In
            </Link>
          </div>
        </StickerCard>
      </main>
      <Footer />
    </div>
  );
}
