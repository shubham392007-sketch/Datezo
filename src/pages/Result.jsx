import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ResultCard } from '../components/ResultCard';
import { usePrediction } from '../hooks/usePrediction';
import { Sparkles, ArrowRight } from 'lucide-react';

export function Result() {
  const { result } = usePrediction();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF8]">
      <Navbar />
      <main className="flex-grow py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Breadcrumb Header */}
          <div className="text-center space-y-2">
            <nav className="text-xs font-bold text-body space-x-2">
              <Link to="/" className="hover:text-coral">Home</Link>
              <span>/</span>
              <Link to="/predict" className="hover:text-coral">Prediction</Link>
              <span>/</span>
              <span className="text-ink">Result Report</span>
            </nav>
          </div>

          {result ? (
            <ResultCard result={result} />
          ) : (
            /* No Result State Card */
            <div className="bg-white border-2 border-black rounded-3xl p-8 sm:p-12 text-center shadow-sticker-lg space-y-6 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-pastel-yellow border border-black flex items-center justify-center mx-auto text-coral">
                <Sparkles className="w-8 h-8 fill-current" />
              </div>
              <h2 className="text-2xl font-black text-ink">No Prediction Result Found</h2>
              <p className="text-sm text-body font-medium">
                Enter pair details in the prediction form to calculate mutual match likelihood and compatibility metrics.
              </p>
              <div className="pt-2">
                <Link to="/predict" className="btn-primary py-3 px-8 text-base">
                  Start a Prediction
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
