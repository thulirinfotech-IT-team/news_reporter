import React from 'react';
import { motion } from 'framer-motion';

const Footer = ({ content }) => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-950 border-t border-gold-500/10 relative overflow-hidden pb-20 md:pb-0">
      {/* Gradient top */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gold-500/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-yellow-400 flex items-center justify-center shadow-gold">
                <span className="text-dark-900 font-black text-sm">PR</span>
              </div>
              <div>
                <div className="gold-text font-black text-xl font-heading">PRIYA RAJAN</div>
                <div className="text-white/30 text-xs tracking-widest">NEWS REPORTER & PRESENTER</div>
              </div>
            </div>
            <p className="text-white/30 text-sm max-w-xs">{content.footer.tagline}</p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {['home', 'about', 'experience', 'channels', 'gallery', 'videos', 'contact'].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-white/40 hover:text-gold-400 text-sm capitalize transition-colors"
              >
                {id}
              </button>
            ))}
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            {['▶', '📸', '𝕏', 'in', 'f'].map((icon, i) => (
              <button
                key={i}
                className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center text-sm text-white/50 hover:text-gold-400 hover:border-gold-500/40 transition-all hover:-translate-y-1"
              >
                {icon}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Priya Rajan. {content.footer.rights}
          </p>
          <div className="flex items-center gap-2">
            <div className="live-badge text-[9px]">LIVE</div>
            <span className="text-white/20 text-xs">Coverage 24/7</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
