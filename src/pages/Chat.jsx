import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Sparkles, Send, Bot, User, HelpCircle } from 'lucide-react';
import { DatezoLogo } from '../components/illustrations/DatezoLogo';

const SUGGESTED_PROMPTS = [
  "What does 84.7% mean?",
  "Why did we get a high compatibility score?",
  "What is the Compatibility Index?",
  "Can this predict whether we'll like each other before meeting?"
];

const INITIAL_MESSAGES = [
  {
    sender: 'bot',
    text: 'Hello! I am Datezo Assistant. Ask me anything about your compatibility report, match probability, or model scores!'
  }
];

export function Chat() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getBotReply = (userText) => {
    const text = userText.toLowerCase();
    if (text.includes('84.7') || text.includes('mean')) {
      return "An 84.7% score means that based on your mutual attraction, shared interests, and ratings, the Datezo calibrated model estimates an 84.7% empirical probability of a mutual match!";
    } else if (text.includes('high') || text.includes('why')) {
      return "High compatibility scores are driven by strong mutual attractiveness ratings, high shared interests (above 7.5/10), and close preference alignments between both participants.";
    } else if (text.includes('index') || text.includes('compatibility index')) {
      return "The Datezo Compatibility Index (0-100) is a transparent derived utility score combining 11 weighted dimensions (attraction 20%, interests 15%, fun 15%, etc.). It is a derived score, not ground truth.";
    } else if (text.includes('before') || text.includes('pre-date') || text.includes('meeting')) {
      return "No. Datezo currently operates under Scenario A (post-interaction prediction) using ratings given during/after speed dating. It is not a pre-date attraction predictor.";
    }
    return "Great question! Datezo analyzes mutual attraction, shared interests, rating gaps, and preference alignments to compute calibrated match probability and compatibility insights.";
  };

  const handleSend = (textToSend = inputValue) => {
    if (!textToSend.trim()) return;

    const newMsg = { sender: 'user', text: textToSend };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const replyText = getBotReply(textToSend);
      setMessages(prev => [...prev, { sender: 'bot', text: replyText }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF8]">
      <Navbar />
      <main className="flex-grow py-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-pastel-pink px-3 py-1 rounded-full border border-black text-xs font-bold text-ink">
              <Sparkles className="w-3.5 h-3.5 text-coral fill-current" />
              AI ASSISTANT
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-ink">Ask Datezo 💖</h1>
            <p className="text-sm text-body font-medium">Understand your compatibility report in plain language.</p>
          </div>

          {/* Quick Prompt Pills */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="bg-white hover:bg-pastel-yellow border border-black text-xs font-extrabold text-ink px-3.5 py-1.5 rounded-full shadow-sticker-sm transition-all"
              >
                "{prompt}"
              </button>
            ))}
          </div>

          {/* Chat Container Card */}
          <div className="bg-white border-2 border-black rounded-3xl shadow-sticker-lg h-[500px] flex flex-col overflow-hidden">
            {/* Chat Top Bar */}
            <div className="bg-pastel-blue px-6 py-3 border-b border-black flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DatezoLogo variant="compact" />
                <span className="font-black text-sm text-ink">DATEZO AI ASSISTANT</span>
              </div>
              <span className="text-[10px] font-extrabold bg-white text-ink px-2.5 py-0.5 rounded-full border border-black">
                ONLINE
              </span>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#FFFBF8]">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-9 h-9 rounded-2xl border border-black flex items-center justify-center font-bold text-xs shrink-0 ${
                    msg.sender === 'user' ? 'bg-pastel-pink text-ink' : 'bg-pastel-yellow text-ink'
                  }`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-coral" />}
                  </div>

                  <div className={`max-w-[75%] p-4 rounded-2xl border border-black text-xs font-semibold leading-relaxed shadow-sticker-sm ${
                    msg.sender === 'user'
                      ? 'bg-coral text-white'
                      : 'bg-white text-ink'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs font-bold text-body italic bg-pastel-yellow/40 p-3 rounded-xl border border-black max-w-xs">
                  <span className="w-2 h-2 rounded-full bg-coral animate-bounce" />
                  Datezo is typing...
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-4 bg-white border-t border-black flex items-center gap-3">
              <input
                type="text"
                placeholder="Ask another question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-[#FFFBF8] border border-black rounded-xl p-3 text-xs font-bold text-ink focus:ring-0"
              />
              <button
                type="submit"
                className="btn-primary p-3 rounded-xl shadow-sticker-sm text-white"
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
