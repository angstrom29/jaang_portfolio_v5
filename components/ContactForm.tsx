
import React, { useState } from 'react';
import { Send, Check, Loader2 } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    businessType: 'Real Estate',
    otherBusinessType: '',
    projectType: 'Complete Automation Setup',
    otherProjectType: '',
    timeline: 'As soon as possible',
    otherTimeline: '',
    challenges: '',
    outcomes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://hook.us1.make.com/er88agidas3ydk3xjyu3bdn3iht5miao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          businessType: formData.businessType === 'Other' ? formData.otherBusinessType : formData.businessType,
          projectType: formData.projectType === 'Others' ? formData.otherProjectType : formData.projectType,
          timeline: formData.timeline === 'Please Indicate' ? formData.otherTimeline : formData.timeline,
          source: 'Portfolio Website',
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error('Form submission failed');
        alert('Something went wrong. Please try again or contact me directly via WhatsApp/Email.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-fade-in py-12">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
          <Check size={40} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Message Received</h3>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Thanks for reaching out! I'll review your process and get back to you shortly.
          </p>
        </div>
        <button 
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              company: '',
              businessType: 'Real Estate',
              otherBusinessType: '',
              projectType: 'Complete Automation Setup',
              otherProjectType: '',
              timeline: 'As soon as possible',
              otherTimeline: '',
              challenges: '',
              outcomes: ''
            });
          }}
          className="text-orange-500 dark:text-orange-400 font-bold hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Name</label>
          <input 
            required
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Email</label>
          <input 
            required
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@company.com"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Phone / Whatsapp #</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 234 567 8900"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Organization Name</label>
          <input 
            type="text" 
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Acme Corp"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Business Type</label>
          <select 
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all dark:bg-slate-700 dark:border-slate-600"
          >
            <option>Real Estate</option>
            <option>Healthcare</option>
            <option>E-commerce</option>
            <option>Professional Services</option>
            <option>Fitness & Wellness</option>
            <option>Marketing Agency</option>
            <option>Construction</option>
            <option>Roofing</option>
            <option>Fencing</option>
            <option>Plumbing</option>
            <option>HVAC</option>
            <option>Electrical</option>
            <option>Fire Protection</option>
            <option>Security</option>
            <option>Car Rental</option>
            <option>Landscaping</option>
            <option>Window Cleaning</option>
            <option>Carpet Cleaning</option>
            <option>Handyman</option>
            <option>Home Cleaning</option>
            <option>Garage Door</option>
            <option>Lawn Care</option>
            <option>Pest Control</option>
            <option>Pool and Spa Service</option>
            <option>Fireplace and Chimney</option>
            <option>Locksmith</option>
            <option>Painting Contractors</option>
            <option>Junk Removal</option>
            <option>Other</option>
          </select>
          {formData.businessType === 'Other' && (
            <div className="mt-3">
              <input
                type="text"
                name="otherBusinessType"
                value={formData.otherBusinessType}
                onChange={handleChange}
                placeholder="Please specify your business type"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400"
                required
              />
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Project Type</label>
          <select 
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all dark:bg-slate-700 dark:border-slate-600"
          >
            <option>Complete Automation Setup</option>
            <option>Sales Funnel Development</option>
            <option>Lead Generation System</option>
            <option>CRM Configuration</option>
            <option>Internal Operations</option>
            <option>AI Agents Implementation</option>
            <option>Website Development</option>
            <option>Strategy Consultation</option>
            <option>Others</option>
          </select>
          {formData.projectType === 'Others' && (
            <div className="mt-3">
              <input
                type="text"
                name="otherProjectType"
                value={formData.otherProjectType}
                onChange={handleChange}
                placeholder="Please specify your project type"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400"
                required
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Timeline</label>
          <select 
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all dark:bg-slate-700 dark:border-slate-600"
          >
            <option>As soon as possible</option>
            <option>Within 1 Month</option>
            <option>2-3 Months</option>
            <option>Flexible Timeline</option>
            <option>Please Indicate</option>
          </select>
          {formData.timeline === 'Please Indicate' && (
            <div className="mt-3">
              <input
                type="text"
                name="otherTimeline"
                value={formData.otherTimeline}
                onChange={handleChange}
                placeholder="Please specify your timeline"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400"
                required
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">What challenges is your business currently facing?</label>
        <textarea 
          rows={3}
          name="challenges"
          value={formData.challenges}
          onChange={handleChange}
          placeholder="E.g., High lead response time, data entry errors, lack of visibility..."
          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">What outcomes do you want to achieve?</label>
        <textarea 
          rows={4}
          name="outcomes"
          value={formData.outcomes}
          onChange={handleChange}
          placeholder="E.g., Save 20 hours/week, Automate client onboarding, Scale to 100 leads/day..."
          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400"
        ></textarea>
      </div>

      <button 
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-orange-600 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Submit Inquiry</span>
            <Send size={18} />
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
