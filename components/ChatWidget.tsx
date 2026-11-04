import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  Calendar, 
  MessageCircle, 
  RotateCcw, 
  Copy, 
  Check, 
  ChevronDown,
  Zap,
  Brain,
  MessageSquare
} from 'lucide-react';
import { BOOKING_URL, CONTACT_WHATSAPP } from '../constants';
import { useBooking } from '../context/BookingContext';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  model?: string;
  timestamp: string;
}

const AVAILABLE_MODELS = [
  {
    id: 'gemini-3.8-flash',
    name: 'Gemini 3.8 Flash',
    tag: 'General / Recommended',
    description: 'Fast, smart, and balanced for general inquiries and lead qualification',
    icon: Zap,
    color: 'text-amber-500'
  },
  {
    id: 'gemini-3.1-flash-lite',
    name: 'Gemini 3.1 Flash Lite',
    tag: 'Ultra-Fast',
    description: 'Optimized for high-speed Q&A and instant responses',
    icon: Sparkles,
    color: 'text-orange-500'
  },
  {
    id: 'gemini-4-argon',
    name: 'Gemini 4 Argon',
    tag: 'Complex Architecture',
    description: 'Deep reasoning for complex multi-app architecture & system strategy',
    icon: Brain,
    color: 'text-purple-500'
  }
];

