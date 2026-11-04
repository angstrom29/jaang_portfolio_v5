
import React from 'react';
import { MapPin, Award, ArrowRight, ExternalLink } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import { useContact } from '../context/ContactContext';

const About: React.FC = () => {
  const { openContact } = useContact();
  const credlyLink = 'https://www.credly.com/users/automatewithjohn';

  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-block px-3 py-1 bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400 text-xs font-bold tracking-widest uppercase rounded mb-4">
              The Architect
            </div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-6 leading-tight">
              I’m John Andrew Ang. <br />
              I build high-performance systems.
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
              <p>
                Based in <span className="text-slate-900 dark:text-slate-200 font-semibold inline-flex items-center"><MapPin size={16} className="mr-1 text-red-500" /> Metro Manila, Philippines</span>, 
                I specialize in bridging the gap between technical engineering and business outcomes.
              </p>
              <p>
                Most experts over-complicate things. I believe in the <strong>MVP approach</strong>: building simple, robust systems that are easy to understand and don't break when I leave.
              </p>
              <p>
                Whether you're a founder scaling a sales agency or an operator managing a complex back-office, I build the "digital plumbing" that makes your growth sustainable and stress-free.
              </p>
            </div>

            <div className="mb-8">
              <button
                onClick={() => openContact()}
                className="inline-flex items-center justify-center space-x-2 bg-orange-500 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 animate-glow"
              >
                <span>Work With Me</span>
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="flex flex-wrap gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 hover:border-orange-500 hover:text-orange-500 dark:hover:text-orange-400 hover:shadow-sm transition-all"
                  title={link.name}
                >
                  {link.name === 'Upwork' ? (
                    <img src="https://cdn.simpleicons.org/upwork/6FDA44" alt="Upwork" loading="lazy" decoding="async" width="20" height="20" className="w-5 h-5" />
                  ) : link.name === 'OnlineJobs.ph' ? (
                    <img src="https://v2.onlinejobs.ph/_next/image?url=https%3A%2F%2Fwww.onlinejobs.ph%2Fassets%2Fimages%2Foj-logo-no-text.png&w=64&q=75" alt="OnlineJobs.ph" loading="lazy" decoding="async" width="20" height="20" className="w-5 h-5" />
                  ) : (
                    <link.icon size={20} />
                  )}
                  <span className="hidden sm:inline">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <a 
              href={credlyLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative group max-w-sm mx-auto block cursor-pointer"
              aria-label="View Credly Profile"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-slate-800 p-2 transition-transform duration-300 group-hover:-translate-y-1">
                <img 
                  src="https://i.imgur.com/rQe36LP.png" 
                  alt="John Andrew Ang - AI Automation Engineer" 
                  loading="lazy"
                  decoding="async"
                  width="384"
                  height="384"
                  className="w-full h-auto rounded-xl"
                />
                
                {/* Overlay hint on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl z-0"></div>

                <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur shadow-lg p-4 rounded-xl border border-white/20 dark:border-slate-700/50 group-hover:scale-105 transition-transform origin-bottom-left z-10">
                  <div className="flex items-center space-x-4">
                    <div className="bg-orange-500 p-2 rounded-lg text-white">
                      <Award size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-0.5">Certifications</p>
                      <div className="flex items-center gap-1">
                        <p className="text-slate-900 dark:text-slate-100 font-bold">Credly Verified Expert</p>
                        <ExternalLink size={14} className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
