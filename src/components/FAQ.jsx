import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { id: 'faq-1', q: 'How long does certificate processing take?', a: 'Most certificates like Community, Income, and Birth Certificates are processed within 2–4 working days. Same-day processing is available for urgent requests at an additional fee.' },
  { id: 'faq-2', q: 'Can I upload documents online?', a: 'Yes! You can upload your documents securely through our online portal or WhatsApp. All files are encrypted and stored safely on our servers.' },
  { id: 'faq-3', q: 'Is online payment secure?', a: 'Absolutely. We support UPI, Debit/Credit cards, and Net Banking via secure payment gateways. Your financial data is never stored on our servers.' },
  { id: 'faq-4', q: 'Can AI help fill forms automatically?', a: 'Yes! Our AI assistant can auto-fill application forms using your Aadhaar data and guide you through complex government application processes step by step.' },
  { id: 'faq-5', q: 'How do I track my request?', a: 'Once you submit a request, you\'ll receive a unique tracking ID. Use it on our Track Request page or we\'ll send you real-time updates via SMS and WhatsApp.' },
  { id: 'faq-6', q: 'Do you provide WhatsApp updates?', a: 'Yes! We send automated WhatsApp status updates at every stage of your request — from submission to completion, so you\'re always in the loop.' },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-24 bg-[#F4F9FF] relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full mb-4 text-[#0A66FF] bg-blue-50 border border-blue-200">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-[#475569]">Quick answers to the most common questions about our services.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              id={faq.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="glass-white rounded-2xl overflow-hidden border border-blue-100 hover:border-blue-300 transition-colors"
            >
              <button
                onClick={() => setOpen(open === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between px-6 py-5 text-left group"
              >
                <span className={`font-semibold text-sm pr-4 transition-colors ${open === faq.id ? 'text-[#0A66FF]' : 'text-[#0F172A] group-hover:text-[#0A66FF]'}`}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    open === faq.id ? 'gradient-bg' : 'bg-blue-50 border border-blue-100'
                  }`}
                >
                  <ChevronDown size={16} className={open === faq.id ? 'text-white' : 'text-[#0A66FF]'} />
                </motion.div>
              </button>

              <AnimatePresence>
                {open === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-5 text-sm text-[#475569] leading-relaxed border-t border-blue-50 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
