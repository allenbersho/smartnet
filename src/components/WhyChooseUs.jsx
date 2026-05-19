import { motion } from 'framer-motion';
import { Zap, Shield, Bot, DollarSign, Activity, Users } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Fast Processing',
    desc: 'Quick request handling with real-time status tracking so you always know where things stand.',
    color: '#0A66FF',
    delay: 0,
  },
  {
    icon: Shield,
    title: 'Secure Documents',
    desc: 'Encrypted document uploads and strict privacy protection for all your sensitive data.',
    color: '#1DA1F2',
    delay: 0.1,
  },
  {
    icon: Bot,
    title: 'AI Assistance',
    desc: 'Modern AI tools that make complex applications simpler, smarter, and faster.',
    color: '#00D4FF',
    delay: 0.2,
  },
  {
    icon: DollarSign,
    title: 'Affordable Pricing',
    desc: 'Transparent, budget-friendly services with no hidden fees — ever.',
    color: '#22C55E',
    delay: 0.3,
  },
  {
    icon: Activity,
    title: 'Real-Time Updates',
    desc: 'Track your request progress anytime via SMS, WhatsApp, or our online portal.',
    color: '#0A66FF',
    delay: 0.4,
  },
  {
    icon: Users,
    title: 'Expert Support',
    desc: 'Professional human assistance alongside AI for every application type.',
    color: '#1DA1F2',
    delay: 0.5,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 dark-gradient relative overflow-hidden">
      {/* Top / bottom lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      {/* Background blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full mb-4 text-cyan-300 border border-cyan-500/30 bg-cyan-500/10">
            Why Allen Net Center
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            The Smart Choice for{' '}
            <span className="gradient-text">Digital Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We combine technology and human expertise to deliver the fastest, most reliable digital service experience in your area.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feat.delay }}
                whileHover={{
                  y: -6,
                  boxShadow: `0 20px 40px ${feat.color}30`,
                  borderColor: `${feat.color}60`,
                }}
                className="glass neon-border rounded-2xl p-6 cursor-pointer group transition-all duration-300"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                  style={{ background: `${feat.color}20`, border: `1px solid ${feat.color}40` }}
                >
                  <Icon size={24} style={{ color: feat.color }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>

                {/* Bottom accent line */}
                <div
                  className="mt-5 h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${feat.color}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Counter row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {[
            { val: '5000+', label: 'Services Completed' },
            { val: '98%',   label: 'Customer Satisfaction' },
            { val: '50+',   label: 'Service Types' },
            { val: '15min', label: 'Average Processing' },
          ].map((stat) => (
            <div key={stat.label} className="text-center glass neon-border rounded-2xl p-5">
              <div className="text-3xl font-extrabold gradient-text mb-1">{stat.val}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
