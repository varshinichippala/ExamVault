import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  RotateCcw, 
  Minimize2, 
  Maximize2,
  Sparkles,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  Settings,
  Check,
  Globe
} from 'lucide-react';
import { ChatMessage, sendMessageToN8N, getWebhookUrl, setWebhookUrl } from '../services/n8nChatService';

interface ChatbotWidgetProps {
  currentCategory?: string;
  activeYear?: number | null;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ currentCategory, activeYear }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => 'sess_' + Math.random().toString(36).substring(2, 9));
  const [showSettings, setShowSettings] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(() => getWebhookUrl());
  const [urlSaved, setUrlSaved] = useState(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! 👋 I'm your ExamVault AI assistant connected to n8n.\n\nAsk me anything about GATE, UPSC, SSC, Banking, Railway papers, syllabi, previous questions, or exam strategies!`,
      timestamp: new Date(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || loading) return;

    const userMsgId = 'user_' + Date.now();
    const newMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const reply = await sendMessageToN8N(textToSend.trim(), sessionId, {
        currentCategory,
        activeYear,
      });

      const assistantMsg: ChatMessage = {
        id: 'bot_' + Date.now(),
        sender: 'assistant',
        text: reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: 'err_' + Date.now(),
        sender: 'system',
        text: `Error connecting to n8n webhook: ${err.message || 'Network request failed'}. Please ensure the workflow in n8n is active.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome_' + Date.now(),
        sender: 'assistant',
        text: `Conversation restarted! How can I assist you with your exam preparation?`,
        timestamp: new Date(),
      },
    ]);
  };

  const samplePrompts = [
    'GATE CS cutoff trends?',
    'UPSC GS-1 scoring topics',
    'SSC CGL syllabus breakdown',
    'SBI PO reasoning tips',
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Chat Window Panel */}
      {isOpen && (
        <div
          className={`bg-white rounded-xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden transition-all duration-200 mb-3 ${
            isExpanded
              ? 'w-[90vw] max-w-2xl h-[80vh]'
              : 'w-[92vw] sm:w-96 h-[520px] max-h-[82vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-[#0f2942] text-white p-3.5 flex items-center justify-between border-b border-blue-900 shadow-xs">
            <div className="flex items-center space-x-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-blue-700 text-blue-100 flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5 text-blue-200" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0f2942]"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-white">Exam Assistant</span>
                  <span className="text-[10px] font-semibold bg-blue-900 text-blue-200 px-1.5 py-0.2 rounded border border-blue-600/40">
                    n8n AI
                  </span>
                </div>
                <p className="text-[11px] text-blue-200/80 leading-none">
                  {currentCategory ? `Focusing: ${currentCategory}` : 'Govt Exam Preparation Helper'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-slate-300">
              <button
                onClick={() => setShowSettings(!showSettings)}
                title="Webhook settings"
                className={`p-1.5 rounded transition ${showSettings ? 'text-white bg-white/20' : 'hover:text-white hover:bg-white/10'}`}
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetChat}
                title="Reset conversation"
                className="p-1.5 hover:text-white hover:bg-white/10 rounded transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Collapse' : 'Expand'}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded transition hidden sm:block"
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 hover:text-white hover:bg-white/10 rounded transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Context Sub-banner */}
          <div className="bg-slate-100 px-3 py-1.5 border-b border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
            <span className="flex items-center gap-1 font-medium">
              <Sparkles className="w-3 h-3 text-blue-700" />
              Connected to n8n Webhook Workflow
            </span>
            <span className="text-slate-400 font-mono text-[10px]">Session: {sessionId.slice(0, 8)}</span>
          </div>

          {/* Webhook Settings Drawer */}
          {showSettings && (
            <div className="bg-blue-50 border-b border-blue-200 p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-blue-700" />
                  n8n Webhook URL
                </span>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              </div>
              <input
                type="text"
                value={currentUrl}
                onChange={(e) => {
                  setCurrentUrl(e.target.value);
                  setUrlSaved(false);
                }}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded font-mono text-[11px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="https://.../webhook/.../chat"
              />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500">
                  Tip: Toggle workflow to &lsquo;Active&rsquo; in n8n Cloud.
                </span>
                <button
                  onClick={() => {
                    setWebhookUrl(currentUrl);
                    setUrlSaved(true);
                    setTimeout(() => setUrlSaved(false), 2000);
                  }}
                  className="px-2.5 py-1 bg-[#0f2942] hover:bg-[#1e3a8a] text-white rounded font-medium text-[11px] flex items-center gap-1"
                >
                  {urlSaved ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-300" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <span>Save URL</span>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 text-xs sm:text-sm">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              const isSystem = msg.sender === 'system';

              if (isSystem) {
                return (
                  <div key={msg.id} className="p-2.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg flex items-start gap-2 text-xs">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{msg.text}</span>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      isUser ? 'bg-[#0f2942] text-white' : 'bg-blue-600 text-white'
                    }`}
                  >
                    {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>
                  <div
                    className={`max-w-[82%] rounded-xl px-3.5 py-2.5 shadow-xs whitespace-pre-wrap leading-relaxed ${
                      isUser
                        ? 'bg-[#0f2942] text-white rounded-tr-none'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                    <div
                      className={`text-[9px] mt-1 text-right ${
                        isUser ? 'text-blue-200/70' : 'text-slate-400'
                      }`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs py-1">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <div className="bg-white border border-slate-200 px-3 py-2 rounded-xl rounded-tl-none shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-slate-500 text-xs ml-1 font-medium">Assistant thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions pills */}
          {messages.length <= 3 && (
            <div className="px-3 py-1.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider shrink-0">
                Ask:
              </span>
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p)}
                  className="text-[11px] whitespace-nowrap px-2 py-0.5 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 border border-slate-200 transition shrink-0"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about exam papers, solutions, cutoffs..."
                disabled={loading}
                className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f2942] focus:bg-white text-slate-900 placeholder-slate-400 disabled:opacity-60"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || loading}
                className="px-3.5 py-2.5 bg-[#0f2942] hover:bg-[#1e3a8a] text-white rounded-lg font-medium transition shadow-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4 text-blue-200" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 px-1">
              <span>Powered by n8n Cloud Workflow</span>
              <span>Press Enter to send</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 bg-[#0f2942] hover:bg-[#1e3a8a] text-white rounded-full shadow-xl transition-all duration-200 group border border-blue-800 hover:scale-105"
        aria-label="Open Exam Preparation Chatbot"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 text-blue-200" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0f2942]"></span>
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-xs font-bold leading-none flex items-center gap-1">
            Exam AI Assistant
            <span className="text-[9px] bg-blue-800 text-blue-200 px-1 rounded">n8n</span>
          </div>
          <div className="text-[10px] text-slate-300 leading-tight">Ask questions & strategies</div>
        </div>
      </button>
    </div>
  );
};
