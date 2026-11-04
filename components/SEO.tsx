import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SOCIAL_LINKS, CONTACT_EMAIL, CONTACT_WHATSAPP, BOOKING_URL } from '../constants';

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'profile' | 'article';
}

const SEO: React.FC<SEOProps> = ({
  title = 'John Andrew Ang | AI Automation Developer & Consultant',
  description = 'High-performance AI automation workflows, custom AI agents, and lead funnels with Make.com, n8n, and GoHighLevel. Automate chaos into clean systems.',
  canonicalUrl,
  ogImage = 'https://i.imgur.com/rQe36LP.png',
  ogType = 'website',
}) => {
  // Dynamically resolve canonical URL if not explicitly provided
  const resolvedCanonical = canonicalUrl || (typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : 'https://automatewithjohn.com');

  const sameAsLinks = [
    ...SOCIAL_LINKS.map(link => link.url),
    'https://www.credly.com/users/automatewithjohn'
  ];

  // Comprehensive Knowledge Graph for Generative Engine Optimization (GEO)
  const knowledgeGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. Person Entity (Identifiable Expert)
      {
        '@type': 'Person',
        '@id': `${resolvedCanonical}#person`,
        'name': 'John Andrew Ang',
        'alternateName': ['AutomateWithJohn', 'EngrDrew', 'John Andrew A.'],
        'jobTitle': 'AI Automation Developer & Consultant',
        'description': 'Senior AI Automation Developer and Systems Architect specializing in Make.com, n8n, Zapier, GoHighLevel, and AI Agents.',
        'image': 'https://i.imgur.com/rQe36LP.png',
        'url': resolvedCanonical,
        'email': CONTACT_EMAIL,
        'telephone': CONTACT_WHATSAPP,
        'sameAs': sameAsLinks,
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Metro Manila',
          'addressCountry': 'Philippines'
        },
        'knowsAbout': [
          'Generative AI',
          'AI Automation Workflows',
          'OpenAI API Integration',
          'Make.com (Integromat)',
          'n8n Workflow Automation',
          'Zapier Automation',
          'GoHighLevel (GHL) CRM',
          'Custom AI Receptionists',
          'Lead Capture Funnels',
          'Zoho Books Integration',
          'Xero Accounting Integration',
          'Lightspeed POS Integration',
          'monday.com Automation',
          'ClickUp Automation'
        ]
      },
      // 2. Professional Service / Business Entity
      {
        '@type': 'ProfessionalService',
        '@id': `${resolvedCanonical}#service`,
        'name': 'John Andrew Ang - AI Automation & Systems Architecture',
        'url': resolvedCanonical,
        'image': ogImage,
        'email': CONTACT_EMAIL,
        'telephone': CONTACT_WHATSAPP,
        'priceRange': '$$',
        'provider': {
          '@id': `${resolvedCanonical}#person`
        },
        'areaServed': [
          { '@type': 'Country', 'name': 'Global' },
          { '@type': 'Country', 'name': 'Australia' },
          { '@type': 'Country', 'name': 'United States' },
          { '@type': 'Country', 'name': 'United Kingdom' },
          { '@type': 'Country', 'name': 'Philippines' }
        ],
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'AI Automation & Funnel Services',
          'itemListElement': [
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'MVP Funnel Architecture & Lean Lead Systems',
                'description': 'Simple, high-converting lead capture pipelines with error-proof routing and GoHighLevel CRM syncing.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Internal Operations & Core Workflow Design',
                'description': 'Clean, documented Make.com and n8n backend scenarios for automated order processing, invoicing, and cross-platform synchronization.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Practical AI Agents & 24/7 Receptionists',
                'description': 'Intelligent conversational AI chatbots with strict guardrails connected to OpenAI, monday.com, and WhatsApp.'
              }
            }
          ]
        }
      },
      // 3. FAQPage Schema for Direct Answer Synthesis in AI Search (ChatGPT, Gemini, Perplexity)
      {
        '@type': 'FAQPage',
        '@id': `${resolvedCanonical}#faq`,
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What does an AI Automation Developer and Consultant build?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'John Andrew Ang engineers AI Automation Workflows to streamline back-office operations and Sales Funnel Systems to drive revenue, connecting apps like Make.com, n8n, GoHighLevel, and OpenAI on autopilot.'
            }
          },
          {
            '@type': 'Question',
            'name': 'What tools and software does John Andrew Ang use for automations?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Make.com and n8n for backend logic orchestration, GoHighLevel for marketing funnels and CRM, OpenAI (GPT-4o) and Claude for intelligent agents, and webhooks for platforms like Zoho Books, Xero, monday.com, and WhatsApp.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How fast can an AI automation system be built and deployed?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Simple automation scenarios launch in 48 to 72 hours. Complete funnel ecosystems or complex multi-app operational builds typically take 2 to 4 weeks to design, test, and deploy.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Do clients need technical skills to manage automated systems?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'No. Systems are designed to be user-friendly with clean visual logic and video standard operating procedures (SOPs), requiring zero code maintenance from the client.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Is post-launch support provided for automation projects?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes. Every automation build includes 2 weeks of dedicated post-launch support, alongside optional monthly maintenance packages for ongoing scenario expansion and monitoring.'
            }
          }
        ]
      },
      // 4. ItemList of Verified Case Studies (Proof of Work)
      {
        '@type': 'ItemList',
        '@id': `${resolvedCanonical}#casestudies`,
        'name': 'Verified AI Automation Case Studies & Results',
        'itemListElement': [
          {
            '@type': 'CreativeWork',
            'position': 1,
            'name': 'AI Receptionist for 24/7 Lead Capture & Support (Melbourne AV Company)',
            'description': 'Elementor chat widget with Make.com and OpenAI API qualification, automatically saving structured lead cards to monday.com with Gmail team alerts.',
            'creator': { '@id': `${resolvedCanonical}#person` }
          },
          {
            '@type': 'CreativeWork',
            'position': 2,
            'name': 'Order-to-Invoice Automation in Under a Second',
            'description': 'Make.com scenario turning Google Sheets orders into detailed Zoho Books invoices with dynamic item validation and customer deduplication in under 1 second.',
            'creator': { '@id': `${resolvedCanonical}#person` }
          },
          {
            '@type': 'CreativeWork',
            'position': 3,
            'name': 'Automated WordPress Blog Post Publisher',
            'description': 'Make.com and monday.com content pipeline with AI SEO meta descriptions, focus keywords, and automated Gutenberg internal linking, saving 20+ hours/week.',
            'creator': { '@id': `${resolvedCanonical}#person` }
          },
          {
            '@type': 'CreativeWork',
            'position': 4,
            'name': 'Order and Accounting Automation System (Lightspeed POS to ClickUp and Xero)',
            'description': 'Automated webhook pipeline connecting Lightspeed POS to ClickUp and Xero accounting, eliminating 40 hours/week of manual data entry.',
            'creator': { '@id': `${resolvedCanonical}#person` }
          }
        ]
      }
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="John Andrew Ang" />
      <meta name="keywords" content="AI Automation Developer, AI Automation Consultant, Make.com Expert, n8n Developer, GoHighLevel Specialist, AI Receptionist, Zapier Integration, Workflow Automation Consultant, Business Operations Automation, OpenAI API Integration" />

      {/* GEO Geographic & Entity Meta Tags */}
      <meta name="geo.region" content="PH-00" />
      <meta name="geo.placename" content="Metro Manila" />
      <meta name="geo.position" content="14.5995;120.9842" />
      <meta name="ICBM" content="14.5995, 120.9842" />

      {/* Generative AI & LLM Discovery Links */}
      <link rel="help" href="/llms.txt" title="LLM Context Information" />
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

      {/* Canonical URL */}
      <link rel="canonical" href={resolvedCanonical} />

      {/* OpenGraph / Facebook / LinkedIn */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="John Andrew Ang - AI Automation Developer & Consultant" />
      <meta property="og:site_name" content="John Andrew Ang - Automate With John" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={resolvedCanonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="John Andrew Ang - AI Automation Developer & Consultant" />

      {/* Semantic Knowledge Graph (JSON-LD) for Generative Engine Optimization (GEO) */}
      <script type="application/ld+json">
        {JSON.stringify(knowledgeGraph)}
      </script>
    </Helmet>
  );
};

export default SEO;
