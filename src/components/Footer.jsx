import { motion } from 'framer-motion';
import { Wifi, AtSign, Share2, MessageSquare, ArrowRight } from 'lucide-react';

const footerLinks = {
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Services', href: '#services' },
    { label: 'Careers', href: '#' },
  ],
  Support: [
    { label: 'FAQs', href: '#faq-1' },
    { label: 'Help Center', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ],
  Services: [
    { label: 'Online Applications', href: '#services' },
    { label: 'AI Assistance', href: '#ai-section' },
    { label: 'Printing & Scanning', href: '#services' },
    { label: 'Bill Payments', href: '#services' },
  ],
};

export default function Footer() {
  return (
    <footer className="dark-gradient border-t border-blue-500/20">
      {/* Newsletter band */}
      <div className="border-b border-blue-500/20 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Stay Updated</h3>
              <p className="text-gray-400 text-sm">Get service updates and offers via WhatsApp.</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="tel"
                placeholder="Your WhatsApp Number"
                className="flex-1 sm:w-64 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-400"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-3 gradient-bg text-white font-semibold rounded-xl flex items-center gap-2 text-sm shrink-0"
              >
                Subscribe <ArrowRight size={14} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-10">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-4 lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                  <Wifi size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Allen <span className="text-[#00D4FF]">Net</span></div>
                  <div className="text-blue-300 text-xs font-medium tracking-widest uppercase">Center</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
                Your trusted neighborhood digital service center — powered by AI, driven by care. Fast, secure, and always here for you.
              </p>
              {/* Social links */}
              <div className="flex gap-3">
                {[
                  { icon: AtSign,  href: '#', label: 'Instagram' },
                  { icon: Share2,  href: '#', label: 'Facebook' },
                  { icon: MessageSquare, href: '#', label: 'WhatsApp' },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    className="w-9 h-9 rounded-xl glass neon-border flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4 className="text-white font-semibold mb-4 text-sm">{section}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-[#00D4FF] text-sm transition-colors hover:translate-x-1 inline-block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            © 2026 Allen Net Center. All Rights Reserved.
          </p>
          <p className="text-gray-600 text-xs flex items-center gap-1">
            Built with <span className="text-red-400">♥</span> for Tamil Nadu
          </p>
        </div>
      </div>
    </footer>
  );
}
