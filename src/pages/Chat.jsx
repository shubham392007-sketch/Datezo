import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { usePrediction } from '../hooks/usePrediction';
import { sendChatMessage, checkChatHealth } from '../services/chatApi';
import { DatezoLogo } from '../components/illustrations/DatezoLogo';
import { HandDrawnUnderline } from '../components/illustrations/DecorativeShapes';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Heart,
  RotateCcw,
  ExternalLink,
  AlertCircle,
  Cpu,
  Brain,
  CheckCircle,
  XCircle,
  X
} from 'lucide-react';

const QUICK_PROMPTS = [
  "What does my match probability mean?",
  "Why did we match?",
  "How is the Compatibility Index calculated?",
  "What influenced this prediction?",
  "Can this predict a pre-date match?",
  "What are the model's limitations?"
];

export function Chat() {
  const { result } = usePrediction();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // Health and connection state
  const [isOnline, setIsOnline] = useState(true);
  const [geminiStatus, setGeminiStatus] = useState('configured');

  // Prediction context state
  const [predictionContext, setPredictionContext] = useState(() => {
    if (result) {
      return {
        prediction: result.prediction ?? 1,
        label: result.label || (result.prediction === 1 ? 'MATCH' : 'NO MATCH'),
        match_probability: result.match_probability ?? 84.7,
        compatibility_category: result.compatibility_category || 'Very High Compatibility',
        compatibility_index: result.compatibility_index ?? 87.4,
        positive_factors: result.positive_factors || [],
        negative_factors: result.negative_factors || [],
        model_version: result.model_version || '1.0.0',
        threshold_used: result.threshold_used ?? 0.30
      };
    }
    const saved = sessionStorage.getItem('datezo_prediction_context');
    return saved ? JSON.parse(saved) : null;
  });

  // Conversation state
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem('datezo_chat_messages');
    return saved ? JSON.parse(saved) : [];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState(null);

  // Check health on mount
  useEffect(() => {
    checkChatHealth().then(res => {
      setIsOnline(res.healthy);
      setGeminiStatus(res.gemini);
    });
  }, []);

  // Save messages to session
  useEffect(() => {
    sessionStorage.setItem('datezo_chat_messages', JSON.stringify(messages));
  }, [messages]);

  // Save prediction context
  useEffect(() => {
    if (predictionContext) {
      sessionStorage.setItem('datezo_prediction_context', JSON.stringify(predictionContext));
    }
  }, [predictionContext]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend = inputMessage) => {
    const query = textToSend.trim();
    if (!query || isLoading) return;

    setErrorState(null);
    setInputMessage('');

    const userMsg = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Format conversation history for Gemini API (max last 10 messages)
      const conversationHistory = newMessages.slice(0, -1).map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await sendChatMessage({
        message: query,
        conversation: conversationHistory,
        prediction_context: predictionContext
      });

      if (res && res.success) {
        const assistantMsg = {
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: res.message,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, assistantMsg]);
      } else {
        setErrorState(res?.message || 'Datezo AI is temporarily unavailable. Please try again.');
      }
    } catch (err) {
      console.error('Chat error:', err);
      setErrorState('Something went wrong while connecting to Datezo AI.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setErrorState(null);
    sessionStorage.removeItem('datezo_chat_messages');
  };

  const handleClearContext = () => {
    setPredictionContext(null);
    sessionStorage.removeItem('datezo_prediction_context');
  };

  // Helper to format assistant text with markdown paragraphs, bold, and bullets
  const renderFormattedText = (text) => {
    if (!text) return null;

    // Split into paragraphs
    const paragraphs = text.split(/\n\n+/);

    return paragraphs.map((para, pIdx) => {
      // Check if paragraph is a bullet list
      const lines = para.split('\n');
      const isBulletList = lines.every(l => l.trim().startsWith('- ') || l.trim().startsWith('* ') || /^\d+\.\s/.test(l.trim()));

      if (isBulletList) {
        return (
          <ul key={pIdx} className="list-disc list-inside space-y-1 my-2 text-xs font-semibold leading-relaxed">
            {lines.map((line, lIdx) => {
              const cleanLine = line.replace(/^[-*\d.]+\s*/, '');
              return <li key={lIdx}>{formatInlineBold(cleanLine)}</li>;
            })}
          </ul>
        );
      }

      return (
        <p key={pIdx} className="my-1.5 text-xs font-semibold leading-relaxed">
          {lines.map((line, lIdx) => (
            <React.Fragment key={lIdx}>
              {lIdx > 0 && <br />}
              {formatInlineBold(line)}
            </React.Fragment>
          ))}
        </p>
      );
    });
  };

  const formatInlineBold = (lineText) => {
    const parts = lineText.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-extrabold text-ink">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF8]">
      <Navbar />

      <main className="flex-grow py-8 px-4 md:px-8">
        <div className="max-w-[1050px] mx-auto space-y-6">
          {/* ------------------------------------------------------------- */}
          {/* PAGE HEADER & STATUS BADGE */}
          {/* ------------------------------------------------------------- */}
          <div className="text-center space-y-2 relative">
            <div className="flex items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 bg-pastel-pink border border-black px-3.5 py-1 rounded-full text-xs font-black text-ink shadow-sticker-sm">
                <Sparkles className="w-3.5 h-3.5 text-coral fill-current" />
                CONVERSATIONAL ASSISTANT
              </span>

              {/* Status Badge */}
              {isOnline ? (
                <span className="inline-flex items-center gap-1.5 bg-pastel-green border border-black px-3 py-1 rounded-full text-[11px] font-black text-ink shadow-sticker-sm">
                  <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                  Datezo AI Online
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 bg-pastel-pink border border-black px-3 py-1 rounded-full text-[11px] font-black text-ink shadow-sticker-sm">
                  <span className="w-2 h-2 rounded-full bg-coral" />
                  Datezo AI Offline
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink">
              Ask Datezo <span className="text-coral">AI 💖</span>
            </h1>
            <p className="text-xs sm:text-sm text-body font-medium max-w-lg mx-auto">
              Understand your compatibility report in plain language. Powered by Gemini API.
            </p>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* CURRENT REPORT CONTEXT BANNER (IF PREDICTION EXISTS) */}
          {/* ------------------------------------------------------------- */}
          {predictionContext && (
            <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-sticker flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pastel-yellow border border-black flex items-center justify-center text-coral font-black shrink-0">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-body uppercase tracking-wider">
                    <span>CURRENT REPORT CONTEXT</span>
                    <span className="bg-coral text-white px-2 py-0.2 rounded text-[9px] font-bold">
                      {predictionContext.label}
                    </span>
                  </div>
                  <div className="text-sm font-black text-ink flex items-center gap-3">
                    <span className="text-coral">{predictionContext.match_probability}% Match Odds</span>
                    <span>•</span>
                    <span>{predictionContext.compatibility_index} / 100 Index</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => navigate('/result')}
                  className="btn-secondary text-xs py-1.5 px-3.5 inline-flex items-center gap-1"
                >
                  View Report <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleClearContext}
                  className="p-1.5 text-xs text-body hover:text-coral border border-transparent hover:border-black rounded-lg transition-colors"
                  title="Clear Report Context"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* MAIN CHAT CONTAINER CARD */}
          {/* ------------------------------------------------------------- */}
          <div className="bg-white border-2 border-black rounded-3xl shadow-sticker-lg h-[580px] flex flex-col overflow-hidden relative">
            {/* Top Bar Controls */}
            <div className="bg-pastel-blue px-6 py-3 border-b border-black flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DatezoLogo variant="compact" />
                <span className="font-black text-xs sm:text-sm text-ink uppercase tracking-wider">
                  DATEZO AI ASSISTANT
                </span>
              </div>

              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button
                    onClick={handleNewChat}
                    className="bg-white hover:bg-pastel-yellow border border-black px-3 py-1 rounded-xl text-xs font-bold text-ink shadow-sticker-sm flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    New Chat
                  </button>
                )}
              </div>
            </div>

            {/* Chat Body (Scrollable Messages Area) */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#FFFBF8]">
              {/* EMPTY STATE VISUAL & QUICK PROMPTS */}
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-6">
                  {/* Hero Graphic Card */}
                  <div className="bg-pastel-pink/40 border border-black rounded-2xl p-6 max-w-md w-full shadow-sticker-sm space-y-3 relative">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-black flex items-center justify-center mx-auto shadow-sticker-sm text-coral">
                      <Heart className="w-7 h-7 fill-current" />
                    </div>
                    <h3 className="text-xl font-black text-ink">Hi, I'm Datezo AI 💖</h3>
                    <p className="text-xs text-body font-medium leading-relaxed">
                      Your compatibility report has questions. Datezo AI has answers. I can explain your match probability, Compatibility Index, and feature signals.
                    </p>
                  </div>

                  {/* Quick Prompt Pills */}
                  <div className="space-y-2 max-w-xl w-full">
                    <div className="text-[11px] font-black uppercase tracking-wider text-body">
                      SUGGESTED QUESTIONS:
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {QUICK_PROMPTS.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(prompt)}
                          className="bg-white hover:bg-pastel-yellow border border-black text-xs font-bold text-ink px-3.5 py-2 rounded-2xl shadow-sticker-sm transition-transform hover:-translate-y-0.5"
                        >
                          "{prompt}"
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* MESSAGES LIST */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-9 h-9 rounded-2xl border border-black flex items-center justify-center font-bold text-xs shrink-0 ${
                      msg.role === 'user'
                        ? 'bg-pastel-pink text-ink'
                        : 'bg-pastel-yellow text-ink shadow-sticker-sm'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4.5 h-4.5 text-coral" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`max-w-[80%] sm:max-w-[75%] p-4 rounded-2xl border border-black shadow-sticker-sm space-y-1 ${
                    msg.role === 'user'
                      ? 'bg-coral text-white rounded-tr-xs'
                      : 'bg-white text-ink rounded-tl-xs'
                  }`}>
                    {msg.role === 'assistant' && (
                      <div className="text-[10px] font-black uppercase tracking-wider text-coral pb-1 border-b border-black/10 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 fill-current" />
                        DATEZO AI
                      </div>
                    )}

                    <div className="text-xs">
                      {msg.role === 'user' ? (
                        <p className="font-bold text-xs leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      ) : (
                        renderFormattedText(msg.content)
                      )}
                    </div>

                    <div className={`text-[9px] font-bold pt-1 text-right ${
                      msg.role === 'user' ? 'text-white/80' : 'text-body/60'
                    }`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {/* TYPING INDICATOR */}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-2xl border border-black bg-pastel-yellow flex items-center justify-center text-ink shrink-0 shadow-sticker-sm">
                    <Bot className="w-4.5 h-4.5 text-coral animate-bounce" />
                  </div>
                  <div className="bg-white border border-black p-3.5 rounded-2xl rounded-tl-xs shadow-sticker-sm flex items-center gap-2 text-xs font-black text-ink">
                    <span>Datezo AI is thinking</span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-coral animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-coral animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-coral animate-bounce [animation-delay:0.4s]" />
                    </span>
                  </div>
                </div>
              )}

              {/* ERROR BANNER */}
              {errorState && (
                <div className="p-4 bg-pastel-pink border-2 border-black rounded-2xl shadow-sticker space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black text-ink">
                    <AlertCircle className="w-4 h-4 text-coral shrink-0" />
                    <span>{errorState}</span>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleSendMessage(messages[messages.length - 1]?.content || "Explain my score")}
                      className="bg-white hover:bg-pastel-yellow border border-black px-3 py-1 rounded-xl text-xs font-bold text-ink shadow-sticker-sm"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={handleNewChat}
                      className="text-xs font-bold text-body hover:text-coral underline px-2 py-1"
                    >
                      New Chat
                    </button>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar Bottom */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 sm:p-4 bg-white border-t border-black flex items-center gap-3"
            >
              <input
                type="text"
                placeholder="Ask Datezo anything..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-[#FFFBF8] border border-black rounded-2xl p-3.5 text-xs font-extrabold text-ink focus:ring-0 placeholder:text-gray-400 disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="w-11 h-11 bg-coral hover:bg-coral-dark text-white rounded-full border border-black shadow-sticker-sm flex items-center justify-center transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 shrink-0"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
