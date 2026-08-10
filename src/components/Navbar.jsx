import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DatezoLogo } from './illustrations/DatezoLogo';
import { Menu, X, MessageSquare, LineChart, BookOpen, UserCheck, Sparkles } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#FFFBF8] border-b border-black h-[72px] flex items-center px-4 md:px-8">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Desktop Left Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-bold text-ink">
          <Link
            to="/chat"
            className={`flex items-center gap-1.5 hover:text-coral transition-colors ${
              isActive('/chat') ? 'text-coral' : ''
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Chat
          </Link>

          <Link
            to="/insights"
            className={`flex items-center gap-1.5 hover:text-coral transition-colors ${
              isActive('/insights') ? 'text-coral' : ''
            }`}
          >
            <LineChart className="w-4 h-4" />
            Insights
          </Link>

          <Link
            to="/blog"
            className={`flex items-center gap-1.5 hover:text-coral transition-colors ${
              isActive('/blog') ? 'text-coral' : ''
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Blog
          </Link>
        </nav>

        {/* Center Logo */}
        <Link to="/" className="flex items-center hover:opacity-95 transition-opacity">
          <DatezoLogo />
        </Link>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/login"
            className="text-sm font-bold text-ink hover:text-coral transition-colors px-3 py-1.5"
          >
            Log In
          </Link>

          <Link
            to="/predict"
            className="btn-primary text-sm py-2 px-5"
          >
            <Sparkles className="w-4 h-4 mr-1.5 fill-current" />
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg border border-black bg-white shadow-sticker-sm text-ink"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 w-full bg-[#FFFBF8] border-b-2 border-black p-6 space-y-4 shadow-sticker-lg z-50">
          <Link
            to="/predict"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-primary w-full text-center py-3 text-base flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 fill-current" />
            Start Prediction
          </Link>

          <nav className="flex flex-col space-y-3 pt-2 text-base font-bold text-ink">
            <Link
              to="/chat"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-pastel-pink border border-transparent hover:border-black"
            >
              <MessageSquare className="w-5 h-5 text-coral" />
              Ask Datezo (Chat)
            </Link>

            <Link
              to="/insights"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-pastel-blue border border-transparent hover:border-black"
            >
              <LineChart className="w-5 h-5 text-ink" />
              Score Insights
            </Link>

            <Link
              to="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-pastel-yellow border border-transparent hover:border-black"
            >
              <BookOpen className="w-5 h-5 text-ink" />
              Compatibility Blog
            </Link>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-pastel-green border border-transparent hover:border-black"
            >
              <UserCheck className="w-5 h-5 text-ink" />
              About Datezo
            </Link>

            <div className="pt-4 border-t border-black flex justify-between items-center">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold text-ink hover:text-coral"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold text-coral underline"
              >
                Create Account
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
