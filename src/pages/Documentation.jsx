import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { StickerCard } from '../components/StickerCard';
import { DeveloperContact } from '../components/DeveloperContact';
import { HandDrawnUnderline } from '../components/illustrations/DecorativeShapes';
import { BookOpen, ShieldCheck, FileText, AlertTriangle, Code, Cpu, Lock, Sparkles, Scale } from 'lucide-react';

export function Documentation({ defaultTab = "overview" }) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Sync tab if navigated via URL hash or defaultTab prop
  useEffect(() => {
    if (location.hash === "#privacy") setActiveTab("privacy");
    else if (location.hash === "#terms") setActiveTab("terms");
    else if (location.hash === "#api") setActiveTab("api");
    else if (location.hash === "#disclaimer") setActiveTab("disclaimer");
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF8]">
      <Navbar />

      <main className="flex-grow py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-10 mb-16">
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 bg-pastel-yellow border border-black px-3.5 py-1 rounded-full text-xs font-black text-ink shadow-sticker-sm">
              <BookOpen className="w-3.5 h-3.5 text-coral" />
              OFFICIAL DATEZO DOCUMENTATION
            </span>

            <h1 className="text-4xl sm:text-5xl font-black text-ink">
              System Docs &{' '}
              <span className="relative inline-block text-coral">
                Policies
                <HandDrawnUnderline className="absolute -bottom-2 left-0 w-full text-coral" />
              </span>
            </h1>

            <p className="text-sm sm:text-base text-body font-medium">
              Technical architecture, ML pipeline specs, Terms of Service, and Data Privacy policies.
            </p>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-4xl mx-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2.5 rounded-full border border-black text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "overview"
                  ? 'bg-coral text-white shadow-sticker-sm scale-105'
                  : 'bg-white text-ink hover:bg-pastel-yellow'
              }`}
            >
              <Cpu className="w-4 h-4" /> System Overview
            </button>

            <button
              onClick={() => setActiveTab("api")}
              className={`px-4 py-2.5 rounded-full border border-black text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "api"
                  ? 'bg-coral text-white shadow-sticker-sm scale-105'
                  : 'bg-white text-ink hover:bg-pastel-yellow'
              }`}
            >
              <Code className="w-4 h-4" /> API & Model Reference
            </button>

            <button
              onClick={() => setActiveTab("privacy")}
              className={`px-4 py-2.5 rounded-full border border-black text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "privacy"
                  ? 'bg-coral text-white shadow-sticker-sm scale-105'
                  : 'bg-white text-ink hover:bg-pastel-yellow'
              }`}
            >
              <Lock className="w-4 h-4" /> Privacy Policy
            </button>

            <button
              onClick={() => setActiveTab("terms")}
              className={`px-4 py-2.5 rounded-full border border-black text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "terms"
                  ? 'bg-coral text-white shadow-sticker-sm scale-105'
                  : 'bg-white text-ink hover:bg-pastel-yellow'
              }`}
            >
              <FileText className="w-4 h-4" /> Terms of Service
            </button>

            <button
              onClick={() => setActiveTab("disclaimer")}
              className={`px-4 py-2.5 rounded-full border border-black text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "disclaimer"
                  ? 'bg-coral text-white shadow-sticker-sm scale-105'
                  : 'bg-white text-ink hover:bg-pastel-yellow'
              }`}
            >
              <AlertTriangle className="w-4 h-4" /> Ethics & Disclaimer
            </button>
          </div>

          {/* TAB 1: SYSTEM OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <StickerCard bgColor="bg-pastel-blue">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-6 h-6 text-coral" />
                    <h2 className="text-2xl font-black text-ink">Datezo Platform Architecture</h2>
                  </div>
                  <p className="text-sm text-body font-medium leading-relaxed">
                    Datezo is an end-to-end AI/ML application combining a high-performance <strong>FastAPI backend</strong> with a responsive <strong>React / Vite / Tailwind frontend</strong>. It ingests speed-dating rating signals, transforms raw responses into 11 domain features, computes calibrated match probabilities, and passes predictions to a Google Gemini conversational agent.
                  </p>
                </div>
              </StickerCard>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StickerCard bgColor="bg-pastel-yellow" className="space-y-3">
                  <h3 className="text-lg font-black text-ink">1. Feature Engineering Pipeline</h3>
                  <p className="text-xs text-body font-medium leading-relaxed">
                    Processes raw participant ratings across Attractiveness, Sincerity, Intelligence, Fun, Ambition, and Shared Interests. Constructs mutual averages and absolute perception gap features <code>abs(male_rating - female_rating)</code> to detect asymmetric interest.
                  </p>
                </StickerCard>

                <StickerCard bgColor="bg-pastel-green" className="space-y-3">
                  <h3 className="text-lg font-black text-ink">2. Calibrated Match Classifier</h3>
                  <p className="text-xs text-body font-medium leading-relaxed">
                    Trains candidate supervised models (Gradient Boosting / Logistic Regression) evaluated via 5-Fold <code>GroupKFold</code> splits grouped by participant ID. Applies Sigmoid (Platt) scaling to yield calibrated probability outputs.
                  </p>
                </StickerCard>

                <StickerCard bgColor="bg-pastel-pink" className="space-y-3">
                  <h3 className="text-lg font-black text-ink">3. Datezo Compatibility Index (0–100)</h3>
                  <p className="text-xs text-body font-medium leading-relaxed">
                    A deterministic, multi-attribute derived score aggregating 11 dimensions (Mutual Attraction 20%, Shared Hobbies 15%, Perception Balance 10%, Preference Alignment 10%, Lifestyle Similarity 5%).
                  </p>
                </StickerCard>

                <StickerCard bgColor="bg-pastel-lavender" className="space-y-3">
                  <h3 className="text-lg font-black text-ink">4. Gemini AI Chat Layer</h3>
                  <p className="text-xs text-body font-medium leading-relaxed">
                    Uses Google's official <code>google-genai</code> Python SDK on the FastAPI backend. Receives prediction report context and answers user queries in natural language without exposing backend API keys.
                  </p>
                </StickerCard>
              </div>
            </div>
          )}

          {/* TAB 2: API & MODEL REFERENCE */}
          {activeTab === "api" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <StickerCard bgColor="bg-white">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-black/10 pb-4">
                    <Code className="w-6 h-6 text-coral" />
                    <h2 className="text-2xl font-black text-ink">FastAPI Backend Endpoint Reference</h2>
                  </div>

                  {/* Endpoint 1: POST /api/v1/predict */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-pastel-green border border-black text-ink font-black text-xs px-2.5 py-1 rounded-md">POST</span>
                      <code className="font-mono text-sm font-black text-ink">/api/v1/predict</code>
                    </div>
                    <p className="text-xs text-body font-medium">Executes ML inference on pair ratings and outputs match prediction, probability, category, index score, and positive/negative factors.</p>
                    <pre class="bg-pastel-yellow/30 p-4 rounded-2xl border border-black font-mono text-xs overflow-x-auto text-ink">
{`// Request Body:
{
  "male_attr": 8.0, "female_attr": 8.5,
  "male_sinc": 7.0, "female_sinc": 8.0,
  "male_intel": 9.0, "female_intel": 9.0,
  "male_fun": 8.5, "female_fun": 8.0,
  "male_amb": 7.5, "female_amb": 8.0,
  "shared_interests": 8.0,
  "lifestyle_male": 3, "lifestyle_female": 3
}

