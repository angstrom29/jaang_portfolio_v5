
import React, { useState, useRef, useEffect } from 'react';
import { CASE_STUDIES } from '../constants';
import { TrendingUp, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContact } from '../context/ContactContext';
import { CaseStudy } from '../types';
import CaseStudyModal from './CaseStudyModal';

interface CarouselProps {
  items: CaseStudy[];
  onSelect: (study: CaseStudy) => void;
}

const CaseStudyCarousel: React.FC<CarouselProps> = ({ items, onSelect }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  // Triple the items to create the loop illusion
  const loopedStudies = [...items, ...items, ...items];

  useEffect(() => {
    // Initial scroll to the middle set
    if (scrollContainerRef.current) {
       setTimeout(() => {
           if (scrollContainerRef.current) {
             const scrollWidth = scrollContainerRef.current.scrollWidth;
             const oneSetWidth = scrollWidth / 3;
             scrollContainerRef.current.scrollLeft = oneSetWidth;
             setActiveIndex(0);
           }
       }, 50);
    }
  }, [items.length]);

  const handleScroll = () => {
    if (!scrollContainerRef.current || items.length === 0) return;
    
    const container = scrollContainerRef.current;
    const { scrollLeft, scrollWidth } = container;
    const oneSetWidth = scrollWidth / 3;
    
    // Infinite Loop Logic
    const buffer = 50;

    if (scrollLeft < oneSetWidth - buffer) {
        const offset = oneSetWidth;
        container.scrollLeft += offset;
        if (isDragging) setStartScrollLeft(prev => prev + offset);
    } else if (scrollLeft > (oneSetWidth * 2) + buffer) {
        const offset = oneSetWidth;
        container.scrollLeft -= offset;
        if (isDragging) setStartScrollLeft(prev => prev - offset);
    }

    // Update Pagination Dots
    if (container.children.length > 0) {
        const firstCard = container.children[0] as HTMLElement;
        const cardWidth = firstCard.offsetWidth;
        const gap = 24; // gap-6 is 1.5rem = 24px
        const itemFullWidth = cardWidth + gap;
        
        let relativeScroll = (scrollLeft - oneSetWidth) + (itemFullWidth / 2);
        
        // Normalize if slightly negative due to bounce
        if (relativeScroll < 0) relativeScroll += oneSetWidth;

        const index = Math.floor(relativeScroll / itemFullWidth);
        
        // Ensure index is within bounds 0 to length-1
        let normalizedIndex = index % items.length;
        if (normalizedIndex < 0) normalizedIndex += items.length;
        
        setActiveIndex(normalizedIndex);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.children[0] as HTMLElement;
      if (!firstCard) return;
      const cardWidth = firstCard.offsetWidth;
      const gap = 24;
      const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap);
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollToItem = (index: number) => {
    if (scrollContainerRef.current && items.length > 0) {
        const container = scrollContainerRef.current;
        const scrollWidth = container.scrollWidth;
        const oneSetWidth = scrollWidth / 3;
        const firstCard = container.children[0] as HTMLElement;
        const cardWidth = firstCard.offsetWidth;
        const gap = 24;
        
        const targetScroll = oneSetWidth + (index * (cardWidth + gap));
        container.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (scrollContainerRef.current) {
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setStartScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  const onMouseUp = () => setIsDragging(false);
  const onMouseLeave = () => setIsDragging(false);
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = startScrollLeft - walk;
  };

  if (items.length === 0) return null;

  return (
    <div className="relative group mb-12">
        <button 
        onClick={() => scroll('left')}
        className="absolute left-1 md:-left-6 lg:-left-12 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-slate-800/40 md:bg-slate-800/90 backdrop-blur-sm md:backdrop-blur-md border border-slate-700/30 md:border-slate-700 hover:bg-slate-700/80 hover:border-orange-500 text-slate-200 md:text-slate-400 hover:text-white transition-all shadow-lg md:shadow-xl"
        aria-label="Scroll left"
        >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            className={`flex overflow-x-auto gap-6 pb-8 -mx-6 px-6 scrollbar-none select-none ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'}`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
        {loopedStudies.map((study, idx) => (
            <div 
                key={`${study.title}-${idx}`} 
                className="flex-none w-[85vw] md:w-[360px] snap-center"
            >
                <div className="group relative bg-slate-800/50 backdrop-blur border border-slate-700 p-8 rounded-3xl hover:bg-slate-800 hover:border-orange-500/30 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
                
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-10 transition duration-500 blur"></div>
                
                <div className="relative flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            {study.isNew && (
                                <span className="px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.4)] animate-pulse">
                                    New
                                </span>
                            )}
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                                study.tag === 'Revenue' 
                                ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                                : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                            }`}>
                                {study.tag}
                            </span>
                        </div>
                    {study.tag === 'Revenue' ? <TrendingUp size={18} className="text-green-400" /> : <Clock size={18} className="text-orange-400" />}
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">{study.title}</h3>
                    
                    <p className="text-slate-400 text-base leading-relaxed mb-6 line-clamp-4">
                    {study.summary}
                    </p>

                    <div className="mt-0 pt-0">
                        <button 
                            onClick={() => onSelect(study)}
                            className="inline-flex items-center space-x-2 text-sm text-orange-400 font-bold hover:text-orange-300 transition-colors group-hover:translate-x-1 duration-300"
                        >
                            <span>Learn more</span>
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
                </div>
            </div>
        ))}
        </div>

        <button 
        onClick={() => scroll('right')}
        className="absolute right-1 md:-right-6 lg:-right-12 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-slate-800/40 md:bg-slate-800/90 backdrop-blur-sm md:backdrop-blur-md border border-slate-700/30 md:border-slate-700 hover:bg-slate-700/80 hover:border-orange-500 text-slate-200 md:text-slate-400 hover:text-white transition-all shadow-lg md:shadow-xl"
        aria-label="Scroll right"
        >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Pagination Dots */}
        {items.length > 0 && (
            <div className="flex justify-center items-center gap-1.5 mt-0">
                {items.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => scrollToItem(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            activeIndex === idx 
                            ? 'w-6 bg-orange-500' 
                            : 'w-1.5 bg-slate-700 hover:bg-slate-600'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        )}
    </div>
  );
};

const CaseStudies: React.FC = () => {
  const { openContact } = useContact();
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  const automationStudies = CASE_STUDIES.filter(study => study.category === 'AI Automation Workflows');
  const funnelStudies = CASE_STUDIES.filter(study => study.category === 'Funnel System');

  return (
    <section id="results" className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/3"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Real Problems. <br/>
              <span className="text-orange-500">Real Systems.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-6 md:mb-0">
              I don't just talk theory. Here are concrete examples of how I've engineered efficiency and revenue growth.
            </p>
          </div>
        </div>

        {/* AI Automation Workflows Section */}
        <div className="flex items-center w-full mb-6 mt-12">
            <div className="hidden md:block h-px flex-grow bg-slate-800"></div>
            <div className="flex items-center px-4">
                 <span className="w-2.5 h-2.5 rounded-full mr-3 bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.6)]"></span>
                 <h3 className="uppercase tracking-widest text-xs md:text-sm font-bold text-white">AI Automation Workflows</h3>
            </div>
            <div className="hidden md:block h-px flex-grow bg-slate-800"></div>
        </div>

        <CaseStudyCarousel items={automationStudies} onSelect={setSelectedStudy} />

        {/* Funnel System Section */}
        <div className="flex items-center w-full mb-6 mt-12">
            <div className="hidden md:block h-px flex-grow bg-slate-800"></div>
             <div className="flex items-center px-4">
                 <span className="w-2.5 h-2.5 rounded-full mr-3 bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.6)]"></span>
                 <h3 className="uppercase tracking-widest text-xs md:text-sm font-bold text-white">Funnel System</h3>
            </div>
            <div className="hidden md:block h-px flex-grow bg-slate-800"></div>
        </div>

        <CaseStudyCarousel items={funnelStudies} onSelect={setSelectedStudy} />

        <div className="text-center mt-12">
            <button
            onClick={() => openContact()}
            className="inline-flex items-center space-x-2 bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-200 transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-2xl animate-glow-white"
            >
            <span>Get Results Like These</span>
            <ArrowRight size={20} />
            </button>
            <p className="mt-6 text-slate-500 text-sm">
                Every business is unique. Let's find your specific bottlenecks.
            </p>
        </div>
      </div>

      <CaseStudyModal 
        isOpen={!!selectedStudy} 
        onClose={() => setSelectedStudy(null)} 
        caseStudy={selectedStudy} 
      />
    </section>
  );
};

export default CaseStudies;
