import { motion } from 'framer-motion';
import { Check, Zap, Crown } from 'lucide-react';

const plans = [
  {
    id: 'basic',
    icon: Zap,
    label: 'Basic Services',
    tagline: 'Perfect for everyday needs',
    price: '₹30',
    priceNote: 'per service',
    color: '#1DA1F2',
    featured: false,
    items: ['Web Browsing', 'Printing (per page)', 'Scanning', 'Photo Editing', 'Document Download', 'Email Assistance'],
  },
  {
    id: 'government',
    icon: Crown,
    label: 'Government Services',
    tagline: 'All certificate & form needs',
    price: '₹60',
    priceNote: 'starting price',
    color: '#0A66FF',
    featured: true,
    items: ['Certificate Processing', 'Form Filling', 'E-Sevai Services', 'Aadhaar / PAN Updates', 'Passport Assistance', 'Online Application Support'],
  },
  {
    id: 'premium',
    icon: Crown,
    label: 'Premium Services',
    tagline: 'AI-powered advanced solutions',
    price: '₹150',
    priceNote: 'starting price',
    color: '#00D4FF',
    featured: false,
    items: ['AI Document Support', 'Resume Building', 'GST / MSME Registration', 'Digital Signature', 'AI Form Auto-fill', 'Priority Processing'],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 dark-gradient relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full mb-4 text-cyan-300 border border-cyan-500/30 bg-cyan-500/10">
            Pricing Plans
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Simple, Transparent{' '}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            No hidden fees. No surprises. Just fair pricing for quality digital services.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 items-center">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                id={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -8, scale: plan.featured ? 1.03 : 1.02 }}
                className={`pricing-card relative rounded-2xl overflow-hidden ${
                  plan.featured
                    ? 'bg-gradient-to-br from-blue-600/30 to-cyan-500/20 border-2 border-blue-400/60 scale-105'
                    : 'glass neon-border'
                }`}
              >
                {plan.featured && (
                  <div className="absolute top-0 inset-x-0 py-1.5 text-center text-xs font-bold text-white gradient-bg tracking-wider">
                    ⭐ MOST POPULAR
                  </div>
                )}

                <div className={`p-7 ${plan.featured ? 'pt-10' : ''}`}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${plan.color}25`, border: `1px solid ${plan.color}40` }}>
                    <Icon size={22} style={{ color: plan.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{plan.label}</h3>
                  <p className="text-sm text-gray-400 mb-5">{plan.tagline}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-extrabold" style={{ color: plan.color }}>{plan.price}</span>
                    <span className="text-gray-400 text-sm ml-2">{plan.priceNote}</span>
                  </div>

                  <ul className="space-y-3 mb-7">
                    {plan.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-gray-300">
                        <Check size={15} style={{ color: plan.color }} className="shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                      plan.featured
                        ? 'gradient-bg text-white shadow-lg'
                        : 'border-2 text-white hover:bg-white/10'
                    }`}
                    style={!plan.featured ? { borderColor: plan.color, color: plan.color } : {}}
                  >
                    {plan.featured ? '⚡ Get Started' : 'Choose Plan'}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
