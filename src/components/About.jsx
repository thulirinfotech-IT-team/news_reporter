import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SkillBar = ({ name, level, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-white/80 text-sm font-medium">{name}</span>
        <span className="text-gold-400 text-sm font-bold">{level}%</span>
      </div>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-gold-500 to-yellow-300 rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

const About = ({ content }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 md:py-32 bg-dark-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-gold-500/3 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-gold-600/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
            <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">
              {content.about.badge}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white font-heading mb-4">
            {content.about.title}
          </h2>
          <div className="gold-divider" />
        </motion.div>

        {/* Content grid */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative group">
              {/* Decorative border */}
              <div className="absolute -inset-3 border border-gold-500/20 rounded-2xl" />
              <div className="absolute -inset-6 border border-gold-500/10 rounded-3xl" />

              {/* Main image */}
              <div className="relative overflow-hidden rounded-xl aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=600&q=85"
                  alt="Reporter Profile"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent" />

                {/* Live tag on image */}
                <div className="absolute top-4 left-4 flex items-center gap-2 glass-dark px-3 py-1.5 rounded-full">
                  <div className="live-badge">ON AIR</div>
                  <span className="text-white/80 text-xs">Sun News</span>
                </div>

                {/* Experience badge */}
                <div className="absolute bottom-4 right-4 glass-dark px-4 py-3 rounded-xl text-center">
                  <div className="stat-number text-3xl font-black font-heading">8+</div>
                  <div className="text-white/60 text-xs">Years</div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -right-6 top-1/3 glass border border-gold-500/20 px-4 py-3 rounded-xl shadow-gold"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gold-500 to-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-dark-900 text-lg">🏆</span>
                </div>
                <div>
                  <div className="text-white font-bold text-sm">50+ Awards</div>
                  <div className="text-white/50 text-xs">National Recognition</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-3xl md:text-4xl font-black text-white font-heading mb-6">
              {content.about.title}
            </h3>
            <p className="text-white/70 leading-relaxed mb-4 text-base">
              {content.about.description}
            </p>
            <p className="text-white/50 leading-relaxed mb-8 text-sm">
              {content.about.extended}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {content.about.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="glass rounded-xl p-4 text-center border border-gold-500/10"
                >
                  <div className="stat-number text-2xl font-black font-heading">{stat.number}</div>
                  <div className="text-white/50 text-xs mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-gold-500" />
                Core Skills
              </h4>
              {content.about.skills.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
