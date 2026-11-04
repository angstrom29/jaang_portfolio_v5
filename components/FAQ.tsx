
import React, { useState, useRef, useEffect } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { FAQS } from '../constants';
import { useContact } from '../context/ContactContext';
import { FAQItem } from '../types';

const FAQCard: React.FC<{ faq: FAQItem; isOpen: boolean; toggle: () => void }> = ({ faq, isOpen, toggle }) => {
  return (
    <div 
      className={`border rounded-2xl transition-all duration-300 h-full flex flex-col ${
        isOpen 
          ? 'bg-slate-50 border-orange-200 dark:bg-slate-900 dark:border-orange-900/50 shadow-sm' 
          : 'bg-white border-slate-200 dark:bg-slate-950 dark:border-slate-800'
      }`}
    >
      <button
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
        onClick={toggle}
        aria-expanded={isOpen}
      >
        <span className={`text-lg font-bold pr-8 leading-snug ${isOpen ? 'text-orange-600 dark:text-orange-400' : 'text-slate-900 dark:text-slate-100'}`}>
          {faq.question}
        </span>
        <span className={`flex-shrink-0 p-2 rounded-full transition-colors ${isOpen ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 pt-0 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-dashed border-slate-200 dark:border-slate-800 mx-6 mt-2">
          <div className="pt-4">
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileFAQCarousel: React.FC<{ items: FAQItem[] }> = ({ items }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Triple the items to create the loop illusion
  const loopedItems = [...items, ...items, ...items];

  useEffect(() => {
    // Initial scroll to the middle set
    // Fix: Use setTimeout to allow layout to paint before scrolling
    const timer = setTimeout(() => {
        if (scrollRef.current) {
          const scrollWidth = scrollRef.current.scrollWidth;
          const oneSetWidth = scrollWidth / 3;
          scrollRef.current.scrollLeft = oneSetWidth;
        }
    }, 50);
    return () => clearTimeout(timer);
  }, [items]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const { scrollLeft, scrollWidth } = container;
    const oneSetWidth = scrollWidth / 3;
    
    // Infinite Loop Logic: Keep scroll within the middle set range
    const buffer = 50;

    if (scrollLeft < oneSetWidth - buffer) {
        container.scrollLeft += oneSetWidth;
    } else if (scrollLeft > (oneSetWidth * 2) + buffer) {
        container.scrollLeft -= oneSetWidth;
    }

    // Update Pagination Dots
    const relativeScroll = (container.scrollLeft % oneSetWidth);
    const progress = relativeScroll / oneSetWidth;
    
    // Calculate index (0 to items.length - 1)
    let index = Math.round(progress * items.length);
    // Handle wrap-around case
    index = index % items.length;
    
    setActiveIndex(index);
  };

  return (
    <div className="md:hidden relative group mb-12">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto gap-4 pb-8 -mx-6 px-6 scrollbar-none snap-x snap-mandatory items-start"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {loopedItems.map((item, idx) => (
            <div 
              key={`${item.question}-${idx}`} 
              className="flex-none w-[85vw] snap-center h-auto"
            >
              <FAQCard 
                faq={item} 
                isOpen={openIndex === idx} 
                toggle={() => setOpenIndex(openIndex === idx ? null : idx)} 
              />
            </div>
        ))}
      </div>
      
      <div className="flex justify-center items-center gap-2 mt-2">
        {items.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === idx 
                ? 'w-6 bg-orange-500' 
                : 'w-1.5 bg-slate-300 dark:bg-slate-700'
            }`}
            aria-label={`Go to question ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openContact } = useContact();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Common questions about working with an Automation Engineer.
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block max-w-3xl mx-auto space-y-4 mb-16">
          {FAQS.map((faq, index) => (
            <FAQCard 
                key={index} 
                faq={faq} 
                isOpen={openIndex === index} 
                toggle={() => toggleFAQ(index)} 
            />
          ))}
        </div>

        {/* Mobile View */}
        <MobileFAQCarousel items={FAQS} />

        <div className="text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-6 font-medium">
                Still have specific questions? Let's chat directly.
            </p>
            <button
            onClick={() => openContact()}
            className="inline-flex items-center space-x-2 bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-all shadow-md hover:shadow-orange-500/25 animate-glow"
            >
            <span>Ask Me Anything</span>
            <ArrowRight size={18} />
            </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
