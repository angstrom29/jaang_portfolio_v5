
import React from 'react';
import { 
  Zap, 
  BarChart3, 
  Bot, 
  Workflow, 
  LineChart, 
  Cpu, 
  ExternalLink,
  Linkedin,
  Award,
  Briefcase,
  Github
} from 'lucide-react';
import { ServiceItem, CaseStudy, Testimonial, FAQItem } from './types';

export const CONTACT_WHATSAPP = "+639979882369";
export const CONTACT_EMAIL = "proxoft.solutions@gmail.com";
export const BOOKING_URL = "https://cal.com/automatewithjohn/30min";

export const SOCIAL_LINKS = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/engrdrew/', icon: Linkedin },
  { name: 'Upwork', url: 'https://www.upwork.com/freelancers/johnandrewa', icon: Briefcase },
  { name: 'OnlineJobs.ph', url: 'https://www.onlinejobs.ph/jobseekers/info/3015258', icon: ExternalLink },
  { name: 'GitHub', url: 'https://github.com/angstrom29', icon: Github },
];

export const REVENUE_SERVICES: ServiceItem[] = [
  {
    title: "MVP Funnel Architecture",
    description: "I build the simplest, high-converting version of your funnel. No feature bloat, just clean systems that work.",
    benefits: ["Easy-to-manage pipelines", "Reliable lead capture", "Clear, maintainable logic"],
    icon: BarChart3
  },
  {
    title: "Lean Lead Systems",
    description: "Capture and route leads without fragile complexity. Designed for maximum stability and ease of handoff.",
    benefits: ["Simple validation rules", "Error-proof routing", "Low-maintenance setup"],
    icon: Zap
  },
  {
    title: "Reliable Outreach",
    description: "Automated follow-ups that don't break. I prioritize clarity and reliability over complex, flashy features.",
    benefits: ["Transparent sending rules", "Fail-safe triggers", "Easy-to-edit templates"],
    icon: LineChart
  }
];

