
// Import React to provide access to the React namespace for type definitions
import React from 'react';

export interface ServiceItem {
  title: string;
  description: string;
  benefits: string[];
  icon: React.ElementType;
}

export interface CaseStudy {
  title: string;
  summary: string;
  problem: React.ReactNode;
  solution: React.ReactNode;
  outcome: React.ReactNode;
  tag: 'Revenue' | 'Operations';
  category: 'AI Automation Workflows' | 'Funnel System';
  images?: string[];
  videoUrl?: string;
  linkedInEmbedUrl?: string;
  isNew?: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  platform: 'Upwork' | 'LinkedIn' | 'OnlineJobs.ph';
}

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}
