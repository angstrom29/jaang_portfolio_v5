
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const BookingModal: React.FC = () => {
  const { isBookingOpen, closeBooking } = useBooking();

  useEffect(() => {
    if (isBookingOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isBookingOpen]);

  if (!isBookingOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity duration-300" 
        onClick={closeBooking}
      />
      <div className="relative w-full max-w-5xl h-[85vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800 animate-[fade-in-up_0.3s_ease-out]">
        <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 z-10">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 ml-2">Schedule Your Call</h3>
            <button 
                onClick={closeBooking}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
                <X size={24} className="text-slate-500" />
            </button>
        </div>
        <div className="flex-grow w-full h-full bg-white dark:bg-slate-900 relative">
             <iframe 
                src="https://cal.com/automatewithjohn/30min" 
                width="100%" 
                height="100%" 
                frameBorder="0"
                title="Schedule a meeting"
                className="w-full h-full"
            ></iframe>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
