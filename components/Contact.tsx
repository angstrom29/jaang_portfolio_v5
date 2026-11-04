
import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_WHATSAPP } from '../constants';
import ContactForm from './ContactForm';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto bg-slate-50 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-slate-100 dark:border-slate-700">
          
          {/* Left Info Column */}
          <div className="lg:w-1/3 bg-orange-500 text-white p-12 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold mb-6">Let's Clean Up Your Process</h2>
              <p className="text-orange-100 text-lg mb-8 leading-relaxed">
                Bring me your messy workflows and manual bottlenecks. I’ll design a system that works while you sleep.
              </p>
              
              <div className="space-y-6">
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center group-hover:bg-orange-400 transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-orange-200 uppercase font-bold">Email</p>
                    <p className="font-semibold">{CONTACT_EMAIL}</p>
                  </div>
                </a>
                <a href={`https://wa.me/${CONTACT_WHATSAPP}`} className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center group-hover:bg-orange-400 transition-colors">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-orange-200 uppercase font-bold">WhatsApp</p>
                    <p className="font-semibold">+63 997 988 2369</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-orange-400/50">
              <p className="text-sm italic opacity-80">
                Typical response time: <br />
                <strong>&lt; 4 hours (PHT Business Hours)</strong>
              </p>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:w-2/3 p-12">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
