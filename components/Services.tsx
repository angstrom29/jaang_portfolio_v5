
import React, { useState, useRef, useEffect } from 'react';
import { REVENUE_SERVICES, INTERNAL_OPS_SERVICES } from '../constants';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useContact } from '../context/ContactContext';
import { ServiceItem } from '../types';

const ServiceCard: React.FC<{ item: ServiceItem }> = ({ item }) => {
  const Icon = item.icon;
  return (
    <div className="h-full bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:shadow-orange-900/30 transition-all group flex flex-col">
      <div className="w-14 h-14 bg-orange-50 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon size={28} className="text-orange-500" />
      </div>
      <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">{item.title}</h4>
      <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-grow">
        {item.description}
      </p>
      <ul className="space-y-3 mt-auto">
        {item.benefits.map((benefit, idx) => (
          <li key={idx} className="flex items-start text-sm text-slate-700 dark:text-slate-300">
            <CheckCircle2 size={16} className="text-orange-500 mr-2 mt-0.5 shrink-0" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const MobileServiceCarousel: React.FC<{ items: ServiceItem[] }> = ({ items }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
        // Too far left (entering set 1), jump forward to set 2
        container.scrollLeft += oneSetWidth;
    } else if (scrollLeft > (oneSetWidth * 2) + buffer) {
        // Too far right (entering set 3), jump backward to set 2
        container.scrollLeft -= oneSetWidth;
    }

    // Update Pagination Dots
    // Calculate index based on scroll position relative to the middle set
    const relativeScroll = (container.scrollLeft % oneSetWidth);
    const progress = relativeScroll / oneSetWidth;
    
    // Calculate index (0 to items.length - 1)
    let index = Math.round(progress * items.length);
    // Handle wrap-around case where rounding might hit items.length
    index = index % items.length;
    
    setActiveIndex(index);
  };

  return (
    <div className="md:hidden">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto gap-4 pb-8 -mx-6 px-6 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {loopedItems.map((item, idx) => (
          <div 
            key={`${item.title}-${idx}`} 
            className="flex-none w-[85vw] snap-center h-auto"
          >
             <ServiceCard item={item} />
          </div>
        ))}
      </div>
      
      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2 mt-2">
        {items.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === idx 
                ? 'w-6 bg-orange-500' 
                : 'w-1.5 bg-slate-300 dark:bg-slate-700'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const { openContact } = useContact();

  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-slate-50 mb-6 tracking-tight">Focus on Simplicity & Reliability</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            I don't build complex "spaghetti" code. I deliver <strong>Minimum Viable Products (MVP)</strong> for your automation—systems that are <strong>simple, reliable</strong>, and easy to maintain.
          </p>
        </div>

        {/* Revenue Category */}
        <div className="mb-20">
          <div className="flex items-center space-x-4 mb-10">
            <div className="h-px flex-grow bg-slate-200 dark:bg-slate-700"></div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center uppercase tracking-widest text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Revenue & Lead Gen
            </h3>
            <div className="h-px flex-grow bg-slate-200 dark:bg-slate-700"></div>
          </div>
          
          {/* Desktop View: Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {REVENUE_SERVICES.map((item, idx) => (
              <ServiceCard key={idx} item={item} />
            ))}
          </div>

          {/* Mobile View: Carousel */}
          <MobileServiceCarousel items={REVENUE_SERVICES} />
        </div>

        {/* Operations Category */}
        <div className="mb-16">
          <div className="flex items-center space-x-4 mb-10">
            <div className="h-px flex-grow bg-slate-200 dark:bg-slate-700"></div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center uppercase tracking-widest text-sm">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
              Internal Ops & Back-Office
            </h3>
            <div className="h-px flex-grow bg-slate-200 dark:bg-slate-700"></div>
          </div>
          
          {/* Desktop View: Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {INTERNAL_OPS_SERVICES.map((item, idx) => (
              <ServiceCard key={idx} item={item} />
            ))}
          </div>

          {/* Mobile View: Carousel */}
          <MobileServiceCarousel items={INTERNAL_OPS_SERVICES} />
        </div>

        <div className="text-center mt-12">
           <button
            onClick={() => openContact()}
            className="inline-flex items-center space-x-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all transform hover:-translate-y-1 shadow-xl animate-glow"
          >
            <span>Get A Custom Solution</span>
            <ArrowRight size={20} />
          </button>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-500">
            Tailored solutions for your specific bottlenecks.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