const INITIAL_WELCOME: ChatMessage = {
  id: 'welcome',
  sender: 'bot',
  text: "Hi there! 👋 I'm John Andrew Ang's **Gemini AI Assistant**.\n\nI can answer questions about John's **AI automations** (Make.com, n8n, Zapier), **sales funnels** (GoHighLevel), **case studies**, and help you book a discovery call. How can I help you today?",
  model: 'gemini-3.8-flash',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

const STARTER_PROMPTS = [
  "What automation services do you build?",
  "Tell me about the Zoho Books under 1-second automation",
  "Can you build a custom AI receptionist for my site?",
  "How fast can an automation project launch?"
];

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3.8-flash');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { openBooking } = useBooking();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Show friendly tooltip on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
      const hideTimer = setTimeout(() => setShowTooltip(false), 6000);
      return () => clearTimeout(hideTimer);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll when messages or typing state changes
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, isLoading]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || inputValue).trim();
    if (!messageContent || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build conversation history for multi-turn Gemini context
      const historyPayload = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({
          role: m.sender === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageContent,
          history: historyPayload,
          model: selectedModel
        })
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      const botResponseText = data.text || "I've processed your request. Feel free to ask more details or book a call!";

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        model: data.model || selectedModel,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackMessage: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: "I'm having a brief issue reaching the Gemini model right now. You can also connect with John directly:\n\n• **Book a Call:** [Cal.com 30-Min Discovery](" + BOOKING_URL + ")\n• **WhatsApp:** [Message John on WhatsApp](https://wa.me/" + CONTACT_WHATSAPP + ")",
        model: selectedModel,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        ...INITIAL_WELCOME,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Basic formatting helper for bold, bullet points, and links
  const renderFormattedText = (rawText: string) => {
    return rawText.split('\n').map((line, idx) => {
      // Process simple markdown links [Label](URL)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = linkRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(
          <a
            key={`${idx}-${match.index}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 dark:text-orange-400 font-semibold underline hover:text-orange-700"
          >
            {match[1]}
          </a>
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      // Simple bold formatting
      const renderedLine = parts.map((part, pIdx) => {
        if (typeof part !== 'string') return part;
        const boldRegex = /\*\*([^*]+)\*\*/g;
        const subParts = [];
        let bLast = 0;
        let bMatch;
        while ((bMatch = boldRegex.exec(part)) !== null) {
          if (bMatch.index > bLast) {
            subParts.push(part.substring(bLast, bMatch.index));
          }
          subParts.push(<strong key={`${pIdx}-${bMatch.index}`} className="font-semibold text-slate-900 dark:text-white">{bMatch[1]}</strong>);
          bLast = bMatch.index + bMatch[0].length;
        }
        if (bLast < part.length) {
          subParts.push(part.substring(bLast));
        }
        return subParts;
      });

      return (
        <span key={idx} className="block min-h-[1.25rem]">
          {renderedLine}
        </span>
      );
    });
  };

  const currentModelInfo = AVAILABLE_MODELS.find(m => m.id === selectedModel) || AVAILABLE_MODELS[0];

  return (
    <>
      {/* Tooltip hint above chat button */}
      {showTooltip && !isOpen && (
        <div 
          onClick={() => { setIsOpen(true); setShowTooltip(false); }}
          className="fixed bottom-24 right-6 z-50 bg-slate-900 text-white text-xs md:text-sm font-medium px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 cursor-pointer border border-slate-700 hover:scale-105 transition-all animate-bounce"
        >
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>Ask John's Gemini AI</span>
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-slate-900 rotate-45 border-r border-b border-slate-700"></div>
        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        aria-label="Open AI Chatbot"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center group"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform group-hover:rotate-90 duration-200" />
        ) : (
          <div className="relative flex items-center justify-center">
            <Bot className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white ring-1 ring-green-500 animate-pulse"></span>
          </div>
        )}
      </button>

      {/* Chat Window Modal / Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] max-h-[85vh] h-[640px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-4 py-3.5 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white/20 backdrop-blur-sm p-0.5 border border-white/30 flex items-center justify-center">
                <img 
                  src="https://i.imgur.com/zCrUjG4.png" 
                  alt="John Andrew Ang AI" 
                  className="w-full h-full object-cover rounded-lg"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border border-white"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm tracking-tight">Automate With John AI</h3>
                  <span className="bg-white/20 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded text-white/90">
                    Gemini
                  </span>
                </div>
                <p className="text-[11px] text-white/80 flex items-center gap-1">
                  <span>Online</span> • <span>Ask me anything</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Restart Conversation"
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Model Selector Bar */}
          <div className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-3 py-2 text-xs flex items-center justify-between relative z-20">
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
              <span>Model:</span>
              <button
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold hover:border-orange-500 transition-colors shadow-2xs"
              >
                <currentModelInfo.icon className={`w-3.5 h-3.5 ${currentModelInfo.color}`} />
                <span>{currentModelInfo.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
              </button>
            </div>

            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              Multi-turn active
            </span>

            {/* Model Dropdown Menu */}
            {isModelDropdownOpen && (
              <div className="absolute top-11 left-3 right-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-2 z-30 flex flex-col gap-1 animate-in fade-in duration-150">
                <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 px-2 py-1 tracking-wider">
                  Select Gemini Model
                </p>
                {AVAILABLE_MODELS.map(model => (
                  <button
                    key={model.id}
                    onClick={() => {
                      setSelectedModel(model.id);
                      setIsModelDropdownOpen(false);
                    }}
                    className={`flex items-start gap-2.5 p-2 rounded-lg text-left transition-colors ${
                      selectedModel === model.id 
                        ? 'bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800' 
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <model.icon className={`w-4 h-4 mt-0.5 shrink-0 ${model.color}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-slate-800 dark:text-slate-100">{model.name}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                          {model.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {model.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`relative group max-w-[82%] rounded-2xl px-4 py-3 text-sm shadow-2xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-br-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-xs'
                }`}>
                  <div className="text-[13.5px]">
                    {renderFormattedText(msg.text)}
                  </div>

                  <div className="flex items-center justify-between gap-3 mt-1.5 pt-1 border-t border-black/5 dark:border-white/5 text-[10px] text-slate-400 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-mono">
                      {msg.model && <span className="opacity-80">{msg.model.replace('gemini-', '')}</span>}
                    </span>
                    <div className="flex items-center gap-1">
                      <span>{msg.timestamp}</span>
                      {msg.sender === 'bot' && (
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          title="Copy response"
                          className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-opacity ml-1"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-green-500" />
                          ) : (
                            <Copy className="w-3 h-3 text-slate-400 hover:text-slate-600" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing / Loading indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 animate-pulse" />
                </div>
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 shadow-2xs rounded-bl-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Gemini is thinking</span>
                    <span className="flex gap-1 items-center ml-1">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Action Suggestion Prompts */}
            {messages.length === 1 && (
              <div className="pt-2">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
                  Suggested Prompts
                </p>
                <div className="flex flex-col gap-1.5">
                  {STARTER_PROMPTS.map((prompt, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-left text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 hover:border-orange-500 text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 px-3 py-2 rounded-xl transition-all shadow-2xs hover:shadow-xs active:scale-[0.99]"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Direct CTA Quick Actions */}
          <div className="px-3 py-2 bg-slate-100 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2 text-xs">
            <button
              onClick={() => {
                setIsOpen(false);
                openBooking();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 rounded-lg font-semibold transition-colors border border-orange-500/20"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Call</span>
            </button>
            <a
              href={`https://wa.me/${CONTACT_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg font-semibold transition-colors border border-green-500/20"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500/30 transition-all">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about automations, Make, n8n..."
                disabled={isLoading}
                maxLength={1000}
                className="flex-1 bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className="w-8 h-8 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:hover:bg-orange-500 text-white flex items-center justify-center transition-all shrink-0 active:scale-95 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 px-1">
              <span>Powered by Gemini API</span>
              <span>{inputValue.length}/1000</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default ChatWidget;
