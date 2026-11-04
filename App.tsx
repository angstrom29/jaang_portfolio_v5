
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import { BookingProvider, useBooking } from './context/BookingContext';
import { ContactProvider, useContact } from './context/ContactContext';
import { Loader2 } from 'lucide-react';
import ChatWidget from './components/ChatWidget';

// Lazy load below-the-fold components
const Services = lazy(() => import('./components/Services'));
const Process = lazy(() => import('./components/Process'));
const CaseStudies = lazy(() => import('./components/CaseStudies'));
const SocialProof = lazy(() => import('./components/SocialProof'));
const Pricing = lazy(() => import('./components/Pricing'));
const FAQ = lazy(() => import('./components/FAQ'));
const Contact = lazy(() => import('./components/Contact'));
const Booking = lazy(() => import('./components/Booking'));
const FinalCTA = lazy(() => import('./components/FinalCTA'));
const Footer = lazy(() => import('./components/Footer'));
const BookingModal = lazy(() => import('./components/BookingModal'));
const ContactModal = lazy(() => import('./components/ContactModal'));

type Theme = 'light' | 'dark';

const SectionLoader = () => (
  <div className="w-full h-96 flex items-center justify-center">
    <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
  </div>
);

const GlobalModals = () => {
  const { isBookingOpen } = useBooking();
  const { isContactOpen } = useContact();

  return (
    <>
      {isBookingOpen && <BookingModal />}
      {isContactOpen && <ContactModal />}
    </>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <HelmetProvider>
      <SEO />
      <ContactProvider>
        <BookingProvider>
          <div className="min-h-screen flex flex-col selection:bg-orange-100 selection:text-orange-900 dark:selection:bg-orange-800 dark:selection:text-orange-100">
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <main className="flex-grow pt-16">
              {/* Eagerly load Hero and About for immediate LCP (Largest Contentful Paint) */}
              <Hero />
              <About />
              
              {/* Removed LazySection wrapper to ensure anchor links work immediately */}
              <Suspense fallback={<SectionLoader />}>
                <Services />
              </Suspense>
              
              <Suspense fallback={<SectionLoader />}>
                <Process />
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <CaseStudies />
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <SocialProof />
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <Pricing />
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <Contact />
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <Booking />
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <FAQ />
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <FinalCTA />
              </Suspense>
            </main>
            
            <Suspense fallback={<div className="h-20 bg-white dark:bg-slate-950"></div>}>
              <Footer />
            </Suspense>
            
            <Suspense fallback={null}>
               <GlobalModals />
            </Suspense>
            {/* <ChatWidget /> */}
          </div>
        </BookingProvider>
      </ContactProvider>
    </HelmetProvider>
  );
};

export default App;
