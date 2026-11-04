
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useContact } from '../context/ContactContext';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openContact } = useContact();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Results', href: '#results' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openContact();
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3 dark:bg-slate-900/80 dark:border-b dark:border-slate-800' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="/" className="flex items-center gap-3 group">
          <img 
            src="https://i.imgur.com/zCrUjG4.png" 
            alt="John Andrew Ang Logo" 
            width="48"
            height="48"
            loading="eager"
            decoding="sync"
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl object-contain shadow-sm group-hover:shadow-md transition-all duration-300" 
          />
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-none group-hover:text-orange-500 transition-colors">
              John Andrew Ang
            </span>
            <span className="text-[10px] md:text-xs font-bold text-orange-500 dark:text-orange-400 tracking-widest uppercase mt-1">
              Automation | AI Workflows | AI Agents
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-orange-500 dark:text-slate-400 dark:hover:text-orange-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2.5 rounded-full text-slate-600 hover:text-orange-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-orange-400 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button
            onClick={() => openContact()}
            className="bg-orange-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-600 transition-all shadow-md hover:shadow-lg animate-glow"
          >
            Let's Talk
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-slate-900 dark:text-slate-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700 py-6 px-6 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400"
            >
              {link.name}
            </a>
          ))}
           <button
            onClick={() => { toggleTheme(); setIsOpen(false); }}
            aria-label="Toggle theme"
            className="w-full flex justify-center items-center space-x-2 p-3 rounded-xl text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 font-medium"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            <span>Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode</span>
          </button>
          <button
            onClick={handleContactClick}
            className="block w-full text-center bg-orange-500 text-white px-5 py-3 rounded-xl font-semibold hover:bg-orange-600 animate-glow"
          >
            Let's Talk
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
