import { motion } from 'framer-motion';
import { Clock, Zap, FileText, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';

const categories = [
  {
    icon: FileText,
    label: 'Government Services',
    color: '#0A66FF',
    services: [
      { name: 'Community Certificate', desc: 'Caste & residence proof certificate', price: '₹60', time: '2-3 days', id: 'community-cert' },
      { name: 'Income Certificate', desc: 'Annual family income proof', price: '₹60', time: '3-4 days', id: 'income-cert' },
      { name: 'Birth Certificate', desc: 'Official birth record document', price: '₹50', time: '1-2 days', id: 'birth-cert' },
      { name: 'E-Sevai Services', desc: 'All government portal services', price: '₹30', time: 'Same Day', id: 'esevai' },
    ],
  },
  {
    icon: GraduationCap,
    label: 'Student Services',
    color: '#1DA1F2',
    services: [
      { name: 'Scholarship Applications', desc: 'State & central scholarship forms', price: '₹80', time: '1-2 days', id: 'scholarship' },
      { name: 'College Forms', desc: 'Admission form assistance', price: '₹50', time: 'Same Day', id: 'college-forms' },
      { name: 'Exam Registrations', desc: 'Online exam enrollment help', price: '₹40', time: 'Same Day', id: 'exam-reg' },
      { name: 'Resume Building', desc: 'AI-powered professional resume', price: '₹150', time: '30 mins', id: 'resume' },
    ],
  },
  {
    icon: Briefcase,
    label: 'Business Services',
    color: '#00D4FF',
    services: [
      { name: 'GST Registration', desc: 'Goods & services tax enrollment', price: '₹500', time: '3-5 days', id: 'gst' },
      { name: 'MSME Registration', desc: 'Small business registration', price: '₹300', time: '2-3 days', id: 'msme' },
      { name: 'Digital Signature', desc: 'Class 2 & Class 3 DSC', price: '₹800', time: '1-2 days', id: 'digital-sig' },
    ],
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-24 bg-[#F4F9FF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full mb-4 text-[#0A66FF] bg-blue-50 border border-blue-200">
            Popular Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
            All Services at <span className="gradient-text">Your Fingertips</span>
          </h2>
          <p className="text-[#475569] max-w-2xl mx-auto">
            Comprehensive digital services across government, education, and business — handled by experts with AI assistance.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="space-y-12">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            return (
              <div key={cat.label}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 mb-6"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${cat.color}20` }}>
                    <CatIcon size={20} style={{ color: cat.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A]">{cat.label}</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-blue-100 to-transparent" />
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cat.services.map((svc, si) => (
                    <motion.div
                      key={svc.id}
                      id={svc.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: si * 0.08 }}
                      whileHover={{ y: -5, boxShadow: `0 20px 40px ${cat.color}25` }}
                      className="gradient-border service-card bg-white rounded-2xl p-5 cursor-pointer group relative overflow-hidden"
                    >
                      {/* Top accent */}
                      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }} />

                      <h4 className="font-bold text-[#0F172A] mb-1.5 text-sm">{svc.name}</h4>
                      <p className="text-xs text-[#475569] mb-4 leading-relaxed">{svc.desc}</p>

                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-lg font-extrabold" style={{ color: cat.color }}>{svc.price}</span>
                        <span className="flex items-center gap-1 text-xs text-[#475569]">
                          <Clock size={11} /> {svc.time}
                        </span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-2 rounded-lg text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-all group-hover:shadow-lg"
                        style={{ background: cat.color }}
                      >
                        <Zap size={12} /> Request Now <ArrowRight size={12} />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
