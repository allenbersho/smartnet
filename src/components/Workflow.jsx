import { motion } from 'framer-motion';
import { ClipboardList, Upload, CreditCard, CheckCircle, Cog, Bell } from 'lucide-react';

const steps = [
  { icon: ClipboardList, label: 'Submit Request',         desc: 'Fill in your service request online or visit us', color: '#0A66FF' },
  { icon: Upload,        label: 'Upload Documents',        desc: 'Securely upload required documents', color: '#1DA1F2' },
  { icon: CreditCard,    label: 'Online Payment',          desc: 'Pay securely via UPI, card, or cash', color: '#00D4FF' },
  { icon: CheckCircle,   label: 'Verification',            desc: 'Our team verifies your submission', color: '#22C55E' },
  { icon: Cog,           label: 'Processing',              desc: 'AI-powered processing begins', color: '#1DA1F2' },
  { icon: Bell,          label: 'Completion Notification', desc: 'Get notified via WhatsApp/SMS instantly', color: '#0A66FF' },
];

export default function Workflow() {
  return (
    <section id="workflow" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full mb-4 text-[#0A66FF] bg-blue-50 border border-blue-200">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
            Your Service in <span className="gradient-text">6 Simple Steps</span>
          </h2>
          <p className="text-[#475569] max-w-xl mx-auto">
            From request to completion — we make every step transparent, fast, and stress-free.
          </p>
        </motion.div>

        {/* Desktop timeline */}
        <div className="hidden lg:block relative">
          {/* Animated vertical line */}
          <div className="absolute left-1/2 top-8 bottom-8 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#0A66FF] via-[#00D4FF] to-[#0A66FF] opacity-30" />

          <div className="space-y-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`flex items-center gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Card */}
                  <div className="flex-1 max-w-xs ml-auto">
                    <div
                      className={`glass-white rounded-2xl p-5 border service-card cursor-default ${isLeft ? 'text-right' : 'text-left'}`}
                      style={{ borderColor: `${step.color}25` }}
                    >
                      <div className={`flex items-center gap-3 mb-2 ${isLeft ? 'flex-row-reverse' : ''}`}>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${step.color}15` }}>
                          <Icon size={18} style={{ color: step.color }} />
                        </div>
                        <h3 className="font-bold text-[#0F172A] text-sm">{step.label}</h3>
                      </div>
                      <p className="text-xs text-[#475569] leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="relative shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${step.color}, #00D4FF)` }}
                    >
                      {i + 1}
                    </div>
                    <div
                      className="absolute inset-0 rounded-full opacity-30 blur-md"
                      style={{ background: step.color }}
                    />
                  </div>

                  <div className="flex-1 max-w-xs" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile — vertical */}
        <div className="lg:hidden relative pl-10">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0A66FF] via-[#00D4FF] to-[#0A66FF] opacity-40" />
          <div className="space-y-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  {/* Dot */}
                  <div
                    className="absolute -left-10 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: `linear-gradient(135deg, ${step.color}, #00D4FF)` }}
                  >
                    {i + 1}
                  </div>
                  <div className="glass-white rounded-2xl p-4" style={{ borderColor: `${step.color}25`, border: '1px solid' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={16} style={{ color: step.color }} />
                      <h3 className="font-bold text-[#0F172A] text-sm">{step.label}</h3>
                    </div>
                    <p className="text-xs text-[#475569]">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
