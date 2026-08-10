import React from 'react';
import { Link } from 'react-router-dom';
import { DatezoLogo } from './illustrations/DatezoLogo';
import { Heart, Github, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white border-t-2 border-black pt-12 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <DatezoLogo variant="white" />
          <p className="text-sm text-gray-400 font-normal leading-relaxed max-w-xs">
            AI-powered speed dating match prediction platform with explainable compatibility insights.
          </p>
          <div className="flex items-center space-x-3 text-gray-400">
            <a href="https://github.com/shubham392007-sketch/Datezo.git" target="_blank" rel="noopener noreferrer" className="hover:text-coral transition-colors p-1.5 rounded-full border border-gray-700 bg-gray-900">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-coral transition-colors p-1.5 rounded-full border border-gray-700 bg-gray-900">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-coral transition-colors p-1.5 rounded-full border border-gray-700 bg-gray-900">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Product */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-coral">Product</h4>
          <ul className="space-y-2 text-sm font-medium text-gray-300">
            <li><Link to="/predict" className="hover:text-white transition-colors">Start Prediction</Link></li>
            <li><Link to="/insights" className="hover:text-white transition-colors">Score Insights</Link></li>
            <li><Link to="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
            <li><Link to="/chat" className="hover:text-white transition-colors">Ask Datezo AI</Link></li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-coral">Resources</h4>
          <ul className="space-y-2 text-sm font-medium text-gray-300">
            <li><Link to="/blog" className="hover:text-white transition-colors">Compatibility Blog</Link></li>
            <li><Link to="/about#model-info" className="hover:text-white transition-colors">Model Documentation</Link></li>
            <li><a href="https://github.com/shubham392007-sketch/Datezo.git" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub Repository</a></li>
          </ul>
        </div>

        {/* Column 4: Company */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-coral">Company</h4>
          <ul className="space-y-2 text-sm font-medium text-gray-300">
            <li><Link to="/about" className="hover:text-white transition-colors">About Datezo</Link></li>
            <li><a href="mailto:support@datezo.ai" className="hover:text-white transition-colors">Contact Support</a></li>
            <li><Link to="/about#privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/about#terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
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