// Response Body:
{
  "prediction": 1,
  "match_probability": 84.7,
  "compatibility_category": "Very High Compatibility",
  "compatibility_index": 87.4,
  "positive_factors": ["High Mutual Attractiveness", "Strong Shared Hobbies", "Balanced Perceptions"],
  "negative_factors": [],
  "model_version": "1.0.0",
  "threshold_used": 0.30
}`}
                    </pre>
                  </div>

                  <hr className="border-black/10" />

                  {/* Endpoint 2: POST /api/v1/chat */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-pastel-blue border border-black text-ink font-black text-xs px-2.5 py-1 rounded-md">POST</span>
                      <code className="font-mono text-sm font-black text-ink">/api/v1/chat</code>
                    </div>
                    <p className="text-xs text-body font-medium">Sends user question, conversation history, and prediction context to Google Gemini AI API.</p>
                  </div>
                </div>
              </StickerCard>
            </div>
          )}

          {/* TAB 3: PRIVACY POLICY */}
          {activeTab === "privacy" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <StickerCard bgColor="bg-white">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-black/10 pb-4">
                    <Lock className="w-6 h-6 text-coral" />
                    <div>
                      <h2 className="text-2xl font-black text-ink">Datezo Data Privacy Policy</h2>
                      <p className="text-xs text-body font-medium">Last Updated: August 11, 2026 • Effective Immediately</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm text-ink font-medium leading-relaxed">
                    <h3 className="text-base font-black text-ink">1. Information We Collect</h3>
                    <p>
                      Datezo is designed with <strong>Privacy-by-Design</strong> principles. We do NOT require or store personal identifying information (such as full legal names, credit cards, SSNs, or exact phone numbers) to generate compatibility predictions.
                    </p>
                    <ul>
                      <li><strong>Prediction Inputs:</strong> Numerical rating scores (0–10) provided in the prediction form are processed in-memory for inference.</li>
                      <li><strong>Chat Interaction Data:</strong> Messages sent to Datezo AI are passed securely to the Google Gemini API to generate conversational responses.</li>
                    </ul>

                    <h3 className="text-base font-black text-ink">2. How Data is Used</h3>
                    <p>
                      Your numerical ratings are used strictly to compute match probability and the Datezo Compatibility Index. We do NOT sell, rent, monetise, or trade user data to third-party advertisers or data brokers.
                    </p>

                    <h3 className="text-base font-black text-ink">3. API Key & Secret Security</h3>
                    <p>
                      Third-party API credentials (including <code>GEMINI_API_KEY</code>) are stored strictly inside backend <code>.env</code> files on our secure FastAPI server. Secrets are never exposed to browser client code, Vite environment variables, or committed to public code repositories.
                    </p>

                    <h3 className="text-base font-black text-ink">4. Cookies & Browser Storage</h3>
                    <p>
                      Datezo uses browser <code>sessionStorage</code> solely to retain your current prediction context between the `/result` page and `/chat` assistant. Closing your browser tab clears this transient session data.
                    </p>
                  </div>
                </div>
              </StickerCard>
            </div>
          )}

          {/* TAB 4: TERMS OF SERVICE */}
          {activeTab === "terms" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <StickerCard bgColor="bg-white">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-black/10 pb-4">
                    <FileText className="w-6 h-6 text-coral" />
                    <div>
                      <h2 className="text-2xl font-black text-ink">Datezo Terms of Service</h2>
                      <p className="text-xs text-body font-medium">Last Updated: August 11, 2026</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm text-ink font-medium leading-relaxed">
                    <h3 className="text-base font-black text-ink">1. Acceptance of Terms</h3>
                    <p>
                      By accessing or using the Datezo web application, prediction models, or Datezo AI chat features, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the application.
                    </p>

                    <h3 className="text-base font-black text-ink">2. Description of Service</h3>
                    <p>
                      Datezo is an educational and analytical machine-learning platform created by developer <strong>Shubham Pokale</strong>. It evaluates user-submitted rating signals to produce statistical match probability estimates and non-clinical compatibility indices.
                    </p>

                    <h3 className="text-base font-black text-ink">3. Non-Medical & Non-Therapeutic Disclaimer</h3>
                    <p>
                      Datezo AI and Datezo predictions are NOT human relationship counseling, psychological therapy, medical advice, or legal consultation. Datezo AI should never be used as a substitute for professional mental health care or interpersonal counseling.
                    </p>

                    <h3 className="text-base font-black text-ink">4. Intellectual Property</h3>
                    <p>
                      All brand assets, vector illustrations, logo designs, custom UI components, machine-learning pipeline code, and documentation are the exclusive intellectual property of Shubham Pokale and Datezo.
                    </p>
                  </div>
                </div>
              </StickerCard>
            </div>
          )}

          {/* TAB 5: ETHICS & DISCLAIMER */}
          {activeTab === "disclaimer" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <StickerCard bgColor="bg-pastel-pink/50">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-coral" />
                    <h2 className="text-2xl font-black text-ink">Responsible AI & Model Limitations</h2>
                  </div>
                  <div className="space-y-3 text-sm text-ink font-medium leading-relaxed">
                    <p>
                      <strong>Scenario A Boundary Notice:</strong> Datezo evaluates speed-dating interaction data using post-date ratings. Because it relies on interaction ratings, it is a post-interaction match predictor, not a pre-date attraction forecaster.
                    </p>
                    <p>
                      <strong>No Soulmate Guarantees:</strong> Datezo explicitly rejects "soulmate" or "100% guaranteed match" claims. Human relationships involve complex, dynamic factors that no algorithm can fully quantify.
                    </p>
                  </div>
                </div>
              </StickerCard>
            </div>
          )}
        </div>

        {/* Reusable Developer & Contact Section */}
        <DeveloperContact />
      </main>

      <Footer />
    </div>
  );
}
