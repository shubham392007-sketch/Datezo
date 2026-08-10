import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { StickerCard } from '../components/StickerCard';
import { ArrowLeft, HelpCircle } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF8]">
      <Navbar />
      <main className="flex-grow py-16 px-4 md:px-8 flex items-center justify-center">
        <StickerCard className="max-w-md w-full p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-pastel-pink border border-black flex items-center justify-center mx-auto text-coral font-black text-2xl shadow-sticker-sm">
            404
          </div>
          <h1 className="text-3xl font-black text-ink">Page Not Found</h1>
          <p className="text-xs text-body font-medium leading-relaxed">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="pt-2">
            <Link to="/" className="btn-primary py-3 px-6 text-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return Home
            </Link>
          </div>
        </StickerCard>
      </main>
      <Footer />
    </div>
  );
}
