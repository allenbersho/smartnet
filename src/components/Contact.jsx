import { motion } from 'framer-motion';
import { Phone, MessageSquare, Mail, Clock, MapPin, Send } from 'lucide-react';

const contactInfo = [
  { icon: Phone,         label: 'Phone',         value: '+91 93819 98797',              href: 'tel:+919381998797' },
  { icon: MessageSquare, label: 'WhatsApp',       value: '+91 93819 98797',              href: 'https://wa.me/919381998797' },
  { icon: Mail,          label: 'Email',          value: 'alensmartnet@gmail.com',      href: 'mailto:alensmartnet@gmail.com' },
  { icon: Clock,         label: 'Working Hours',  value: 'Mon–Sat: 9 AM – 8 PM',        href: null },
  { icon: MapPin,        label: 'Address',        value: 'Allen Net Center,Thiruvattar, Kanyakumari, Tamil Nadu, 629001', href: null },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full mb-4 text-[#0A66FF] bg-blue-50 border border-blue-200">
            Contact Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
            Get in Touch <span className="gradient-text">Anytime</span>
          </h2>
          <p className="text-[#475569] max-w-xl mx-auto">
            Have a question or need help? Our team is ready to assist you in person, via phone, or through our AI assistant.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left — Contact details + form */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 mb-8"
            >
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                const content = (
                  <div className="flex items-center gap-4 glass-white border border-blue-100 hover:border-blue-300 rounded-2xl p-4 transition-all service-card cursor-default">
                    <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-[#475569] font-medium mb-0.5">{info.label}</div>
                      <div className="text-[#0F172A] font-semibold text-sm">{info.value}</div>
                    </div>
                  </div>
                );
                return (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    {info.href ? <a href={info.href} className="block">{content}</a> : content}
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Quick contact form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-white border border-blue-100 rounded-2xl p-6"
            >
              <h3 className="font-bold text-[#0F172A] mb-4">Send a Quick Message</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-[#0A66FF] focus:outline-none text-sm text-[#0F172A] bg-white transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone / WhatsApp Number"
                  className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-[#0A66FF] focus:outline-none text-sm text-[#0F172A] bg-white transition-colors"
                />
                <textarea
                  rows={3}
                  placeholder="What service do you need?"
                  className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-[#0A66FF] focus:outline-none text-sm text-[#0F172A] bg-white transition-colors resize-none"
                />
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(10,102,255,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 gradient-bg text-white font-semibold rounded-xl flex items-center justify-center gap-2 text-sm"
                >
                  <Send size={15} /> Send Message
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right — Map embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl overflow-hidden border border-blue-100 shadow-lg"
          >
            <iframe
              title="Allen Net Center Location"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d493.45897298059907!2d77.2714733!3d8.3353735!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b045500262b7bb5%3A0x6f2b44f778ff0e98!2sAlen%20E%20Sevai%20and%20Stamp%20Vendor%20%2C%20Xerox%20Centers!5e0!3m2!1sen!2sin!4v1779198071384!5m2!1sen!2sin"
              width="100%"
              height="480"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* <iframe  width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
          </motion.div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/919381998797"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-btn fixed bottom-24 right-5 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{ background: '#25D366' }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        title="Chat on WhatsApp"
      >
        <MessageSquare size={24} className="text-white" />
      </motion.a>
    </section>
  );
}
