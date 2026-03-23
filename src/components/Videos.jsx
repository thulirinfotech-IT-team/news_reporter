import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VideoCard = ({ item, index, onPlay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.07 }}
    className="video-card group cursor-pointer"
    onClick={() => onPlay(item)}
  >
    {/* Thumbnail */}
    <div className="relative overflow-hidden rounded-xl aspect-video bg-dark-800">
      <img
        src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={e => {
          e.target.src = `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`;
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Play button */}
      <div className="play-btn absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center shadow-gold-lg">
          <span className="text-dark-900 text-2xl ml-1">▶</span>
        </div>
      </div>

      {/* Duration badge */}
      <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-0.5 rounded font-mono">
        {item.duration}
      </div>

      {/* Channel badge */}
      <div className="absolute top-3 left-3 bg-gold-500/90 text-dark-900 text-xs font-bold px-3 py-1 rounded-full">
        {item.channel}
      </div>
    </div>

    {/* Info */}
    <div className="mt-3 px-1">
      <h3 className="text-white font-semibold text-sm leading-snug mb-1 group-hover:text-gold-400 transition-colors line-clamp-2">
        {item.title}
      </h3>
      <div className="flex items-center gap-3">
        <span className="text-white/40 text-xs">👁 {item.views} views</span>
      </div>
    </div>
  </motion.div>
);

const Videos = ({ content }) => {
  const [playingVideo, setPlayingVideo] = useState(null);

  return (
    <section id="videos" className="py-24 md:py-32 bg-dark-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
            <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">
              {content.videos.badge}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white font-heading mb-4">
            {content.videos.title}
          </h2>
          <div className="gold-divider" />
          <p className="text-white/50 mt-4 max-w-xl mx-auto">{content.videos.subtitle}</p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.videos.items.map((item, index) => (
            <VideoCard key={index} item={item} index={index} onPlay={setPlayingVideo} />
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={() => setPlayingVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-4xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setPlayingVideo(null)}
                className="absolute -top-12 right-0 text-white/70 hover:text-gold-400 font-bold text-2xl transition-colors"
              >
                ✕ Close
              </button>

              {/* Player */}
              <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-dark">
                <iframe
                  src={`https://www.youtube.com/embed/${playingVideo.videoId}?autoplay=1&rel=0`}
                  title={playingVideo.title}
                  className="w-full h-full"
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                />
              </div>

              {/* Title */}
              <div className="mt-4 text-center">
                <h3 className="text-white font-bold text-lg">{playingVideo.title}</h3>
                <p className="text-gold-400/70 text-sm mt-1">{playingVideo.channel}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Videos;
