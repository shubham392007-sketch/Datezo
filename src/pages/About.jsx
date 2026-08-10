import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { StickerCard } from '../components/StickerCard';
import { HandDrawnUnderline } from '../components/illustrations/DecorativeShapes';
import { Brain, Scale, ShieldAlert, Sparkles } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF8]">
      <Navbar />
      <main className="flex-grow py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl sm:text-5xl font-black text-ink">
              Dating Meets{' '}
              <span className="relative inline-block text-coral">
                Data
                <HandDrawnUnderline className="absolute -bottom-2 left-0 w-full text-coral" />
              </span>
            </h1>
            <p className="text-base text-body font-medium max-w-xl mx-auto">
              Datezo is a machine learning project exploring how compatibility signals can be transformed into calibrated match predictions.
            </p>
          </div>

          {/* About Sections */}
          <div className="space-y-8">
            <StickerCard bgColor="bg-pastel-blue">
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-ink">The Problem</h3>
                <p className="text-sm text-ink/80 font-medium leading-relaxed">
                  Traditional dating algorithms output arbitrary "compatibility percentage" numbers without explaining how they were calculated or whether they represent genuine empirical probabilities.
                </p>
              </div>
            </StickerCard>

            <StickerCard bgColor="bg-pastel-yellow" id="calibration">
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-ink">The Model & Calibration</h3>
                <p className="text-sm text-ink/80 font-medium leading-relaxed">
                  Datezo trains 7 candidate ML classifiers (Logistic Regression, Decision Tree, Random Forest, SVM, KNN, XGBoost, LightGBM) using 5-Fold GroupKFold cross-validation grouped on participant IDs.
                </p>
                <p className="text-sm text-ink/80 font-medium leading-relaxed">
                  The selected classifier is calibrated via Sigmoid/Platt scaling so that an 84.7% score reflects genuine calibrated probability.
                </p>
              </div>
            </StickerCard>

            <StickerCard bgColor="bg-pastel-green" id="compatibility-index">
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-ink">The Datezo Compatibility Index</h3>
                <p className="text-sm text-ink/80 font-medium leading-relaxed">
                  Separate from model classification, the Datezo Compatibility Index is a transparent multi-attribute derived score (0-100) aggregating attraction (20%), shared interests (15%), intelligence & sincerity (15%), fun & ambition (15%), perception balance (10%), preference alignment (10%), background (10%), and lifestyle (5%).
                </p>
              </div>
            </StickerCard>

            <StickerCard bgColor="bg-pastel-pink" id="limitations">
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-ink flex items-center gap-2">
                  <ShieldAlert className="w-6 h-6 text-coral" /> Model Limitations (Scenario A)
                </h3>
                <p className="text-sm text-ink/80 font-medium leading-relaxed">
                  Datezo currently evaluates speed-dating interaction data using post-date ratings. Because it relies on interaction ratings, it is a post-interaction match predictor, not a pre-date attraction forecaster.
                </p>
              </div>
            </StickerCard>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
