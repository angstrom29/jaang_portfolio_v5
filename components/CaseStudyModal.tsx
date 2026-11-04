
import React, { useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { CaseStudy } from '../types';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: CaseStudy | null;
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ isOpen, onClose, caseStudy }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !caseStudy) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800 animate-[fade-in-up_0.3s_ease-out]">
        
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 z-10">
            <div>
               <div className="flex items-center space-x-3 mb-2">
                 <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                    caseStudy.tag === 'Revenue' 
                      ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' 
                      : 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20'
                  }`}>
                    {caseStudy.tag}
                  </span>
               </div>
               <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100">{caseStudy.title}</h3>
            </div>
            <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
                <X size={28} className="text-slate-500" />
            </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8" style={{ scrollbarWidth: 'thin' }}>
            
            {/* Video Player */}
            {caseStudy.videoUrl && (
              <div className="mb-8">
                 <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-3">Project Demo</p>
                 <div className="relative rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 aspect-video bg-black">
                    <iframe 
                      src={caseStudy.videoUrl} 
                      frameBorder="0" 
                      allowFullScreen 
                      loading="lazy"
                      className="absolute inset-0 w-full h-full"
                      title={`${caseStudy.title} demo video`}
                    ></iframe>
                 </div>
              </div>
            )}

            {/* LinkedIn Embed */}
            {caseStudy.linkedInEmbedUrl && (
              <div className="mb-8">
                 <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-3">LinkedIn Post Preview</p>
                 <div className="flex justify-center w-full">
                    <iframe 
                      src={caseStudy.linkedInEmbedUrl} 
                      height="542" 
                      width="504" 
                      frameBorder="0" 
                      allowFullScreen 
                      title={`${caseStudy.title} LinkedIn post`}
                      className="rounded-xl border border-slate-200 dark:border-slate-700 shadow-md max-w-full"
                    ></iframe>
                 </div>
              </div>
            )}

            {/* Image Gallery */}
            {caseStudy.images && caseStudy.images.length > 0 && (
              <div className="mb-8">
                 <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-3">{caseStudy.videoUrl ? 'Screenshots' : 'Project Preview'}</p>
                 <div 
                   className="flex gap-4 overflow-x-auto pb-4 scrollbar-track-transparent"
                   style={{ scrollbarWidth: 'thin' }}
                 >
                    {caseStudy.images.map((img, i) => (
                      <div key={i} className="flex-shrink-0 relative group">
                        <img 
                          src={img} 
                          alt={`${caseStudy.title} screenshot ${i + 1}`} 
                          loading="lazy"
                          className="h-64 md:h-80 w-auto rounded-xl border border-slate-200 dark:border-slate-700 object-cover shadow-md"
                        />
                      </div>
                    ))}
                 </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
                {/* Problem & Solution */}
                <div className="space-y-8">
                    <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30">
                        <div className="flex items-center space-x-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <h4 className="text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">The Bottleneck</h4>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                           {caseStudy.problem}
                        </p>
                    </div>

                    <div>
                        <div className="flex items-center space-x-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <h4 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">The System</h4>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {caseStudy.solution}
                        </p>
                    </div>
                </div>

                {/* Outcome */}
                <div>
                     <div className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-2xl border border-orange-100 dark:border-orange-500/20 h-full">
                        <div className="flex items-center space-x-2 mb-4">
                            <CheckCircle2 className="text-orange-500" size={24} />
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Results Delivered</h4>
                        </div>
                        <p className="text-slate-800 dark:text-slate-200 text-lg leading-relaxed font-medium">
                            {caseStudy.outcome}
                        </p>
                     </div>
                </div>
            </div>
        </div>
        
        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end">
            <button
                onClick={onClose}
                className="px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
                Close Details
            </button>
        </div>

      </div>
    </div>
  );
};

export default CaseStudyModal;
