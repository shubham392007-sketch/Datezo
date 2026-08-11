import React from 'react';
import { DEVELOPER_INFO } from '../config/developer';
import { DeveloperIllustration } from './illustrations/DeveloperIllustration';
import { DatezoLogo } from './illustrations/DatezoLogo';
import { ArrowUpRight, Mail, Github, Instagram, Linkedin, Send, Sparkles } from 'lucide-react';

// Official SVG Brand Mark for X (formerly Twitter)
function XIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

export function DeveloperContact({ showFull = true }) {
  const getSocialIcon = (id) => {
    switch (id) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'gmail':
        return <Mail className="w-5 h-5" />;
      case 'x':
        return <XIcon className="w-4 h-4" />;
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

  return (
    <section id="developer" className="bg-pastel-pink/60 border-t-2 border-b-2 border-black py-16 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* ------------------------------------------------------------- */}
        {/* TOP DEVELOPER INTRO & ILLUSTRATION (2-COLUMN GRID) */}
        {/* ------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT 7 COLS: DEVELOPER INTRODUCTION */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow & Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-pastel-yellow border border-black px-3.5 py-1 rounded-full text-xs font-black text-ink shadow-sticker-sm">
                <Sparkles className="w-3.5 h-3.5 text-coral fill-current" />
                {DEVELOPER_INFO.eyebrow}
              </span>
              <span className="bg-coral text-white border border-black px-3 py-1 rounded-full text-xs font-black shadow-sticker-sm">
                MADE BY SHUBHAM
              </span>
              <span className="bg-white border border-black px-3 py-1 rounded-full text-xs font-black text-ink shadow-sticker-sm">
                AI / ML × WEB
              </span>
            </div>

            {/* Large Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink leading-tight">
              {DEVELOPER_INFO.headlineMain}{' '}
              <span className="text-coral block sm:inline">{DEVELOPER_INFO.headlineSub}</span>
            </h2>

            {/* Main Description */}
            <p className="text-base text-body font-normal leading-relaxed max-w-2xl">
              {DEVELOPER_INFO.description}
            </p>

            {/* Developer Identity Sticker Card */}
            <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-sticker-lg space-y-3 relative">
              <div className="flex items-center justify-between border-b border-black/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-pastel-yellow border border-black flex items-center justify-center font-black text-ink text-base shadow-sticker-sm">
                    SP
                  </div>
                  <div>
                    <div className="text-lg font-black text-ink flex items-center gap-2">
                      {DEVELOPER_INFO.name}
                      <DatezoLogo variant="compact" />
                    </div>
                    <div className="text-xs font-bold text-coral uppercase tracking-wider">
                      {DEVELOPER_INFO.role}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-body font-medium leading-relaxed italic">
                "{DEVELOPER_INFO.bio}"
              </p>
            </div>

            {/* Contact CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="text-xs font-extrabold text-ink">
                {DEVELOPER_INFO.ctaPrompt}
              </div>
              <a
                href={`mailto:${DEVELOPER_INFO.email}`}
                className="btn-primary py-3 px-6 text-sm font-black shadow-sticker inline-flex items-center gap-2 rounded-full text-white"
              >
                <Send className="w-4 h-4" />
                Get In Touch →
              </a>
            </div>
          </div>

          {/* RIGHT 5 COLS: CUSTOM FLAT-VECTOR DEVELOPER ILLUSTRATION */}
          <div className="lg:col-span-5 flex justify-center">
            <DeveloperIllustration />
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* CONTACT CARDS GRID ("LET'S CONNECT") */}
        {/* ------------------------------------------------------------- */}
        <div className="space-y-8 pt-6 border-t border-black/10">
          {/* Section Subheader */}
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black text-ink">
              Let's <span className="text-coral">Connect</span>
            </h3>
            <p className="text-xs sm:text-sm text-body font-medium">
              Have an idea, want to collaborate, or just want to talk about AI and technology?
            </p>
          </div>

          {/* 5 Contact Items Responsive Grid (3+2 on Desktop, Stack on Mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {DEVELOPER_INFO.socials.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target={item.isEmail ? undefined : "_blank"}
                rel={item.isEmail ? undefined : "noopener noreferrer"}
                className="group bg-white border-2 border-black rounded-2xl p-4 shadow-sticker hover:shadow-sticker-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between space-y-3 relative overflow-hidden"
              >
                {/* Top Row: Icon & Top-Right External Arrow */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl border border-black bg-pastel-yellow flex items-center justify-center text-ink group-hover:text-coral group-hover:bg-pastel-pink transition-colors shadow-sticker-sm">
                    {getSocialIcon(item.id)}
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-coral transform translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0">
                    <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>

                {/* Bottom Row: Label & Handle */}
                <div className="space-y-0.5">
                  <div className="text-xs font-black text-ink uppercase tracking-wider">
                    {item.label}
                  </div>
                  <div className="text-xs font-bold text-body truncate group-hover:text-coral transition-colors">
                    {item.handle}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
