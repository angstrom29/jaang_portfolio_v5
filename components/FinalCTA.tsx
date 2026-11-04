
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useContact } from '../context/ContactContext';

const FinalCTA: React.FC = () => {
  const { openContact } = useContact();

  return (
    <section className="py-24 bg-orange-500 dark:bg-orange-600 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-700/20 rounded-full -translate-x-1/3 translate-y-1/3 blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
          
          <div className="text-center md:text-left md:w-1/2 text-white order-2 md:order-1">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
              Let's Build Something <br/>
              <span className="text-orange-100">Extraordinary.</span>
            </h2>
            <p className="text-orange-50 text-lg md:text-xl mb-10 leading-relaxed font-medium max-w-lg mx-auto md:mx-0">
              The gap between your current workload and your dream operation is automation. I'm here to bridge it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                onClick={() => openContact()}
                className="inline-flex items-center justify-center space-x-2 bg-white text-orange-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-orange-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 animate-glow-white"
                >
                <span>Start Your Automation Journey</span>
                <ArrowRight className="w-5 h-5" />
                </button>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center md:justify-end order-1 md:order-2">
            <div className="relative group">
                {/* Image Glow */}
                <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl transform scale-110 group-hover:scale-125 transition-transform duration-700"></div>
                
                {/* Image Container */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-2 bg-white/10 backdrop-blur-sm border border-white/20">
                    <img 
                        src="https://i.imgur.com/cADwDgM.png" 
                        alt="John Andrew Ang" 
                        className="w-full h-full rounded-full object-cover border-4 border-white/50 shadow-2xl"
                    />
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