export const INTERNAL_OPS_SERVICES: ServiceItem[] = [
  {
    title: "Core Workflow Design",
    description: "I build the Minimum Viable Product for your ops. Simple, documented workflows that are easy to debug.",
    benefits: ["Clean, visual logic", "Built for 99.9% uptime", "Simplified maintenance"],
    icon: Workflow
  },
  {
    title: "Practical AI Agents",
    description: "No over-engineering. Just simple agents that triage support or summarize data reliably and predictably.",
    benefits: ["Strict prompt guardrails", "Predictable outputs", "Simple integration points"],
    icon: Bot
  },
  {
    title: "Robust Integrations",
    description: "Connecting your tools with a focus on stability. If it breaks, it tells you exactly why.",
    benefits: ["Error logging & alerts", "Self-healing scenarios", "Clean data mapping"],
    icon: Cpu
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: "AI Receptionist for 24/7 Lead Capture & Support",
    tag: 'Operations',
    category: 'AI Automation Workflows',
    isNew: true,
    summary: "An intelligent AI receptionist utilizing Make.com and OpenAI that engages website visitors 24/7, answers technical FAQs, and seamlessly syncs qualified leads to monday.com.",
    problem: <>A Melbourne AV company wanted to improve their website experience. Visitors had complex questions about sound systems and lighting after hours, but there was <strong>no live chat</strong> or instant help—just a <strong>slow contact form</strong> and a wait.</>,
    solution: <>I built an <strong>AI receptionist</strong> entirely custom-linked via an <strong>Elementor chat widget</strong>, powered by <strong>Make and the OpenAI API</strong>. The AI handles conversations, naturally answers FAQs, and qualifies leads. Strict <strong>guardrails</strong> ensure the AI knows what <em>not</em> to do: <strong>no pricing quotes, no pretending to be human, no overpromising, and no guessing stock</strong>. Qualified leads are automatically mapped and saved as detailed cards in <strong>monday.com</strong>.</>,
    outcome: <><strong>Better visitor experience</strong> paired with <strong>24/7 lead capture</strong>. The team now wakes up to <strong>structured, qualified enquiries in monday.com</strong> rather than a messy inbox, with complex requests smartly flagged via <strong>Gmail</strong>. This runs at a <strong>fraction of the cost of a human receptionist</strong>—no shifts, no breaks, no holidays.</>,
    images: [],
    linkedInEmbedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7469125787758043136?collapsed=1"
  },
  {
    title: "Order-to-Invoice Automation in Under a Second",
    tag: 'Operations',
    category: 'AI Automation Workflows',
    summary: "A seamless integration using Make.com that eliminates manual data entry by instantly turning Google Sheets orders into detailed Zoho Books invoices.",
    problem: <>Most businesses are still copying order data from spreadsheets into their accounting system by hand. The client needed a way to process new orders from <strong>Google Sheets</strong> (including customer details, item, quantity, payment method, and shipping) directly into <strong>Zoho Books</strong> <strong>without manual lookup or data duplication</strong>.</>,
    solution: <>I built a fully automated <strong>Make.com scenario</strong> that triggers on a new Google Sheets row. The system <strong>validates the product</strong> by dynamically searching Zoho Books for the item ID (no hardcoding). It then performs a <strong>smart contact upsert</strong>—finding the customer by email to update details, or creating a new one to prevent duplicates. Both paths merge into a single contact ID to <strong>create a fully structured invoice</strong> with shipping and item options.</>,
    outcome: <><strong>Zero manual invoicing</strong>, <strong>no duplicate customers</strong>, and <strong>no missing products</strong>. Every order practically turns into a <strong>Zoho Books invoice in under a second</strong>. This type of automation instantly <strong>pays for itself on Day 1</strong>.</>,
    images: [
      "https://cdn.gamma.app/lrbz784tlz820qt/8a72a112a2af486482aa75ac0bf7ea3d/original/2026-06-03_223031.png",
      "https://cdn.gamma.app/lrbz784tlz820qt/c32d45ff5fa84d91abbddd0ee9ffb3dd/original/2026-06-03_222953.png",
      "https://cdn.gamma.app/lrbz784tlz820qt/55f5a9843bee4cc5817207684b88c34a/original/2026-06-03_222839.png"
    ],
    linkedInEmbedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7467871380332531712?collapsed=1"
  },
  {
    title: "Automated WordPress Blog Post Publisher",
    tag: 'Operations',
    category: 'AI Automation Workflows',
    summary: "A fully automated content pipeline utilizing Make.com and Monday.com that eliminates manual WordPress publishing, saving 20+ hours per week.",
    problem: <>The client needed to <strong>publish posts automatically on WordPress</strong> to remove manual bottlenecks. Their team was spending <strong>20+ hours/week</strong> formatting posts manually.</>,
    solution: <>I created a system utilizing <strong>Make.com as the backend</strong> and a <strong>Monday.com board as the Frontend</strong> for the team. I integrated <strong>AI for SEO</strong> to handle <strong>meta descriptions, focus keywords, and internal linking</strong>, and enabled <strong>automatic alt text</strong> for each image post.</>,
    outcome: <><strong>Manual blog posting is eliminated</strong>. The team saves <strong>20 hours/week</strong>. The system produces <strong>well-structured Gutenberg postings</strong> with <strong>automatically inserted internal links</strong>, resulting in <strong>$4,080 monthly savings!</strong></>,
    images: [
      "https://cdn.gamma.app/lrbz784tlz820qt/f037d272aa484034a1ede9f8dd830d4e/original/lKUZTtq1Sl6.jpeg",
      "https://cdn.gamma.app/lrbz784tlz820qt/94620bbb19094d2ebf4c9882efdd1426/original/2025-11-24_133257.png",
      "https://cdn.gamma.app/lrbz784tlz820qt/b831d0a61228493e94b1d9be99b3792d/original/2025-11-24_133704.png"
    ]
  },
  {
    title: "AI Powered Business Operations Assistant",
    tag: 'Operations',
    category: 'AI Automation Workflows',
    summary: "A mobile-first AI Chatbot on WhatsApp that streamlines daily business operations, saving the client 30 hours per week.",
    problem: <>The client needed an <strong>AI Assistant/Chatbot within WhatsApp</strong> to handle daily business operations on the go, as manual organizing was consuming too much time.</>,
    solution: <>I engineered a system with <strong>Make.com as the backend</strong> and <strong>WhatsApp as the frontend</strong>. I utilized <strong>WhatsApp Flows for message personalization</strong> and integrated <strong>OpenAI</strong> to handle tasks like <strong>calendar event summarization</strong> and generating <strong>blog ideas</strong>.</>,
    outcome: <>The result is a <strong>handy mobile chatbot</strong> for daily business operations. The system <strong>saved 30 hours/week</strong> from manual organizing, resulting in <strong>$2,040 monthly savings!</strong></>,
    images: [
      "https://cdn.gamma.app/lrbz784tlz820qt/c15061375dc549a4948d2b8e8b3dd67b/original/5QMt0wGzXkE.jpeg",
      "https://cdn.gamma.app/lrbz784tlz820qt/3e05d9f6789b422b9015a6422ca598a5/original/2025-11-24_140148.png"
    ]
  },
  {
    title: "Order and Accounting Automation System",
    tag: 'Operations',
    category: 'AI Automation Workflows',
    summary: "A seamless integration between Lightspeed POS, ClickUp, and Xero that eliminates manual data entry, saving 40 hours per week.",
    problem: <>The client needed to transfer order data from their <strong>POS Software (Lightspeed)</strong> to <strong>ClickUp</strong> for order and accounting operations. This manual process was creating a significant bottleneck.</>,
    solution: <>I built a robust automation system using <strong>Make.com as the backend</strong> to orchestrate workflows between <strong>ClickUp for order management</strong> and <strong>Xero for accounting</strong>. The system captures order data via <strong>webhooks from Lightspeed</strong> and implements <strong>advanced error handling</strong> for seamless operation.</>,
    outcome: <><strong>20 hours/week saved</strong> from manual data entry (Lightspeed to ClickUp) and another <strong>20 hours/week saved</strong> (Xero to ClickUp). Total of <strong>$2,720 monthly savings!</strong></>,
    images: [
      "https://cdn.gamma.app/lrbz784tlz820qt/5c01f41af8584e709fa92ee5ca0785c4/original/Untitled.jpeg",
      "https://cdn.gamma.app/lrbz784tlz820qt/5ecc0a1558134ff39e2b17bd200bcb90/original/2025-11-24_141229.png",
      "https://cdn.gamma.app/lrbz784tlz820qt/79e4d361124246e98f744175d93d34ea/original/ytuytut.jpeg"
    ]
  },
  {
    title: "24/7 AI Chatbot & Appointment Setter",
    tag: 'Revenue',
    category: 'AI Automation Workflows',
    summary: "An intelligent n8n-powered chatbot that engages visitors 24/7, answers queries, and automatically books meetings to maximize lead capture.",
    problem: <>I needed a way to handle <strong>customer inquiries 24/7</strong> on my own portfolio website to ensure <strong>no opportunity was missed</strong> while I was asleep or working.</>,
    solution: <>I developed an <strong>AI Agent using n8n</strong> featuring <strong>conversational memory</strong> and a tailored <strong>knowledge base</strong>. The bot is integrated with <strong>Google Calendar</strong> to handle <strong>automatic appointment scheduling</strong> in real-time.</>,
    outcome: <><strong>Zero missed inquiries</strong> regardless of the time of day. Visitors are engaged instantly, leading to a <strong>higher conversion rate</strong>. The system handles <strong>automatic scheduling and email notifications</strong>, maximizing efficiency.</>,
    images: [
      "https://cdn.gamma.app/lrbz784tlz820qt/758bf5cc8e6c49ff9cb2a5e3cd28cb41/original/2025-11-24_144941.png",
      "https://cdn.gamma.app/lrbz784tlz820qt/a03783a0550b4c04a7f51378dd26c377/original/2025-11-24_145103.png"
    ]
  },
  {
    title: "24/7 Automated Lead/Form Capture for Website",
    tag: 'Revenue',
    category: 'AI Automation Workflows',
    summary: "A seamless lead capture system integrating Website Forms, Make.com, and Slack to eliminate manual entry and ensure zero lead loss.",
    problem: <>The business suffered from <strong>manual capture of leads</strong> from website forms, resulting in time-consuming data entry and <strong>potential data loss</strong>.</>,
    solution: <>I created a <strong>workflow automation</strong> using <strong>Make.com webhooks</strong> to automatically ingest leads from forms. I implemented <strong>instant Slack notifications</strong> to alert the sales team the moment a lead arrives.</>,
    outcome: <><strong>All leads are captured automatically</strong> and no data is lost. Eliminated <strong>10 hours/week</strong> of manual data entry to Google Sheets/CRM, saving <strong>$5,100 annually!</strong></>,
    images: [
      "https://cdn.gamma.app/lrbz784tlz820qt/2540fdd90e81405a80c715188618dacd/original/2025-11-24_145230.png",
      "https://cdn.gamma.app/lrbz784tlz820qt/7e8bdc9b713245b59022e7459e02a9fc/original/iyiklhjl.jpeg",
      "https://cdn.gamma.app/lrbz784tlz820qt/206096879f8c4b6d9629e1cb462b22d0/original/2025-11-24_154820.png"
    ]
  },
  {
    title: "AI-Accelerated Service Landing Page",
    tag: 'Revenue',
    category: 'AI Automation Workflows',
    summary: "A high-conversion landing page built via Vibe Coding (AI) featuring a 24/7 AI chatbot, live service demo, and automated lead capture.",
    problem: <>I needed to create a <strong>landing page for a new service</strong> immediately. Building it manually or using drag-and-drop tools was <strong>too slow</strong>, creating a bottleneck in launching the service.</>,
    solution: <>I leveraged <strong>Vibe Coding (AI-powered app generation)</strong> to build the site instantly. I integrated an <strong>AI Assistant Chatbot</strong> for 24/7 inquiry handling, embedded a <strong>live service demonstration</strong>, and connected an <strong>automated lead capture form</strong>.</>,
    outcome: <><strong>Fastest time-to-market</strong> using AI coding. The <strong>24/7 AI Chatbot</strong> ensures <strong>zero missed inquiries</strong>, and the system automatically captures leads, resulting in <strong>maximized opportunities</strong>. <a href="https://johnautomation.onrender.com/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline font-bold ml-1">View Live Site</a></>,
    images: [
      "https://cdn.gamma.app/lrbz784tlz820qt/4368e848d95746078faaee15af26c714/original/2026-01-16_084913.png"
    ],
    videoUrl: "https://www.loom.com/embed/b2b39ed01a4745dea6a594f39fd3b66d"
  },
  {
    title: "High-Ticket Coaching Funnel System",
    tag: 'Revenue',
    category: 'Funnel System',
    summary: "A complete end-to-end funnel architecture designed to nurture leads into booked calls for a coaching program.",
    problem: <>The client struggled with <strong>inconsistent lead flow</strong> and a disorganized follow-up process, resulting in low conversion rates for their high-ticket offer.</>,
    solution: <>I built a <strong>comprehensive funnel system</strong> including a VSL landing page, automated email nurturing sequences, and an integrated booking calendar.</>,
    outcome: <><strong>Doubled the number of booked calls</strong> within the first month and established a predictable revenue stream.</>,
    images: [] 
  },
  {
    title: "E-commerce Sales & Retargeting Funnel",
    tag: 'Revenue',
    category: 'Funnel System',
    summary: "An optimized sales funnel with automated cart abandonment recovery and cross-sell sequences.",
    problem: <>The store had high traffic but a <strong>low conversion rate</strong> and significant revenue loss due to abandoned carts.</>,
    solution: <>I implemented a <strong>multi-stage funnel</strong> with dynamic retargeting ads and personalized SMS/Email recovery flows.</>,
    outcome: <>Recovered <strong>15% of abandoned carts</strong> and increased average order value (AOV) by 20%.</>,
    images: []
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Andrew M.",
    role: "HSEQ Manager",
    content: "Thank you so much for your help with this automation; you are an absolute gentleman. Before I knew it, I had a perfectly working automation, and it was all due to your help and expertise. Thank you so much, it is greatly appreciated!",
    platform: "LinkedIn"
  },
  {
    name: "Michael R.",
    role: "Agency Founder",
    content: "John is a systems engineer through and through. He didn't just 'set up a zap'; he mapped out our entire business flow and automated the bottlenecks.",
    platform: "Upwork"
  },
  {
    name: "Sarah T.",
    role: "Operations Manager",
    content: "Our internal reporting was a nightmare before John stepped in. The n8n workflows he built are robust and have never failed. Highly recommended.",
    platform: "LinkedIn"
  },
  {
    name: "David K.",
    role: "E-commerce Owner",
    content: "The abandoned cart recovery system John built paid for itself in the first week. We're seeing a 15% uplift in revenue without lifting a finger.",
    platform: "Upwork"
  },
  {
     name: "James L.",
     role: "Real Estate Broker",
     content: "John's lead qualification bot completely changed our workflow. My agents only talk to qualified leads now. Huge time saver.",
     platform: "OnlineJobs.ph"
  },
  {
     name: "Elena R.",
     role: "SaaS Founder",
     content: "We needed a complex integration between Stripe and our custom database. John mapped it out and built it perfectly. Zero errors since launch.",
     platform: "LinkedIn"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "What exactly do you build?",
    answer: <>I engineer <strong>AI Automation Workflows</strong> to streamline operations and <strong>Sales Funnel Systems</strong> to drive revenue. I connect your apps to work together on autopilot.</>
  },
  {
    question: "What tools do you use?",
    answer: <>I use <strong>Make.com and n8n</strong> for backend logic, <strong>GoHighLevel</strong> for funnels, and <strong>OpenAI/Claude</strong> for intelligent agents. I select the best tool for stability and scale.</>
  },
  {
    question: "How long does it take to see results?",
    answer: <>Simple automations launch in <strong>48-72 hours</strong>. Complete funnel ecosystems or complex operational builds typically take <strong>2-4 weeks</strong> to design, test, and deploy.</>
  },
  {
    question: "Do I need technical skills to manage this?",
    answer: <>No. I build <strong>user-friendly systems</strong> and provide video SOPs. You handle the strategy; the system handles the heavy lifting without code maintenance.</>
  },
  {
    question: "Do you offer support after launch?",
    answer: <>Yes. Every project includes <strong>2 weeks of dedicated support</strong>. I also offer maintenance packages to ensure your automations run smoothly as your business grows.</>
  }
];
