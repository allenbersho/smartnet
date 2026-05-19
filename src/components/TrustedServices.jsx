import { motion } from 'framer-motion';
import {
  FileText, CreditCard, Globe, Fingerprint, Printer,
  Receipt, FileSearch, Bot, Monitor, Image
} from 'lucide-react';

const services = [
  { icon: Globe,       label: 'Online Applications',  color: '#0A66FF' },
  { icon: CreditCard,  label: 'PAN Card Services',     color: '#1DA1F2' },
  { icon: FileText,    label: 'Passport Assistance',   color: '#00D4FF' },
  { icon: Fingerprint, label: 'Aadhaar Updates',       color: '#0A66FF' },
  { icon: Printer,     label: 'Printing & Scanning',   color: '#22C55E' },
  { icon: Receipt,     label: 'Bill Payments',         color: '#1DA1F2' },
  { icon: FileSearch,  label: 'Resume Creation',       color: '#00D4FF' },
  { icon: Bot,         label: 'AI Document Help',      color: '#0A66FF' },
  { icon: Monitor,     label: 'Browsing Services',     color: '#1DA1F2' },
  { icon: Image,       label: 'Photo Editing',         color: '#00D4FF' },
];

export default function TrustedServices() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full mb-4 text-[#0A66FF] bg-blue-50 border border-blue-100">
            Our Trusted Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
            Everything You Need,{' '}
            <span className="gradient-text">Under One Roof</span>
          </h2>
          <p className="text-[#475569] max-w-2xl mx-auto">
            From government certificates to AI-powered document assistance — we handle it all with speed and accuracy.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-4">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -6, boxShadow: `0 16px 40px ${svc.color}30` }}
                className="gradient-border service-card cursor-pointer"
              >
                <div className="glass-white rounded-2xl px-6 py-5 flex flex-col items-center gap-3 w-36 sm:w-40 text-center">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${svc.color}15` }}
                  >
                    <Icon size={22} style={{ color: svc.color }} />
                  </div>
                  <span className="text-xs font-semibold text-[#0F172A] leading-tight">{svc.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
