
import React, { useState, useRef, useEffect } from 'react';
import { Check, Clock, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContact } from '../context/ContactContext';

interface PricingTier {
  title: string;
  description: string;
  price: React.ReactNode;
  subPrice: string;
  features: string[];
  buttonText: string;
  isHourly: boolean;
  icon: React.ElementType;
  badge?: string;
}

const PRICING_OPTIONS: PricingTier[] = [
  {
    title: "Hourly Rate",
    description: "Pay-as-you-go for continuous improvements and ad-hoc tasks.",
    price: (
      <div className="flex items-baseline">
        <span className="text-5xl font-extrabold text-slate-900 dark:text-slate-50">$20</span>
        <span className="text-xl text-slate-500 font-medium ml-2">/ hour</span>
      </div>
    ),
    subPrice: "Starting rate",
    features: [
      "Workflow Design & Implementation",
      "Bug Fixes & Maintenance",
      "Consultation & Strategy",
      "No Long-term Contract",
      "Weekly Progress Reports"
    ],
    buttonText: "Start Hourly Engagement",
    isHourly: true,
    icon: Clock,
    badge: "Most Flexible"
  },
  {
    title: "Project-Based",
    description: "Fixed scope and timeline for larger implementations.",
    price: (
      <div className="flex items-baseline">
        <span className="text-4xl font-extrabold text-slate-900 dark:text-slate-50">Custom Pricing</span>
      </div>
    ),
    subPrice: "Tailored to project complexity",
    features: [
      "End-to-End System Build",
      "Requirement Gathering",
      "Post-Launch Support Period",
      "Documentation & Training",
      "Milestone-based Payment"
    ],
    buttonText: "Request Custom Proposal",
    isHourly: false,
    icon: Zap
  }
];

const PricingCard: React.FC<{ tier: PricingTier }> = ({ tier }) => {
    const { openContact } = useContact();
    const Icon = tier.icon;

    return (
        <div className={`relative bg-white dark:bg-slate-800 rounded-3xl p-8 flex flex-col h-full ${tier.isHourly ? 'border-2 border-orange-500 shadow-xl' : 'border border-slate-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-700 transition-colors'}`}>
             {tier.badge && (
                 <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-bl-xl rounded-tr-xl uppercase tracking-wider">
                   {tier.badge}
                 </div>
             )}
             <div className="mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${tier.isHourly ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
                    <Icon size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{tier.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2">{tier.description}</p>
             </div>
             
             <div className="mb-8">
                {tier.price}
                <p className="text-sm text-slate-400 mt-2">{tier.subPrice}</p>
             </div>

             <div className="flex-grow">
                 <p className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wide mb-4">What's Included</p>
                 <ul className="space-y-4 mb-8">
                    {tier.features.map((item, i) => (
                      <li key={i} className="flex items-start space-x-3 text-slate-700 dark:text-slate-300">
                        <Check size={20} className={`${tier.isHourly ? 'text-orange-500 dark:text-orange-400' : 'text-slate-400'} flex-shrink-0 mt-0.5`} />
                        <span>{item}</span>
                      </li>
                    ))}
                 </ul>
             </div>

             <button 
               onClick={() => openContact()}
               className={`block w-full py-4 font-bold rounded-xl text-center transition-all ${tier.isHourly ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-orange-500/25 animate-glow' : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white'}`}
             >
               {tier.buttonText}
             </button>
          </div>
    );
};

const MobilePricingCarousel: React.FC<{ options: PricingTier[] }> = ({ options }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const loopedOptions = [...options, ...options, ...options];

  useEffect(() => {
    // Fix: Use setTimeout to allow layout to paint before scrolling
    const timer = setTimeout(() => {
        if (scrollRef.current) {
          const scrollWidth = scrollRef.current.scrollWidth;
          const oneSetWidth = scrollWidth / 3;
          scrollRef.current.scrollLeft = oneSetWidth;
        }
    }, 50);
    return () => clearTimeout(timer);
  }, [options]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const { scrollLeft, scrollWidth } = container;
    const oneSetWidth = scrollWidth / 3;
    
    const buffer = 50;

    if (scrollLeft < oneSetWidth - buffer) {
        container.scrollLeft += oneSetWidth;
    } else if (scrollLeft > (oneSetWidth * 2) + buffer) {
        container.scrollLeft -= oneSetWidth;
    }

    const relativeScroll = (container.scrollLeft % oneSetWidth);
    const progress = relativeScroll / oneSetWidth;
    
    let index = Math.round(progress * options.length);
    index = index % options.length;
    
    setActiveIndex(index);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
        const container = scrollRef.current;
        const firstCard = container.children[0] as HTMLElement;
        if (firstCard) {
            const cardWidth = firstCard.offsetWidth;
            const gap = 16;
            const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap);
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
  };

  return (
    <div className="md:hidden relative group">
       <button 
         onClick={() => scroll('left')}
         className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-lg"
         aria-label="Scroll left"
       >
         <ChevronLeft size={20} />
       </button>

      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto gap-4 pb-8 -mx-6 px-6 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {loopedOptions.map((tier, idx) => (
            <div 
              key={`${tier.title}-${idx}`} 
              className="flex-none w-[85vw] snap-center h-auto"
            >
              <PricingCard tier={tier} />
            </div>
        ))}
      </div>
      
       <button 
         onClick={() => scroll('right')}
         className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-lg"
         aria-label="Scroll right"
       >
         <ChevronRight size={20} />
       </button>

      <div className="flex justify-center items-center gap-2 mt-2">
        {options.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === idx 
                ? 'w-6 bg-orange-500' 
                : 'w-1.5 bg-slate-300 dark:bg-slate-700'
            }`}
            aria-label={`Go to option ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">Flexible, Result-Driven Pricing</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
             High-performance automation engineering that scales with your needs.
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
           {PRICING_OPTIONS.map((tier, idx) => (
               <PricingCard key={idx} tier={tier} />
           ))}
        </div>

        {/* Mobile View */}
        <MobilePricingCarousel options={PRICING_OPTIONS} />

      </div>
    </section>
  );
};

export default Pricing;
