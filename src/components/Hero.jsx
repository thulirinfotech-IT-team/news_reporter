import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({ texts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = texts[currentIndex];
    const speed = isDeleting ? 50 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === text) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      } else {
        setCurrentText(prev =>
          isDeleting ? prev.slice(0, -1) : text.slice(0, prev.length + 1)
        );
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentIndex, texts]);

  return (
    <span className="typewriter-cursor text-gold-400">
      {currentText}
    </span>
  );
};

const Hero = ({ content }) => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=90')`,
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-900/85 to-dark-950/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-dark-900/30" />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-gold-600/5 rounded-full blur-3xl" style={{ animation: 'float 4s ease-in-out infinite 1s' }} />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto px-6 w-full pt-24 pb-32 md:pb-8">
        <div className="max-w-3xl">
          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="live-badge">LIVE</div>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-gold-500/60 to-transparent" />
            <span className="text-white/50 text-xs tracking-widest uppercase">News Reporter Portfolio</span>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-white/60 text-lg font-light mb-2 tracking-wide">
              {content.hero.greeting} 👋
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 font-heading">
              <span className="text-white block">I'm</span>
              <span className="gold-text block">{content.hero.name}</span>
            </h1>
          </motion.div>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl md:text-3xl font-semibold mb-6 h-10"
          >
            <TypewriterText texts={content.hero.titles} />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/60 text-base md:text-lg max-w-xl leading-relaxed mb-10"
          >
            {content.hero.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <button
              onClick={() => scrollTo('videos')}
              className="btn-gold px-8 py-4 rounded-full text-base font-bold flex items-center gap-2 shadow-gold"
            >
              <span>▶</span>
              {content.hero.cta1}
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="btn-outline-gold px-8 py-4 rounded-full text-base"
            >
              {content.hero.cta2}
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-8"
          >
            {[
              { num: '8+', label: 'Years' },
              { num: '500+', label: 'Stories' },
              { num: '3', label: 'Channels' },
              { num: '50+', label: 'Awards' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="stat-number text-3xl font-black font-heading">{stat.num}</div>
                <div className="text-white/50 text-xs tracking-widest uppercase mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* News Ticker */}
      <div className="relative z-10 bg-black/60 border-t border-gold-500/30 py-3 overflow-hidden">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-gold-500 text-dark-900 font-black text-xs px-4 py-1 mr-4 tracking-widest z-10">
            BREAKING
          </div>
          <div className="ticker-wrapper flex-1">
            <div className="ticker-content text-white/80 text-sm font-medium">
              {[content.ticker, content.ticker].join('  •  ')}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold-500/50 to-transparent relative">
          <div
            className="absolute top-0 w-px h-4 bg-gold-400"
            style={{ animation: 'scrollDown 1.5s ease-in-out infinite' }}
          />
        </div>
        <style>{`
          @keyframes scrollDown {
            0% { top: 0; opacity: 1; }
            100% { top: 48px; opacity: 0; }
          }
        `}</style>
      </motion.div>
    </section>
  );
};

export default Hero;
