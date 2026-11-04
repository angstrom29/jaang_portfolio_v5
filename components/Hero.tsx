
import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { CONTACT_WHATSAPP } from '../constants';
import { useContact } from '../context/ContactContext';

const Hero: React.FC = () => {
  const { openContact } = useContact();

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-900 pt-24 pb-20 lg:pt-32 lg:pb-32">
      {/* Background Decor - Optimized for Mobile Performance */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden transform-gpu">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-50 dark:bg-orange-900/20 rounded-full blur-3xl opacity-50 will-change-transform"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-orange-100/30 dark:bg-orange-800/10 rounded-full blur-3xl opacity-50 will-change-transform"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 animate-fade-in dark:bg-orange-500/10 dark:text-orange-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 dark:bg-orange-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500 dark:bg-orange-400"></span>
            </span>
            <span>Available for New Projects</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-[1.1] mb-8">
            AI Automations That Turn <br />
            <span className="text-orange-500 dark:text-orange-400 italic">Chaos Into Clean Systems</span>
          </h1>

          <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-3xl mx-auto">
            I build AI-powered workflows that <strong>generate more leads</strong> and <strong>streamline your operations</strong> using Make.com, n8n, Zapier, GoHighLevel, and AI Agents.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => openContact()}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-orange-600 transition-all shadow-xl shadow-orange-200 dark:shadow-none group animate-glow"
            >
              <span>Automate Your Business</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href={`https://wa.me/${CONTACT_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700 transition-all"
            >
              <MessageCircle className="w-5 h-5 text-green-500" />
              <span>Message me on WhatsApp</span>
            </a>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
              <img 
                src="https://cdn.simpleicons.org/make/6D00CC" 
                alt="Make.com" 
                loading="lazy" 
                decoding="async"
                width="32" 
                height="32" 
                className="h-6 w-6 md:h-8 md:w-8" 
              />
              <span className="font-bold text-lg md:text-xl text-slate-600 dark:text-slate-300">Make</span>
            </div>

            <div className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
              <img 
                src="https://cdn.simpleicons.org/n8n/EA4B71" 
                alt="n8n" 
                loading="lazy"
                decoding="async" 
                width="32" 
                height="32" 
                className="h-6 w-6 md:h-8 md:w-8" 
              />
              <span className="font-bold text-lg md:text-xl text-slate-600 dark:text-slate-300">n8n</span>
            </div>

            <div className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
              <img 
                src="https://cdn.simpleicons.org/zapier/FF4A00" 
                alt="Zapier" 
                loading="lazy"
                decoding="async" 
                width="32" 
                height="32" 
                className="h-6 w-6 md:h-8 md:w-8" 
              />
              <span className="font-bold text-lg md:text-xl text-slate-600 dark:text-slate-300">Zapier</span>
            </div>

            <div className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
              <img 
                src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/FU2VBgPBn6ku5tMJ9OvO/media/bdf72ac0-9c09-48a0-8be5-0e436675aec6.png" 
                alt="GoHighLevel" 
                loading="lazy"
                decoding="async" 
                width="32" 
                height="32" 
                className="h-6 w-6 md:h-8 md:w-8 object-contain" 
              />
              <span className="font-bold text-lg md:text-xl text-slate-600 dark:text-slate-300">GoHighLevel</span>
            </div>

            <div className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" 
                alt="OpenAI" 
                loading="lazy"
                decoding="async" 
                width="32" 
                height="32" 
                className="h-6 w-6 md:h-8 md:w-8 dark:invert" 
              />
              <span className="font-bold text-lg md:text-xl text-slate-600 dark:text-slate-300">OpenAI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
