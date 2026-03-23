import React from 'react';
import { motion } from 'framer-motion';

const channelInitials = (name) => {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
};

const ChannelCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.07 }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="channel-card glass border border-white/5 hover:border-gold-500/40 rounded-2xl p-6 text-center transition-all duration-300 group cursor-pointer"
  >
    {/* Channel logo circle */}
    <div className="relative mx-auto mb-4 w-20 h-20">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg transition-all duration-300 group-hover:shadow-gold"
        style={{ background: `linear-gradient(135deg, ${item.color}CC, ${item.color}88)` }}
      >
        {channelInitials(item.name)}
      </div>
      {/* Glow ring on hover */}
      <div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: `0 0 25px ${item.color}60` }}
      />
    </div>

    {/* Channel name */}
    <h3 className="text-white font-bold text-lg mb-1 group-hover:text-gold-400 transition-colors font-heading">
      {item.name}
    </h3>

    {/* Role */}
    <p className="text-gold-400/70 text-sm font-medium mb-2">{item.role}</p>

    {/* Years */}
    <div className="inline-flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
      <span className="text-white/50 text-xs">{item.years}</span>
    </div>
  </motion.div>
);

const Channels = ({ content }) => {
  return (
    <section id="channels" className="py-24 md:py-32 bg-dark-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
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
              {content.channels.badge}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white font-heading mb-4">
            {content.channels.title}
          </h2>
          <div className="gold-divider" />
          <p className="text-white/50 mt-4 max-w-xl mx-auto">{content.channels.subtitle}</p>
        </motion.div>

        {/* Channel Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {content.channels.items.map((item, index) => (
            <ChannelCard key={item.name} item={item} index={index} />
          ))}
        </div>

        {/* Divider text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500/40" />
            <span className="text-white/30 text-sm tracking-widest uppercase">Trusted by Leading Networks</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500/40" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Channels;
