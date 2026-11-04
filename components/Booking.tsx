
import React from 'react';

const Booking: React.FC = () => {
  return (
    <section id="booking" className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 mb-4">Book Your Free Discovery Call</h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            This is a no-pressure, 30-minute strategy session to map out your automation plan. Select a time that works for you below.
          </p>
        </div>
        <div className="max-w-5xl mx-auto bg-white dark:bg-slate-950 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden min-h-[700px]">
          <iframe 
            src="https://cal.com/automatewithjohn/30min" 
            width="100%" 
            height="700px" 
            frameBorder="0" 
            title="Schedule a meeting"
            loading="lazy"
            className="w-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Booking;
