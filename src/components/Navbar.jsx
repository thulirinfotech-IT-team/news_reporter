import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ language, setLanguage, content }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: content.nav.home, icon: '🏠' },
    { id: 'about', label: content.nav.about, icon: '👤' },
    { id: 'experience', label: content.nav.experience, icon: '💼' },
    { id: 'channels', label: content.nav.channels, icon: '📺' },
    { id: 'gallery', label: content.nav.gallery, icon: '🖼️' },
    { id: 'videos', label: content.nav.videos, icon: '🎥' },
    { id: 'contact', label: content.nav.contact, icon: '📞' },
  ];

  useEffect(() => {
    const sectionIds = ['home', 'about', 'experience', 'channels', 'gallery', 'videos', 'contact'];
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block ${
          scrolled ? 'navbar-scrolled' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo('home')} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-yellow-400 flex items-center justify-center shadow-gold">
              <span className="text-dark-900 font-black text-sm">PR</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm tracking-wide group-hover:text-gold-400 transition-colors">
                PRIYA RAJAN
              </div>
              <div className="text-gold-500/60 text-xs tracking-widest">NEWS REPORTER</div>
            </div>
          </button>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group ${
                  activeSection === item.id
                    ? 'text-gold-400'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-400 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Language + CTA */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
              className="flex items-center gap-2 glass px-3 py-2 rounded-full text-sm font-medium text-white/80 hover:text-gold-400 transition-all"
            >
              <span>{language === 'en' ? '🇮🇳' : '🇬🇧'}</span>
              <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>

            {/* Contact CTA */}
            <button
              onClick={() => scrollTo('contact')}
              className="btn-gold px-5 py-2 rounded-full text-sm font-bold"
            >
              {content.nav.contact}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Top Bar */}
      <motion.div
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${
          scrolled ? 'navbar-scrolled' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-500 to-yellow-400 flex items-center justify-center">
              <span className="text-dark-900 font-black text-xs">PR</span>
            </div>
            <span className="text-white font-bold text-sm">PRIYA RAJAN</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
              className="text-sm text-gold-400 font-medium"
            >
              {language === 'en' ? '🇮🇳 தமிழ்' : '🇬🇧 EN'}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            >
              <span className={`block w-6 h-0.5 bg-gold-400 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-gold-400 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-gold-400 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden glass-dark flex flex-col justify-center items-center gap-4 pt-20"
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(item.id)}
                className={`text-2xl font-bold py-2 px-8 rounded-xl transition-all ${
                  activeSection === item.id
                    ? 'text-gold-400 bg-gold-500/10'
                    : 'text-white/80 hover:text-gold-400'
                }`}
              >
                {item.icon} {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Nav */}
      <div className="mobile-nav md:hidden px-2 py-2 safe-area-bottom">
        <div className="flex justify-around">
          {navItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-all ${
                activeSection === item.id ? 'text-gold-400' : 'text-white/40 hover:text-white/70'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[9px] font-medium">{item.label.slice(0, 5)}</span>
              {activeSection === item.id && (
                <div className="w-1 h-1 rounded-full bg-gold-400" />
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
