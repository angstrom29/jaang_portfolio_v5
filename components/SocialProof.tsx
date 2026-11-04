
import React, { useState, useRef, useEffect } from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote, Star, ArrowRight } from 'lucide-react';
import { useContact } from '../context/ContactContext';
import { Testimonial } from '../types';

const MobileSocialProofCarousel: React.FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Triple the items to create the loop illusion
  const loopedTestimonials = [...testimonials, ...testimonials, ...testimonials];

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
  }, [testimonials]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const { scrollLeft, scrollWidth } = container;
    const oneSetWidth = scrollWidth / 3;
    
    // Infinite Loop Logic: Keep scroll within the middle set range
    const buffer = 50;

    if (scrollLeft < oneSetWidth - buffer) {
        // Too far left (entering set 1), jump forward to set 2
        container.scrollLeft += oneSetWidth;
    } else if (scrollLeft > (oneSetWidth * 2) + buffer) {
        // Too far right (entering set 3), jump backward to set 2
        container.scrollLeft -= oneSetWidth;
    }

    // Update Pagination Dots
    const relativeScroll = (container.scrollLeft % oneSetWidth);
    const progress = relativeScroll / oneSetWidth;
    
    // Calculate index (0 to testimonials.length - 1)
    let index = Math.round(progress * testimonials.length);
    // Handle wrap-around case
    index = index % testimonials.length;
    
    setActiveIndex(index);
  };

  return (
    <div className="md:hidden mb-16">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto gap-4 pb-8 -mx-6 px-6 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {loopedTestimonials.map((t, idx) => (
            <div 
              key={`${t.name}-${idx}`} 
              className="flex-none w-[85vw] snap-center h-auto"
            >
              <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl relative h-full flex flex-col justify-between border border-slate-100 dark:border-slate-700 shadow-sm">
                <Quote className="absolute top-6 right-8 text-slate-200 dark:text-slate-700 w-12 h-12" />
                <p className="text-slate-700 dark:text-slate-300 text-lg italic leading-relaxed mb-8 relative z-10">
                    "{t.content}"
                </p>
                <div className="flex items-center justify-between">
                    <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100">{t.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t.role}</p>
                    </div>
                </div>
             </div>
            </div>
        ))}
      </div>
      
      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2 mt-2">
        {testimonials.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === idx 
                ? 'w-6 bg-orange-500' 
                : 'w-1.5 bg-slate-300 dark:bg-slate-700'
            }`}
            aria-label={`Go to feedback ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const SocialProof: React.FC = () => {
  const { openContact } = useContact();

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">Client Feedback</h2>
          <div className="flex items-center justify-center space-x-1 text-yellow-500 mb-2">
            {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
          </div>
          <p className="text-slate-500 dark:text-slate-400">Consistently rated 5 stars for execution and strategy</p>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl relative flex flex-col justify-between h-full">
              <div>
                <Quote className="absolute top-6 right-8 text-slate-200 dark:text-slate-700 w-12 h-12" />
                <p className="text-slate-700 dark:text-slate-300 text-lg italic leading-relaxed mb-8 relative z-10">
                    "{t.content}"
                </p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100">{t.name}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel View */}
        <MobileSocialProofCarousel testimonials={TESTIMONIALS} />

        <div className="text-center mb-16">
          <button
            onClick={() => openContact()}
            className="inline-flex items-center space-x-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-xl animate-glow"
          >
            <span>Become The Next Success Story</span>
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-12">
           <div className="flex items-center space-x-3 transition-transform duration-300 hover:scale-105">
              <img src="https://cdn.simpleicons.org/make/6D00CC" className="w-8 h-8 md:w-10 md:h-10" alt="Make Advanced" />
              <span className="font-bold text-slate-800 dark:text-slate-200 text-lg">Make Advanced</span>
           </div>
           <div className="flex items-center space-x-3 transition-transform duration-300 hover:scale-105">
              <img src="https://cdn.simpleicons.org/n8n/EA4B71" className="w-8 h-8 md:w-10 md:h-10" alt="n8n Specialist" />
              <span className="font-bold text-slate-800 dark:text-slate-200 text-lg">n8n Specialist</span>
           </div>
           <div className="flex items-center space-x-3 transition-transform duration-300 hover:scale-105">
              <img src="https://cdn.simpleicons.org/zapier/FF4A00" className="w-8 h-8 md:w-10 md:h-10" alt="Zapier Expert" />
              <span className="font-bold text-slate-800 dark:text-slate-200 text-lg">Zapier Expert</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
