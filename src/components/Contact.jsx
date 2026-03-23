import React, { useState } from 'react';
import { motion } from 'framer-motion';

const socialLinks = [
  { name: 'YouTube', icon: '▶', color: '#FF0000' },
  { name: 'Instagram', icon: '📸', color: '#E1306C' },
  { name: 'Twitter/X', icon: '𝕏', color: '#1DA1F2' },
  { name: 'LinkedIn', icon: 'in', color: '#0077B5' },
  { name: 'Facebook', icon: 'f', color: '#1877F2' },
];

const Contact = ({ content }) => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #111111 50%, #0d0d0d 100%)' }}
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      {/* Background parallax */}
      <div
        className="absolute inset-0 opacity-5 parallax-bg"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=50')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950/90 via-dark-950/80 to-dark-950/90" />

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
              {content.contact.badge}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white font-heading mb-4">
            {content.contact.title}
          </h2>
          <div className="gold-divider" />
          <p className="text-white/50 mt-4 max-w-xl mx-auto">{content.contact.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Info cards */}
            {[
              { icon: '📍', label: 'Location', value: content.contact.info.location },
              { icon: '📞', label: 'Phone', value: content.contact.info.phone },
              { icon: '✉️', label: 'Email', value: content.contact.info.email },
              { icon: '📺', label: 'Studio', value: content.contact.info.studio },
            ].map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass border border-gold-500/10 rounded-xl p-4 flex items-start gap-4 hover:border-gold-500/30 transition-all"
              >
                <div className="w-10 h-10 bg-gold-500/10 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                  {info.icon}
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">{info.label}</p>
                  <p className="text-white/80 text-sm font-medium">{info.value}</p>
                </div>
              </motion.div>
            ))}

            {/* Social links */}
            <div>
              <h4 className="text-white/60 text-xs uppercase tracking-widest mb-4">
                {content.contact.social.title}
              </h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <button
                    key={social.name}
                    className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center font-bold text-sm text-white hover:border-gold-500/40 hover:text-gold-400 transition-all hover:-translate-y-1"
                    title={social.name}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass border border-gold-500/10 rounded-2xl p-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-widest mb-2 block">
                    {content.contact.form.name}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder={content.contact.form.name}
                    className="form-input w-full rounded-xl px-4 py-3 text-sm"
                  />
                </div>
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-widest mb-2 block">
                    {content.contact.form.email}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder={content.contact.form.email}
                    className="form-input w-full rounded-xl px-4 py-3 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/50 text-xs uppercase tracking-widest mb-2 block">
                  {content.contact.form.subject}
                </label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  placeholder={content.contact.form.subject}
                  className="form-input w-full rounded-xl px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="text-white/50 text-xs uppercase tracking-widest mb-2 block">
                  {content.contact.form.message}
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder={content.contact.form.message}
                  className="form-input w-full rounded-xl px-4 py-3 text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
                  status === 'sent'
                    ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                    : 'btn-gold shadow-gold'
                }`}
              >
                {status === 'sending' ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-4 h-4 border-2 border-dark-900/40 border-t-dark-900 rounded-full animate-spin" />
                    {content.contact.form.sending}
                  </span>
                ) : status === 'sent' ? (
                  <span>✓ {content.contact.form.success}</span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    ✉ {content.contact.form.send}
                  </span>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
