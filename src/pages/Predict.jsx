import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PairForm } from '../components/PairForm';
import { PredictionLoading } from '../components/PredictionLoading';
import { usePrediction } from '../hooks/usePrediction';
import { HandDrawnUnderline } from '../components/illustrations/DecorativeShapes';

export function Predict() {
  const { isLoading, loadingStep } = usePrediction();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/result');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FFFBF8]">
        <Navbar />
        <main className="flex-grow">
          <PredictionLoading step={loadingStep} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF8]">
      <Navbar />
      <main className="flex-grow py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Breadcrumb & Header */}
          <div className="text-center space-y-3">
            <nav className="text-xs font-bold text-body space-x-2">
              <Link to="/" className="hover:text-coral">Home</Link>
              <span>/</span>
              <span className="text-ink">Prediction</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink">
              Let's Read The{' '}
              <span className="relative inline-block text-coral">
                Signals
                <HandDrawnUnderline className="absolute -bottom-2 left-0 w-full text-coral" />
              </span>
            </h1>

            <p className="text-sm sm:text-base text-body font-normal max-w-xl mx-auto">
              Enter the pair details and Datezo will estimate their mutual match likelihood.
            </p>
          </div>

          {/* Form Progress Indicator Header */}
          <div className="flex items-center justify-between max-w-2xl mx-auto px-4 text-[10px] sm:text-xs font-black text-ink uppercase tracking-wider">
            <div className="flex items-center gap-1.5 text-coral">
              <span className="w-5 h-5 rounded-full bg-coral text-white flex items-center justify-center text-[10px]">1</span>
              <span>DETAILS</span>
            </div>
            <div className="h-0.5 bg-black flex-1 mx-2" />
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-pastel-yellow border border-black flex items-center justify-center text-[10px]">2</span>
              <span>SIGNALS</span>
            </div>
            <div className="h-0.5 bg-black flex-1 mx-2" />
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-pastel-green border border-black flex items-center justify-center text-[10px]">3</span>
              <span>RATINGS</span>
            </div>
            <div className="h-0.5 bg-black flex-1 mx-2" />
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-pastel-pink border border-black flex items-center justify-center text-[10px]">4</span>
              <span>REPORT</span>
            </div>
          </div>

          {/* Main Pair Form */}
          <PairForm onSubmitSuccess={handleSuccess} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
