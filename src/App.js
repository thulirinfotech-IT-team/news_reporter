import React, { useState, useEffect } from 'react';
import './index.css';

import { content } from './data/content';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Channels from './components/Channels';
import Gallery from './components/Gallery';
import Videos from './components/Videos';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CursorGlow from './components/CursorGlow';

function App() {
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  const t = content[language];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      {/* Loader */}
      <Loader isLoading={isLoading} />

      {/* Custom cursor (desktop only) */}
      <CursorGlow />

      {/* Navbar */}
      <Navbar language={language} setLanguage={setLanguage} content={t} />

      {/* Sections */}
      <main>
        <Hero content={t} />
        <About content={t} />
        <Experience content={t} />
        <Channels content={t} />
        <Gallery content={t} />
        <Videos content={t} />
        <Contact content={t} />
      </main>

      <Footer content={t} />

      {/* Scroll to top */}
      <ScrollToTop />
    </div>
  );
}

export default App;
