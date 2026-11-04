
import React from 'react';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 py-12 border-t border-slate-100 dark:border-slate-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              John Andrew Ang
            </span>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-xs">
              Designing and implementing high-performance AI automation systems.
            </p>
          </div>

          <div className="flex space-x-6 mb-6 md:mb-0 items-center">
            {SOCIAL_LINKS.map((link) => (
              <a 
                key={link.name}
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 dark:text-slate-500 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                title={link.name}
              >
                {link.name === 'Upwork' ? (
                   <img 
                     src="https://cdn.simpleicons.org/upwork/6FDA44" 
                     alt="Upwork" 
                     className="w-5 h-5 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                   />
                ) : link.name === 'OnlineJobs.ph' ? (
                   <img 
                     src="https://v2.onlinejobs.ph/_next/image?url=https%3A%2F%2Fwww.onlinejobs.ph%2Fassets%2Fimages%2Foj-logo-no-text.png&w=64&q=75" 
                     alt="OnlineJobs.ph" 
                     className="w-5 h-5 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300" 
                   />
                ) : (
                   <link.icon size={20} />
                )}
              </a>
            ))}
          </div>

          <div className="text-slate-400 dark:text-slate-500 text-sm">
            © {new Date().getFullYear()} John Andrew Ang. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
