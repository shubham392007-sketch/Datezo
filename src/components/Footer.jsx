import React from 'react';
import { Link } from 'react-router-dom';
import { DatezoLogo } from './illustrations/DatezoLogo';
import { Heart, Github, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white border-t-2 border-black pt-12 pb-8 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        {/* Column 1: Brand Info (4 Cols) */}
        <div className="md:col-span-4 space-y-4">
          <DatezoLogo variant="white" />
          <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-xs">
            AI-powered speed dating match prediction platform with explainable compatibility insights.
          </p>
          <div className="flex items-center space-x-3 text-gray-400">
            <a href="https://github.com/shubham392007-sketch/Datezo.git" target="_blank" rel="noopener noreferrer" className="hover:text-coral transition-colors p-2 rounded-full border border-gray-700 bg-gray-900">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-coral transition-colors p-2 rounded-full border border-gray-700 bg-gray-900">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-coral transition-colors p-2 rounded-full border border-gray-700 bg-gray-900">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: PRODUCT (2 Cols) */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-widest text-coral">PRODUCT</h4>
          <ul className="space-y-2 text-xs font-semibold text-gray-300">
            <li><Link to="/predict" className="hover:text-white transition-colors">Start Prediction</Link></li>
            <li><Link to="/insights" className="hover:text-white transition-colors">Score Insights</Link></li>
            <li><Link to="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
            <li><Link to="/chat" className="hover:text-white transition-colors">Ask Datezo AI</Link></li>
          </ul>
        </div>

        {/* Column 3: RESOURCES (2 Cols) */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-widest text-coral">RESOURCES</h4>
          <ul className="space-y-2 text-xs font-semibold text-gray-300">
            <li><Link to="/blog" className="hover:text-white transition-colors">Compatibility Blog</Link></li>
            <li><Link to="/about#model-info" className="hover:text-white transition-colors">Model Documentation</Link></li>
            <li><a href="https://github.com/shubham392007-sketch/Datezo.git" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub Repository</a></li>
          </ul>
        </div>

        {/* Column 4: COMPANY (2 Cols) */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-widest text-coral">COMPANY</h4>
          <ul className="space-y-2 text-xs font-semibold text-gray-300">
            <li><Link to="/about" className="hover:text-white transition-colors">About Datezo</Link></li>
            <li><a href="mailto:support@datezo.ai" className="hover:text-white transition-colors">Contact Support</a></li>
            <li><Link to="/about#privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/about#terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Column 5: Couple Illustration (2 Cols / Bottom Right) */}
        <div className="md:col-span-2 flex items-end justify-end select-none">
          <svg className="w-28 h-auto" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 90 V50 C30 42 42 34 50 34 C58 34 70 42 70 50 V90" fill="#F28B94" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="50" cy="24" r="12" fill="#FCD5CE" stroke="#FFFFFF" strokeWidth="2" />
            <path d="M38 20 C38 8 62 8 64 20" fill="#1A1A1A" stroke="#FFFFFF" strokeWidth="1.5" />

            <path d="M65 90 V52 C65 44 76 36 84 36 C92 36 102 44 102 52 V90" fill="#FBECAF" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="84" cy="26" r="11" fill="#FCD5CE" stroke="#FFFFFF" strokeWidth="2" />
            <path d="M73 22 C73 10 95 10 97 22" fill="#1A1A1A" stroke="#FFFFFF" strokeWidth="1.5" />

            <path d="M64 12 C60 5 52 8 56 14 Q64 20 64 20 Q64 20 72 14 C76 8 68 5 64 12 Z" fill="#F28B94" stroke="#FFFFFF" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-400 gap-4">
        <div>
          © 2026 Datezo. Built as a production ML project.
        </div>
        <div className="flex items-center gap-1.5 text-gray-400">
          Made with <Heart className="w-3.5 h-3.5 fill-coral text-coral" /> for real compatibility data.
        </div>
      </div>
    </footer>
  );
}
