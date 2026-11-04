
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useContact } from '../context/ContactContext';
import ContactForm from './ContactForm';

const ContactModal: React.FC = () => {
  const { isContactOpen, closeContact } = useContact();

  useEffect(() => {
    if (isContactOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isContactOpen]);

  if (!isContactOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity duration-300" 
        onClick={closeContact}
      />
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-y-auto flex flex-col border border-slate-200 dark:border-slate-800 animate-[fade-in-up_0.3s_ease-out]">
        <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Let's Automate Your Business</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Fill out the details below to get started.</p>
            </div>
            <button 
                onClick={closeContact}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
                <X size={24} className="text-slate-500" />
            </button>
        </div>
        <div className="p-6 sm:p-8">
             <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
