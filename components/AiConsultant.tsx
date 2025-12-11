import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot } from 'lucide-react';
import { ChatMessage } from '../types';
import { generateConsultantResponse } from '../services/geminiService';

export const AiConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I'm Nexus, your AI consultant. How can Digital Complement help automate your business today?"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Prepare history for Gemini
    // We map our local message state to the format Gemini expects (skipping the very first welcome message if we want, or keeping it as model context)
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    try {
      const responseText = await generateConsultantResponse(history, userMsg.text);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center ${
          isOpen ? 'bg-slate-700 rotate-90' : 'bg-gradient-to-r from-brand-primary to-brand-accent animate-pulse'
        }`}
        aria-label="Open AI Consultant"
      >
        {isOpen ? <X className="text-white" /> : <MessageSquare className="text-white" />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 flex flex-col transition-all duration-300 origin-bottom-right ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        }`}
        style={{ height: '500px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-800/50 rounded-t-2xl flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Nexus AI Agent</h3>
            <p className="text-xs text-brand-secondary flex items-center gap-1">
              <span className="block h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              Online
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-slate-900/90">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-slate-700' : 'bg-brand-primary/20'}`}>
                {msg.role === 'user' ? <User size={16} className="text-slate-300" /> : <Bot size={16} className="text-brand-secondary" />}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                  msg.role === 'user'
                    ? 'bg-brand-primary text-white rounded-br-none'
                    : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
               <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-primary/20 flex items-center justify-center">
                 <Bot size={16} className="text-brand-secondary" />
               </div>
               <div className="bg-slate-800 rounded-2xl rounded-bl-none px-4 py-3 border border-slate-700">
                 <div className="flex gap-1">
                   <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                   <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                   <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-800 bg-slate-800/30 rounded-b-2xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about our AI services..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-primary transition-colors placeholder-slate-500"
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim() || isTyping}
              className="p-2 bg-brand-primary rounded-xl text-white hover:bg-brand-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};