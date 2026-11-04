
import React, { useState, useRef, useEffect } from 'react';
import { Search, Cog, Rocket, ArrowRight } from 'lucide-react';
import { useContact } from '../context/ContactContext';

const steps = [
  {
    number: '01',
    title: 'Audit & Blueprint',
    description: 'We start with a deep dive into your current manual workflows. I identify bottlenecks and deliver a visual architecture of your new automated system.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Build & Integration',
    description: 'I engineer the solution using tools like n8n, Make.com, or GoHighLevel. Every workflow is rigorously tested with error handlers to ensure 99.9% uptime.',
    icon: Cog,
  },
  {
    number: '03',
    title: 'Launch & Handoff',
    description: 'We flip the switch. You receive full documentation and video SOPs. I stay on board for a support period to tweak and optimize performance.',
    icon: Rocket,
  }
];

const MobileProcessCarousel: React.FC<{ steps: typeof steps }> = ({ steps }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Triple the items to create the loop illusion
  const loopedSteps = [...steps, ...steps, ...steps];

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
  }, [steps]);

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
    
    // Calculate index (0 to steps.length - 1)
    let index = Math.round(progress * steps.length);
    // Handle wrap-around case
    index = index % steps.length;
    
    setActiveIndex(index);
  };

  return (
    <div className="md:hidden mb-12">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto gap-4 pb-8 -mx-6 px-6 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {loopedSteps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div 
              key={`${step.number}-${idx}`} 
              className="flex-none w-[85vw] snap-center h-auto flex"
            >
               <div className="relative flex flex-col items-center text-center group w-full bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                  <div className="w-20 h-20 bg-slate-50 dark:bg-slate-700 rounded-full border-4 border-slate-100 dark:border-slate-600 flex items-center justify-center mb-6 shadow-sm z-10">
                    <Icon className="w-8 h-8 text-orange-500 dark:text-orange-400" />
                  </div>
                  
                  <div className="absolute top-6 right-6 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold border-2 border-white dark:border-slate-800 shadow-lg z-20">
                    {step.number}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                    {step.description}
                  </p>
                </div>
            </div>
          );
        })}
      </div>
      
      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2 mt-2">
        {steps.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === idx 
                ? 'w-6 bg-orange-500' 
                : 'w-1.5 bg-slate-300 dark:bg-slate-700'
            }`}
            aria-label={`Go to step ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Process: React.FC = () => {
  const { openContact } = useContact();

  return (
    <section id="process" className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-slate-50 mb-4">From Chaos to Autopilot</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            A transparent, three-step framework to get your systems running without you.
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-3 gap-12 relative max-w-6xl mx-auto mb-16">
           {/* Connector Line (Desktop only) */}
           <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 dark:bg-slate-700 -z-10"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full border-4 border-slate-100 dark:border-slate-700 flex items-center justify-center mb-8 shadow-sm group-hover:border-orange-500 transition-colors z-10 duration-300">
                  <Icon className="w-8 h-8 text-orange-500 dark:text-orange-400" />
                </div>
                
                <div className="absolute top-0 right-1/2 translate-x-10 -translate-y-2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold border-2 border-white dark:border-slate-900 shadow-lg z-20">
                  {step.number}
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base px-4">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile View */}
        <MobileProcessCarousel steps={steps} />

        <div className="text-center">
            <button
            onClick={() => openContact()}
            className="inline-flex items-center space-x-2 bg-orange-500 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/25 animate-glow"
            >
            <span>Start Your Transformation</span>
            <ArrowRight size={20} />
            </button>
        </div>
      </div>
    </section>
  );
};

export default Process;
