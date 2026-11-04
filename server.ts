import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(cors());
app.use(express.json());

// Initialize GoogleGenAI client on the server side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const SYSTEM_INSTRUCTION = `You are the official AI Assistant & Automation Specialist for John Andrew Ang (Automate With John).
Your role:
- Greet visitors warmly, concisely, and professionally.
- Represent John Andrew Ang, a Senior AI Automation Developer & Consultant based in Metro Manila, Philippines.
- Answer technical and business questions about John's services:
  * Operations & Workflow Automation: Make.com, n8n, Zapier
  * CRM & Sales Funnel Systems: GoHighLevel (GHL), Elementor, WordPress
  * Custom AI Agents & Receptionists: OpenAI API (GPT-4o), Claude, WhatsApp Flows, prompt guardrails
  * Financial & Business Integrations: Zoho Books, Xero, Stripe, Lightspeed POS, ClickUp, monday.com, Google Sheets, Slack, Gmail
- Reference John's verified case studies with real metrics:
  * Order-to-Invoice in under a second (Make.com + Google Sheets + Zoho Books with item search and smart contact upsert)
  * AI Receptionist for Melbourne AV Company (Elementor + Make + OpenAI + monday.com with strict guardrails)
  * Automated WordPress Publisher (Make.com + monday.com, 20 hrs/week saved, $4,080/mo savings)
  * Mobile Operations Assistant on WhatsApp (WhatsApp Flows + Make + OpenAI, 30 hrs/week saved)
  * POS & Accounting Sync (Lightspeed POS to ClickUp & Xero, 40 hrs/week saved)
- Guide potential clients to book a 30-minute discovery call: https://cal.com/automatewithjohn/30min
- Or suggest messaging John directly on WhatsApp (+639979882369) or email (proxoft.solutions@gmail.com).
- Guardrails:
  * Be transparent that you are John's AI assistant.
  * Do not make up arbitrary fixed pricing for custom enterprise requests; direct them to the pricing section on page or to book a quick consultation.
  * Keep responses helpful, structured, and easy to read with bullet points when explaining technical concepts.`;

interface ChatHistoryItem {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

// Multi-turn Gemini chat endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history = [], model = 'gemini-3.8-flash' } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required and must be a string.' });
      return;
    }

    // Select valid model based on instruction:
    // gemini-3.8-flash for general tasks, gemini-3.1-flash-lite for fast tasks, gemini-4-argon for complex tasks
    const validModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-4-argon'];
    const selectedModel = validModels.includes(model) ? model : 'gemini-3.8-flash';

    // Format previous conversation history for contents array
    const formattedContents = (history as ChatHistoryItem[]).map(item => ({
      role: item.role === 'model' ? 'model' : 'user',
      parts: [{ text: item.parts?.[0]?.text || '' }]
    }));

    // Append current user message
    formattedContents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    const replyText = response.text || "I'm here to help! Could you please repeat or clarify your question?";

    res.json({
      text: replyText,
      model: selectedModel
    });
  } catch (error: any) {
    console.error('Gemini API Error in /api/chat:', error);
    const errorMessage = error?.message || 'Failed to process request with Gemini.';
    res.status(500).json({
      error: errorMessage,
      fallbackText: "I'm having a brief connection issue reaching my brain. Feel free to book a direct call with John at https://cal.com/automatewithjohn/30min or message him on WhatsApp!"
    });
  }
});

// Dynamic sitemap.xml resolving the current hostname automatically
app.get('/sitemap.xml', (req: Request, res: Response) => {
  const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';
  const host = req.get('host') || 'localhost';
  const baseUrl = `${protocol}://${host}`;
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>2026-11-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/#about</loc>
    <lastmod>2026-11-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#services</loc>
    <lastmod>2026-11-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#results</loc>
    <lastmod>2026-11-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#pricing</loc>
    <lastmod>2026-11-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#faq</loc>
    <lastmod>2026-11-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/#contact</loc>
    <lastmod>2026-11-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
  res.header('Content-Type', 'application/xml');
  res.send(sitemap);
});

// Vite middleware in dev or static bundle in production
if (!isProduction) {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT} (production: ${isProduction})`);
});
