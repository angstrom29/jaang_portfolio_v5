
import React, { useState, useEffect, useRef } from 'react';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      type: 'bot',
      text: "Hi there, I'm John's AI Assistant. How can I help you?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showStarterPrompts, setShowStarterPrompts] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const CONFIG = {
    webhookUrl: 'https://n8nproxoftrepo.site/webhook/ffcf29b6-19e9-40fd-81a6-132910560043/chat',
    maxChars: 5000,
    botAvatarSrc: 'https://i.imgur.com/rQe36LP.png',
    userAvatarSrc: 'https://www.svgrepo.com/show/532363/user-alt-1.svg',
    headerAvatarSrc: 'https://i.imgur.com/zCrUjG4.png',
    buttonIconSrc: 'https://i.imgur.com/zCrUjG4.png'
  };

  useEffect(() => {
    // Show tooltip logic after delay
    const timer = setTimeout(() => {
      setShowTooltip(true);
      const hideTimer = setTimeout(() => setShowTooltip(false), 5000);
      return () => clearTimeout(hideTimer);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    // Scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isOpen, messages, isTyping]);

  const getSessionId = () => {
      let sessionId = localStorage.getItem('chat_session_id');
      if (!sessionId) {
          sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
          localStorage.setItem('chat_session_id', sessionId);
      }
      return sessionId;
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    setShowStarterPrompts(false);
    
    // Add user message
    const userMsg = { id: Date.now().toString(), type: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch(CONFIG.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: text,
          sessionId: getSessionId()
        })
      });

      const data = await response.json();
      setIsTyping(false);

      const botText = data.output || data.response || 'Error, please reload the page.';
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), type: 'bot', text: botText }]);

    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), type: 'bot', text: 'Error, please reload the page.' }]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <style>{`
        .chat-widget-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background-color: #f87217;
            border-radius: 15px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(248, 114, 23, 0.4);
            z-index: 9998;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .chat-widget-button:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 16px rgba(248, 114, 23, 0.5);
        }
        .chat-widget-button img {
            width: 60px;
            height: 60px;
            border-radius: 15px;
        }
        .chat-tooltip {
            position: fixed;
            bottom: 90px;
            right: 20px;
            background-color: #fff9f6;
            color: #1c1c1c;
            padding: 12px 18px;
            border-radius: 8px;
            font-size: 15px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            z-index: 9997;
            white-space: nowrap;
            opacity: 0;
            animation: tooltipFadeIn 0.3s ease forwards;
        }
        @keyframes tooltipFadeIn { to { opacity: 1; } }
        .chat-tooltip::after {
            content: '';
            position: absolute;
            bottom: -6px;
            right: 25px;
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid #fff9f6;
        }
        .chat-window {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 400px;
            height: 600px;
            background-color: #ffffff;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            overflow: hidden;
            transition: all 0.3s ease;
            transform-origin: bottom right;
        }
        .chat-window.closed {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
            pointer-events: none;
        }
        .chat-window.open {
            opacity: 1;
            transform: scale(1) translateY(0);
            pointer-events: all;
        }
        .chat-header {
            background-color: #f87217;
            color: #fafafa;
            padding: 16px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .chat-header-content { display: flex; align-items: center; gap: 12px; }
        .chat-header-avatar { width: 40px; height: 40px; border-radius: 25px; object-fit: cover; }
        .chat-header-title { font-size: 18px; font-weight: 600; }
        .chat-close-btn {
            background: none; border: none; color: #fafafa; font-size: 24px; cursor: pointer;
            width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
            border-radius: 4px; transition: background 0.2s;
        }
        .chat-close-btn:hover { background: rgba(255, 255, 255, 0.1); }
        .chat-messages {
            flex: 1; overflow-y: auto; padding: 20px; background-color: #ffffff;
        }
        .chat-messages::-webkit-scrollbar { width: 6px; }
        .chat-messages::-webkit-scrollbar-thumb { background-color: #d0d0d0; border-radius: 3px; }
        .welcome-message {
            background-color: #f87217; color: #fafafa; padding: 12px 16px;
            border-radius: 6px; margin-bottom: 16px; display: flex; gap: 10px; align-items: flex-start;
        }
        .welcome-message .avatar { width: 32px; height: 32px; border-radius: 25px; flex-shrink: 0; }
        .starter-prompts { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
        .starter-prompt {
            background-color: #f5f5f5; border: 1px solid #e0e0e0; color: #1e1e1f;
            padding: 12px 16px; border-radius: 8px; cursor: pointer; font-size: 15px;
            text-align: center; transition: all 0.2s ease;
        }
        .starter-prompt:hover { background-color: #fff6f3; border-color: #f87217; transform: translateY(-1px); }
        .message { display: flex; gap: 10px; margin-bottom: 16px; align-items: flex-start; }
        .message.bot .avatar { width: 32px; height: 32px; border-radius: 25px; flex-shrink: 0; }
        .message.user { flex-direction: row-reverse; }
        .message.user .avatar { width: 32px; height: 32px; border-radius: 25px; flex-shrink: 0; }
        .message-content {
            max-width: 70%; padding: 12px 16px; border-radius: 6px; font-size: 16px; line-height: 1.5; position: relative;
        }
        .message.bot .message-content { background-color: #f87217; color: #fafafa; }
        .message.user .message-content { background-color: #fff6f3; color: #050505; }
        .copy-icon {
            position: absolute; top: 8px; right: 8px; cursor: pointer; opacity: 0; transition: opacity 0.2s;
            width: 16px; height: 16px; font-size: 12px; display: flex; align-items: center; justify-content: center;
        }
        .message:hover .copy-icon { opacity: 0.7; }
        .copy-icon:hover { opacity: 1 !important; }
        .chat-input-container { padding: 16px 20px; background-color: #ffffff; border-top: 1px solid #e5e5e5; }
        .chat-input-wrapper {
            display: flex; align-items: center; gap: 10px; background-color: #ffffff;
            border: 1px solid #d0d0d0; border-radius: 6px; padding: 8px 12px; transition: border-color 0.2s;
        }
        .chat-input-wrapper:focus-within { border-color: #f87217; }
        .chat-input { flex: 1; border: none; outline: none; font-size: 16px; color: #1e1e1f; font-family: inherit; background: transparent; }
        .chat-input::placeholder { color: #999; }
        .send-button {
            background-color: #f87217; border: none; width: 36px; height: 36px; border-radius: 50px;
            cursor: pointer; display: flex; align-items: center; justify-content: center;
            transition: all 0.2s ease; flex-shrink: 0;
        }
        .send-button:hover { background-color: #e66610; transform: scale(1.05); }
        .send-button:disabled { background-color: #d0d0d0; cursor: not-allowed; transform: none; }
        .send-button svg { width: 18px; height: 18px; fill: #fafafa; }
        .char-counter { font-size: 12px; color: #999; margin-top: 6px; }
        .char-counter.warning { color: #e74c3c; }
        .typing-indicator { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 16px; }
        .typing-indicator .avatar { width: 32px; height: 32px; border-radius: 25px; flex-shrink: 0; }
        .typing-dots {
            background-color: #f87217; padding: 12px 16px; border-radius: 6px; display: flex; gap: 4px;
        }
        .typing-dot {
            width: 8px; height: 8px; background-color: #fafafa; border-radius: 50%;
            animation: typing 1.4s infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @media (max-width: 768px) {
            .chat-window {
                width: calc(100vw - 40px); height: calc(100vh - 40px); bottom: 20px; right: 20px;
            }
        }
      `}</style>

      {/* Button */}
      <div className="chat-widget-button" onClick={() => setIsOpen(true)}>
          <img src={CONFIG.buttonIconSrc} alt="Chat" />
      </div>

      {/* Tooltip */}
      {showTooltip && !isOpen && (
         <div className="chat-tooltip">Hello 👋</div>
      )}

      {/* Window */}
      <div className={`chat-window ${isOpen ? 'open' : 'closed'}`}>
         {/* Header */}
         <div className="chat-header">
             <div className="chat-header-content">
                 <img src={CONFIG.headerAvatarSrc} alt="Avatar" className="chat-header-avatar" />
                 <div className="chat-header-title">JohnAI.tech</div>
             </div>
             <button className="chat-close-btn" onClick={() => setIsOpen(false)}>×</button>
         </div>

         {/* Messages */}
         <div className="chat-messages">
             {messages.map((msg, index) => (
                 <div key={index} className={`message ${msg.type}`}>
                     <img 
                       src={msg.type === 'bot' ? CONFIG.botAvatarSrc : CONFIG.userAvatarSrc} 
                       alt={msg.type} 
                       className="avatar" 
                     />
                     <div className="message-content">
                         <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                         {msg.type === 'bot' && (
                             <span 
                               className="copy-icon" 
                               title="Copy to clipboard"
                               onClick={() => copyToClipboard(msg.text)}
                             >
                               📋
                             </span>
                         )}
                     </div>
                 </div>
             ))}

             {isTyping && (
                 <div className="typing-indicator">
                     <img src={CONFIG.botAvatarSrc} alt="Bot" className="avatar" />
                     <div className="typing-dots">
                         <div className="typing-dot"></div>
                         <div className="typing-dot"></div>
                         <div className="typing-dot"></div>
                     </div>
                 </div>
             )}
             
             {showStarterPrompts && (
                 <div className="starter-prompts">
                     <div className="starter-prompt" onClick={() => sendMessage("Book an Appointment")}>Book an Appointment</div>
                     <div className="starter-prompt" onClick={() => sendMessage("What do you do?")}>What do you do?</div>
                 </div>
             )}
             <div ref={messagesEndRef} />
         </div>

         {/* Input */}
         <div className="chat-input-container">
             <div className="chat-input-wrapper">
                 <input 
                    ref={inputRef}
                    type="text" 
                    className="chat-input" 
                    placeholder="Type your query"
                    maxLength={CONFIG.maxChars}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                 />
                 <button 
                   className="send-button" 
                   disabled={!inputValue.trim()}
                   onClick={() => sendMessage(inputValue)}
                 >
                     <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                 </button>
             </div>
             {inputValue.length > 0 && (
                 <div className={`char-counter ${inputValue.length > CONFIG.maxChars * 0.9 ? 'warning' : ''}`}>
                     {inputValue.length} / {CONFIG.maxChars}
                 </div>
             )}
         </div>
      </div>
    </>
  );
};

export default ChatWidget;
