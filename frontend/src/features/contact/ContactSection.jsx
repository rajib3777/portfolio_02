import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { getTestimonials, sendMessage } from '../../services/portfolioService';
import { getSiteSettings } from '../profile/profileService';
import { ScrollReveal } from '../../components/motion/ScrollReveal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { FiStar, FiSend, FiMail, FiPhone, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import { Magnet } from '../../components/motion/Magnet';

import 'swiper/css';
import 'swiper/css/pagination';

const TestimonialsCarousel = () => {
  const { data: testimonials = [] } = useQuery({
    queryKey: ['testimonials'],
    queryFn: getTestimonials,
  });

  if (!testimonials.length) return null;

  return (
    <div className="mb-24">
      <div className="mb-10">
        <span className="text-xs uppercase font-mono font-bold tracking-widest text-accent">Social Proof</span>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-2">
          <ScrollReveal type="words">Client Testimonials</ScrollReveal>
        </h2>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{ 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }}
        className="pb-10"
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t.id}>
            <div className="glass-panel p-6 rounded-3xl border border-dark-border h-full flex flex-col gap-4 m-1">
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating || 5 }).map((_, i) => (
                  <FiStar key={i} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-gray-300 leading-relaxed flex-1 italic">
                "{t.review}"
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                {t.image ? (
                  <img src={t.image} alt={t.client_name} className="w-10 h-10 rounded-full object-cover border border-dark-border" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold text-sm">
                    {t.client_name?.[0]}
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold text-white">{t.client_name}</p>
                  <p className="text-[10px] text-gray-500 font-mono">{t.position} @ {t.company}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const ContactForm = () => {
  const [form, setForm] = useState({ sender_name: '', email: '', phone: '', subject: '', body: '' });
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      setSuccess(true);
      setForm({ sender_name: '', email: '', phone: '', subject: '', body: '' });
    },
  });

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel rounded-3xl border border-emerald-500/25 p-12 text-center flex flex-col items-center gap-4"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <FiCheckCircle size={32} />
        </div>
        <h3 className="text-xl font-bold text-white">Message Received!</h3>
        <p className="text-sm text-gray-400">Thanks for reaching out. I'll get back to you within 24 hours.</p>
        <button onClick={() => setSuccess(false)} className="text-xs font-mono text-accent underline mt-2" data-cursor="pointer">
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-3xl border border-dark-border p-8 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1.5">Your Name *</label>
          <input
            type="text" name="sender_name" required value={form.sender_name} onChange={handleChange}
            placeholder="John Doe"
            className="w-full bg-white/5 border border-dark-border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1.5">Email *</label>
          <input
            type="email" name="email" required value={form.email} onChange={handleChange}
            placeholder="john@example.com"
            className="w-full bg-white/5 border border-dark-border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1.5">Phone</label>
          <input
            type="tel" name="phone" value={form.phone} onChange={handleChange}
            placeholder="+1 234 567 8900"
            className="w-full bg-white/5 border border-dark-border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1.5">Subject *</label>
          <input
            type="text" name="subject" required value={form.subject} onChange={handleChange}
            placeholder="Project Inquiry"
            className="w-full bg-white/5 border border-dark-border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1.5">Message *</label>
        <textarea
          name="body" required rows={5} value={form.body} onChange={handleChange}
          placeholder="Tell me about your project, timeline, and budget..."
          className="w-full bg-white/5 border border-dark-border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors resize-none"
        />
      </div>

      {mutation.isError && (
        <p className="text-xs text-red-400 font-mono">Something went wrong. Please try again.</p>
      )}

      <Magnet strength={20}>
        <button
          type="submit"
          disabled={mutation.isPending}
          data-cursor="pointer"
          className="w-full bg-accent text-dark-bg py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all shadow-lg shadow-accent/20 disabled:opacity-60"
        >
          {mutation.isPending ? (
            <span className="w-4 h-4 border-2 border-dark-bg border-t-transparent rounded-full animate-spin" />
          ) : (
            <FiSend size={16} />
          )}
          {mutation.isPending ? 'Sending...' : 'Send Message'}
        </button>
      </Magnet>
    </form>
  );
};

export const ContactSection = () => {
  const { data: settings } = useQuery({ queryKey: ['settings'], queryFn: getSiteSettings });
  const socials = settings?.social_links || {};

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <TestimonialsCarousel />

      <div className="mb-12">
        <span className="text-xs uppercase font-mono font-bold tracking-widest text-accent">Get In Touch</span>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-2">
          <ScrollReveal type="words">Let's Work Together</ScrollReveal>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12">
        {/* Info Panel */}
        <div className="space-y-6">
          <p className="text-gray-400 leading-relaxed text-sm">
            Have a project in mind, want to collaborate, or just want to say hi? My inbox is always open.
          </p>

          <div className="space-y-4">
            {[
              { icon: FiMail, label: 'Email', value: socials.email || 'alex@example.com', href: `mailto:${socials.email}` },
              { icon: FiMapPin, label: 'Location', value: 'San Francisco, CA (Remote)' },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4 glass-panel border border-dark-border p-4 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{label}</div>
                  {href ? (
                    <a href={href} className="text-sm font-bold text-white hover:text-accent transition-colors" data-cursor="pointer">{value}</a>
                  ) : (
                    <p className="text-sm font-bold text-white">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Availability badge */}
          <div className="glass-panel border border-emerald-500/25 rounded-2xl p-4 flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <p className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">Currently Available</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Typical response within 24 hours</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <ContactForm />
      </div>
    </section>
  );
};
