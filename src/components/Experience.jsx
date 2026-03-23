import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ExperienceCard = ({ item, align }) => (
  <div className="glass border border-gold-500/15 rounded-2xl p-6 hover:border-gold-500/40 transition-all duration-300 group hover:shadow-gold">
    {/* Header */}
    <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
      <div>
        <h3 className="text-white font-black text-xl font-heading group-hover:text-gold-400 transition-colors">
          {item.channel}
        </h3>
        <p className="text-gold-400 font-semibold text-sm mt-1">{item.role}</p>
      </div>
      <div className="glass bg-gold-500/10 px-3 py-1.5 rounded-full">
        <span className="text-gold-400 text-xs font-bold tracking-wide">{item.period}</span>
      </div>
    </div>

    {/* Location */}
    <div className="flex items-center gap-2 mb-3">
      <span className="text-white/30 text-xs">📍</span>
      <span className="text-white/40 text-xs">{item.location}</span>
    </div>

    {/* Description */}
    <p className="text-white/60 text-sm leading-relaxed mb-4">{item.description}</p>

    {/* Achievements */}
    <div className="flex flex-wrap gap-2">
      {item.achievements.map((ach) => (
        <span
          key={ach}
          className="bg-gold-500/10 border border-gold-500/20 text-gold-400/80 text-xs px-3 py-1 rounded-full font-medium"
        >
          ✦ {ach}
        </span>
      ))}
    </div>
  </div>
);

const Experience = ({ content }) => {
  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #111111 100%)' }}
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212,175,55,0.5) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
            <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">
              {content.experience.badge}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white font-heading mb-4">
            {content.experience.title}
          </h2>
          <div className="gold-divider" />
          <p className="text-white/50 mt-4 max-w-xl mx-auto">{content.experience.subtitle}</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold-500/50 via-gold-500/20 to-transparent -translate-x-1/2" />

          {content.experience.items.map((item, index) => (
            <TimelineEntry key={index} item={item} index={index} total={content.experience.items.length} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineEntry = ({ item, index, total }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative mb-12 md:mb-16">
      {/* Desktop layout */}
      <div className="hidden md:grid md:grid-cols-[1fr,auto,1fr] gap-8 items-start">
        {/* Left side */}
        <div className={`${isLeft ? 'pr-8' : ''}`}>
          {isLeft && (
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <ExperienceCard item={item} align="right" />
            </motion.div>
          )}
        </div>

        {/* Center dot */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="w-5 h-5 rounded-full bg-gradient-to-br from-gold-400 to-yellow-300 shadow-gold z-10 mt-4"
          />
          <div className="w-px flex-1 bg-gold-500/20 mt-2" />
        </div>

        {/* Right side */}
        <div className={`${!isLeft ? 'pl-8' : ''}`}>
          {!isLeft && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <ExperienceCard item={item} align="left" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex gap-4">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="w-4 h-4 rounded-full bg-gradient-to-br from-gold-400 to-yellow-300 shadow-gold z-10 mt-2 flex-shrink-0"
          />
          {index < total - 1 && <div className="w-px flex-1 bg-gold-500/20 mt-2" />}
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex-1 pb-8"
        >
          <ExperienceCard item={item} align="left" />
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
