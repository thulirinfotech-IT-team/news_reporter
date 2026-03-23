import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryImages } from '../data/content';

const Gallery = ({ content }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = content.gallery.categories;

  const filtered = activeCategory === 'All' || activeCategory === 'அனைத்தும்'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const openModal = (img, idx) => {
    setSelectedImage(img);
    setCurrentIndex(idx);
  };

  const navigate = (dir) => {
    const newIdx = (currentIndex + dir + filtered.length) % filtered.length;
    setCurrentIndex(newIdx);
    setSelectedImage(filtered[newIdx]);
  };

  return (
    <section id="gallery" className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #111111 0%, #0d0d0d 100%)' }}
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
            <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">
              {content.gallery.badge}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white font-heading mb-4">
            {content.gallery.title}
          </h2>
          <div className="gold-divider" />
          <p className="text-white/50 mt-4 max-w-xl mx-auto">{content.gallery.subtitle}</p>
        </motion.div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'btn-gold shadow-gold'
                  : 'glass border border-white/10 text-white/60 hover:text-white hover:border-gold-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {filtered.map((img, idx) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="gallery-item break-inside-avoid cursor-pointer relative rounded-xl overflow-hidden group"
                style={{ marginBottom: '16px' }}
                onClick={() => openModal(img, idx)}
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4">
                  <div className="glass-dark rounded-lg px-3 py-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm font-medium">{img.caption}</p>
                    <span className="text-gold-400 text-xs">{img.category}</span>
                  </div>
                  <div className="play-btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gold-500/90 rounded-full flex items-center justify-center">
                    <span className="text-dark-900 text-xl">🔍</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-gold-500 hover:text-dark-900 transition-all"
              >
                ✕
              </button>

              {/* Navigation */}
              <button
                onClick={() => navigate(-1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-gold-500 hover:text-dark-900 transition-all"
              >
                ‹
              </button>
              <button
                onClick={() => navigate(1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-gold-500 hover:text-dark-900 transition-all"
              >
                ›
              </button>

              {/* Image */}
              <img
                src={selectedImage.url.replace('w=600', 'w=1200')}
                alt={selectedImage.caption}
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />

              {/* Caption */}
              <div className="mt-4 text-center">
                <p className="text-white font-semibold">{selectedImage.caption}</p>
                <p className="text-gold-400/60 text-sm">{selectedImage.category}</p>
              </div>

              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass px-3 py-1 rounded-full text-white/60 text-xs">
                {currentIndex + 1} / {filtered.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
