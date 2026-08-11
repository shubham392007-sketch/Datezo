import React from 'react';
import { Link } from 'react-router-dom';
import { DatezoLogo } from './illustrations/DatezoLogo';
import { DEVELOPER_INFO } from '../config/developer';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white border-t-2 border-black pt-12 pb-8 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        {/* Column 1: Brand Info (4 Cols) */}
        <div className="md:col-span-4 space-y-4">
          <DatezoLogo variant="white" />
          <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-xs">
            AI-powered speed dating match prediction platform.
          </p>
        </div>

        {/* Column 2: PRODUCT (2 Cols) */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-widest text-coral">PRODUCT</h4>
          <ul className="space-y-2 text-xs font-semibold text-gray-300">
            <li><Link to="/predict" className="hover:text-white transition-colors">Prediction</Link></li>
            <li><Link to="/insights" className="hover:text-white transition-colors">Insights</Link></li>
            <li><Link to="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
            <li><Link to="/chat" className="hover:text-white transition-colors">Chat</Link></li>
          </ul>
        </div>

        {/* Column 3: RESOURCES (2 Cols) */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-widest text-coral">RESOURCES</h4>
          <ul className="space-y-2 text-xs font-semibold text-gray-300">
            <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link to="/documentation" className="hover:text-white transition-colors">Documentation</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link to="/about#model-info" className="hover:text-white transition-colors">Model Information</Link></li>
          </ul>
        </div>

        {/* Column 4: DEVELOPER (2 Cols) */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-widest text-coral">DEVELOPER</h4>
          <ul className="space-y-2 text-xs font-semibold text-gray-300">
            <li><a href="#developer" className="hover:text-white transition-colors">{DEVELOPER_INFO.name}</a></li>
            <li><a href={DEVELOPER_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
            <li><a href={DEVELOPER_INFO.socials.find(s => s.id === 'linkedin')?.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
            <li><a href={DEVELOPER_INFO.socials.find(s => s.id === 'instagram')?.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
          </ul>
        </div>

        {/* Column 5: CONTACT (2 Cols) */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-widest text-coral">CONTACT</h4>
          <ul className="space-y-2 text-xs font-semibold text-gray-300">
            <li><a href={`mailto:${DEVELOPER_INFO.email}`} className="hover:text-white transition-colors">Email</a></li>
            <li><a href={DEVELOPER_INFO.socials.find(s => s.id === 'x')?.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X</a></li>
          </ul>
        </div>
      </div>

      {/* Decorative Couple & Prediction Card Illustration (Right Side) */}
      <div className="absolute bottom-16 right-4 opacity-20 pointer-events-none hidden lg:block">
        <svg className="w-32 h-auto" viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 90 V50 C30 42 42 34 50 34 C58 34 70 42 70 50 V90" fill="#F28B94" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="50" cy="24" r="12" fill="#FCD5CE" stroke="#FFFFFF" strokeWidth="2" />
          <path d="M65 90 V52 C65 44 76 36 84 36 C92 36 102 44 102 52 V90" fill="#FBECAF" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="84" cy="26" r="11" fill="#FCD5CE" stroke="#FFFFFF" strokeWidth="2" />
          <path d="M64 12 C60 5 52 8 56 14 Q64 20 64 20 Q64 20 72 14 C76 8 68 5 64 12 Z" fill="#F28B94" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
        <div className="flex items-center gap-1.5">
          <span>© 2026 Datezo. Built by Shubham Pokale.</span>
          <Heart className="w-3.5 h-3.5 fill-coral text-coral" />
        </div>
        <div className="flex items-center gap-4 text-[11px] text-gray-400 font-medium">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <span>•</span>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <span>•</span>
          <Link to="/documentation" className="hover:text-white transition-colors">Documentation</Link>
        </div>
      </div>
    </footer>
  );
}
