import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Wifi, LogIn, Zap } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'AI Help', href: '#ai-section' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Track Request', href: '#workflow' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#071B34]/95 backdrop-blur-xl shadow-2xl border-b border-blue-500/20'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-xl gradient-bg opacity-90 flex items-center justify-center">
                  <Wifi size={20} className="text-white" />
                </div>
                <div className="absolute inset-0 rounded-xl gradient-bg opacity-40 blur-md group-hover:opacity-70 transition-opacity" />
              </div>
              <div className="leading-tight">
                <span className="block text-white font-bold text-lg tracking-tight">
                  Allen <span className="text-[#00D4FF]">Net</span>
                </span>
                <span className="block text-blue-300 text-xs font-medium tracking-widest uppercase">
                  Center
                </span>
              </div>
            </motion.a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setActiveLink(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                    activeLink === link.href
                      ? 'text-[#00D4FF]'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-1 left-4 right-4 h-0.5 rounded-full gradient-bg transition-transform duration-300 ${
                      activeLink === link.href
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 border border-white/20 rounded-lg hover:border-blue-400/60 hover:text-white transition-all"
              >
                <LogIn size={15} /> Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(10,102,255,0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-lg gradient-bg shadow-lg"
              >
                <Zap size={15} /> Request Service
              </motion.button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#071B34]/98 backdrop-blur-xl border-t border-blue-500/20"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => { setActiveLink(link.href); setMenuOpen(false); }}
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-3 flex flex-col gap-2">
                  <button className="w-full py-3 text-gray-300 border border-white/20 rounded-lg font-medium">Login</button>
                  <button className="w-full py-3 text-white font-semibold rounded-lg gradient-bg">Request Service</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Bottom Nav */}
      <div className="mobile-nav lg:hidden">
        <div className="flex justify-around">
          {navLinks.slice(0, 5).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex flex-col items-center gap-1 py-2 text-gray-400 hover:text-[#00D4FF] transition-colors"
            >
              <span className="text-xs font-medium">{link.label.split(' ')[0]}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
