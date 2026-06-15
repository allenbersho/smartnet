import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Zap, FileText, Globe, Mic, HelpCircle, BookOpen } from 'lucide-react';

const features = [
  { icon: FileText, label: 'Smart Document Guidance' },
  { icon: Zap,      label: 'Auto Form Assistance' },
  { icon: BookOpen, label: 'Resume Generation' },
  { icon: Globe,    label: 'AI Translation Help' },
  { icon: FileText, label: 'OCR Document Scanning' },
  { icon: Mic,      label: 'Voice Support' },
  { icon: HelpCircle, label: 'Instant FAQs' },
  { icon: Bot,      label: 'AI Application Support' },
];

export default function AISection() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      from: 'ai',
      text: "Hello! I am your AI Assistant. I can help guide you through the e-Sevai application process, list of documents, and services available. Ask me anything!"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { from: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get answer from chatbot backend');
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          from: 'ai',
          text: data.answer,
          sources: data.sources || [],
        },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          from: 'ai',
          text: "I'm having trouble connecting to the AI backend. Please verify that the backend server is running (`python AI/main.py` on port 8000) and your GEMINI_API_KEY is correctly set in AI/.env.",
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-section" className="py-24 dark-gradient relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Chatbot UI */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="neon-border rounded-2xl overflow-hidden" style={{ background: 'rgba(7,27,52,0.8)' }}>
              {/* Chat header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-blue-500/20">
                <div className="relative pulse-ring w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Allen AI Assistant</div>
                  <div className="flex items-center gap-1.5 text-xs text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Online — Ready to help
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="p-5 space-y-4 min-h-[320px] max-h-[400px] overflow-y-auto">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      msg.from === 'ai'
                        ? msg.isError ? 'bg-red-500 text-white' : 'gradient-bg text-white'
                        : 'bg-blue-500/30 text-blue-300'
                    }`}>
                      {msg.from === 'ai' ? <Bot size={12} /> : 'U'}
                    </div>
                    <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.from === 'ai'
                        ? msg.isError
                          ? 'bg-red-500/10 border border-red-500/20 text-red-200 rounded-tl-sm'
                          : 'bg-blue-500/15 border border-blue-400/20 text-blue-100 rounded-tl-sm'
                        : 'gradient-bg text-white rounded-tr-sm'
                    }`}>
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-blue-500/10 text-xs text-cyan-400/80">
                          <span className="font-semibold block mb-0.5">Sources referenced:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {Array.from(new Set(msg.sources.map(s => s.source))).map((sourceName) => (
                              <span key={sourceName} className="px-1.5 py-0.5 bg-blue-500/20 rounded border border-blue-400/10 text-[10px] truncate max-w-[150px]" title={sourceName}>
                                {sourceName}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <div className="flex gap-2 animate-pulse">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold gradient-bg text-white">
                      <Bot size={12} />
                    </div>
                    <div className="bg-blue-500/15 border border-blue-400/20 text-blue-100 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm">
                      <div className="flex gap-1 items-center h-5">
                        {[0, 150, 300].map((d) => (
                          <span key={d} className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <form onSubmit={handleSendMessage} className="px-4 pb-4">
                <div className="flex gap-2 bg-white/5 border border-white/10 rounded-xl p-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isLoading ? "AI is thinking..." : "Ask me anything about our services..."}
                    disabled={isLoading}
                    className="flex-1 bg-transparent text-white text-sm outline-none px-2 placeholder-gray-500 disabled:opacity-50"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={isLoading}
                    className="w-9 h-9 gradient-bg rounded-lg flex items-center justify-center disabled:opacity-50"
                  >
                    <Send size={14} className="text-white" />
                  </motion.button>
                </div>
              </form>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-blue-600/20 blur-3xl -z-10" />
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full mb-4 text-cyan-300 border border-cyan-500/30 bg-cyan-500/10">
              AI-Powered Assistance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5 leading-tight">
              AI-Powered{' '}
              <span className="gradient-text">Digital Assistance</span>
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Our intelligent AI assistant makes complex government processes simple. Get real-time guidance, auto-filled forms, and instant answers — anytime, anywhere.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 glass neon-border rounded-xl px-4 py-3"
                  >
                    <Icon size={16} className="text-cyan-400 shrink-0" />
                    <span className="text-gray-300 text-sm font-medium">{f.label}</span>
                  </motion.div>
                );
              })}
            </div>

            <motion.a
              href="#ai-section"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,212,255,0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded-xl border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 transition-colors"
            >
              <Bot size={18} /> Try AI Assistant
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
