import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Zap, MessageSquare, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    window.addEventListener('resize', resize);
    resize();

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
        ctx.fill();
      });
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.4 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} id="particles-canvas" className="absolute inset-0 w-full h-full" />;
}

function HologramCard() {
  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.4 }}
    >
      {/* Main screen */}
      <div className="relative float-slow">
        <div className="glass neon-border rounded-2xl p-6 relative overflow-hidden">
          {/* Screen top bar */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div className="flex-1 ml-2 h-5 bg-white/10 rounded-full" />
          </div>
          {/* Dashboard */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: 'Active Requests', val: '24', color: '#0A66FF' },
              { label: 'Completed Today', val: '87', color: '#22C55E' },
              { label: 'AI Queries', val: '156', color: '#00D4FF' },
              { label: 'Docs Processed', val: '43', color: '#1DA1F2' },
            ].map((item) => (
              <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="text-xs text-gray-400 mb-1">{item.label}</div>
                <div className="text-2xl font-bold" style={{ color: item.color }}>{item.val}</div>
              </div>
            ))}
          </div>
          {/* AI chat mockup */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full gradient-bg flex items-center justify-center shrink-0">
                <MessageSquare size={10} className="text-white" />
              </div>
              <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl rounded-tl-sm px-3 py-2 text-xs text-blue-200">
                How do I apply for a community certificate?
              </div>
            </div>
            <div className="flex gap-2 flex-row-reverse">
              <div className="w-6 h-6 rounded-full bg-cyan-500/30 flex items-center justify-center shrink-0">
                <Zap size={10} className="text-cyan-300" />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl rounded-tr-sm px-3 py-2 text-xs text-gray-300 max-w-[200px]">
                I can help! Visit any e-Sevai center with your Aadhaar and I'll guide you step-by-step. ✨
              </div>
            </div>
          </div>
          {/* Typing indicator */}
          <div className="mt-3 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            <span className="text-xs text-gray-500 ml-2">AI is typing...</span>
          </div>
        </div>
        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl bg-blue-500/10 blur-2xl -z-10" />
      </div>

      {/* Floating badges */}
      <motion.div
        className="absolute -top-4 -right-4 glass neon-border rounded-xl px-3 py-2 flex items-center gap-2"
        animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3 }}
      >
        <ShieldCheck size={14} className="text-green-400" />
        <span className="text-xs font-semibold text-green-300">Secure & Fast</span>
      </motion.div>
      <motion.div
        className="absolute -bottom-4 -left-4 glass neon-border rounded-xl px-3 py-2 flex items-center gap-2"
        animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 3.5 }}
      >
        <Clock size={14} className="text-cyan-400" />
        <span className="text-xs font-semibold text-cyan-300">24/7 AI Support</span>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden hero-bg">
      <ParticleCanvas />

      {/* Blue radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0A66FF] rounded-full blur-[120px] opacity-30" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#00D4FF] rounded-full blur-[100px] opacity-20" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass neon-border rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-cyan-300 tracking-wider uppercase">
                AI-Powered Digital Services — Now Available
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
            >
              Smart Digital{' '}
              <span className="gradient-text">Services</span>
              <br />
              for Everyday{' '}
              <span className="gradient-text">Needs</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl"
            >
              Fast, secure, AI-powered online service assistance for certificates,
              applications, bill payments, printing, scanning, and more.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-6 mb-10"
            >
              {[
                { val: '5000+', label: 'Services Done' },
                { val: '98%', label: 'Satisfaction Rate' },
                { val: '15min', label: 'Avg. Processing' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white">{stat.val}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#services"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(10,102,255,0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 text-white font-bold rounded-xl gradient-bg shadow-xl text-base"
              >
                <Zap size={18} /> Request a Service
              </motion.a>
              <motion.a
                href="#ai-section"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 text-cyan-300 font-bold rounded-xl glass neon-border text-base"
              >
                <MessageSquare size={18} /> Talk to AI Assistant
                <ArrowRight size={16} />
              </motion.a>
            </motion.div>
          </div>

          {/* Right — Hologram */}
          <HologramCard />
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F4F9FF" />
        </svg>
      </div>
    </section>
  );
}
