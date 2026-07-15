import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import CountUp from 'react-countup';
import { FiDownload, FiMail, FiArrowDown, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { Magnet } from '../../components/motion/Magnet';
import { getProfile, getSiteSettings } from './profileService';
import apiClient from '../../services/apiClient';

// Safe CJS→ESM interop for CountUp
const CountUpComponent = CountUp?.default ?? CountUp;

const TYPING_TITLES = [
  'Full Stack Developer',
  'Django Architect',
  'React.js Engineer',
  'API Designer',
  'Automation Builder',
];

const TypingEffect = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TYPING_TITLES[titleIndex];
    let timer;
    if (!deleting && displayed.length < current.length) {
      timer = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
    } else if (!deleting && displayed.length === current.length) {
      timer = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTitleIndex((prev) => (prev + 1) % TYPING_TITLES.length);
    }
    return () => clearTimeout(timer);
  }, [displayed, deleting, titleIndex]);

  return (
    <span className="font-mono" style={{ color: 'var(--accent-color)' }}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export const HeroSection = () => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });
  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: getSiteSettings,
  });
  const { data: stats = [] } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await apiClient.get('stats/');
      return res.data;
    },
  });

  const socialLinks = settings?.social_links || {};

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden"
    >
      {/* Ambient glow blobs */}
      <div
        className="gradient-blob animate-drift"
        style={{
          width: 600,
          height: 600,
          background: 'var(--accent-color)',
          top: -150,
          left: -150,
        }}
      />
      <div
        className="gradient-blob animate-drift"
        style={{
          width: 400,
          height: 400,
          background: '#6d28d9',
          bottom: -100,
          right: -100,
          animationDelay: '-8s',
        }}
      />

      <div className="max-w-7xl mx-auto w-full pt-24 pb-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Text ── */}
          <div>
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.25)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: '#10b981' }}
              />
              <span
                className="text-xs font-mono font-bold uppercase tracking-widest"
                style={{ color: '#34d399' }}
              >
                {settings?.availability_status || 'Available for hire'}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-extrabold tracking-tight leading-tight text-white"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              Hi, I'm{' '}
              <span className="relative inline-block">
                <span className="relative z-10">
                  {profile?.full_name?.split(' ')[0] || 'Rajibul'}
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="absolute bottom-1 left-0 w-full h-2 rounded origin-left"
                  style={{ background: 'var(--accent-glow)', opacity: 0.4 }}
                />
              </span>
            </motion.h1>

            {/* Animated subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-bold tracking-tight mt-3"
              style={{
                fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              I'm a <TypingEffect />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-5 leading-relaxed max-w-xl"
              style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem' }}
            >
              {profile?.bio_summary ||
                'Full-Stack Developer specializing in Django, React.js, and PostgreSQL. Building production-ready software with precision and craft.'}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-wrap items-center gap-4 mt-8"
            >
              <Magnet strength={30}>
                <a
                  href="#projects"
                  className="px-8 py-3 rounded-full font-bold text-sm transition-all"
                  style={{
                    background: 'var(--accent-color)',
                    color: '#050508',
                    boxShadow: '0 8px 24px var(--accent-glow)',
                  }}
                >
                  View Projects
                </a>
              </Magnet>
              <Magnet strength={30}>
                <a
                  href="#contact"
                  className="glass-panel px-8 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all"
                  style={{ color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <FiMail size={16} />
                  Hire Me
                </a>
              </Magnet>
              {settings?.resume_pdf && (
                <a
                  href={settings.resume_pdf}
                  download
                  className="flex items-center gap-2 text-sm transition-colors"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  <FiDownload size={16} />
                  Resume
                </a>
              )}
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex items-center gap-4 mt-7"
            >
              <span
                className="text-xs font-mono uppercase tracking-widest"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                Follow
              </span>
              <div className="h-px w-12" style={{ background: 'rgba(255,255,255,0.08)' }} />
              {[
                { icon: FiGithub, href: socialLinks.github || '#', label: 'GitHub' },
                { icon: FiLinkedin, href: socialLinks.linkedin || '#', label: 'LinkedIn' },
                { icon: FiTwitter, href: socialLinks.twitter || '#', label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <Magnet key={label} strength={20}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full glass-panel flex items-center justify-center transition-colors"
                    style={{
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.45)',
                    }}
                  >
                    <Icon size={16} />
                  </a>
                </Magnet>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Profile card ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center"
          >
            <div style={{ width: 360, height: 440, position: 'relative' }}>
              {/* outer ring */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  border: '1px solid var(--accent-glow)',
                  transform: 'rotate(3deg)',
                  opacity: 0.3,
                }}
              />
              {/* photo container */}
              <div
                className="absolute glass-panel overflow-hidden"
                style={{ inset: 8, borderRadius: '1.5rem' }}
              >
                {settings?.profile_image ? (
                  <img
                    src={settings.profile_image}
                    alt={profile?.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center gap-3"
                    style={{ background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.12) 0%, transparent 70%)' }}
                  >
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center font-extrabold text-5xl"
                      style={{
                        background: 'rgba(168,85,247,0.15)',
                        border: '2px solid var(--accent-glow)',
                        color: 'var(--accent-color)',
                      }}
                    >
                      {profile?.full_name?.[0] || 'R'}
                    </div>
                    <span
                      className="text-xs font-mono tracking-widest"
                      style={{ color: 'rgba(255,255,255,0.3)' }}
                    >
                      PROFILE PHOTO
                    </span>
                  </div>
                )}
              </div>

              {/* floating badge — experience */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute glass-panel rounded-2xl px-4 py-2 shadow-xl"
                style={{ bottom: -16, left: -24 }}
              >
                <span
                  className="text-xs font-mono font-bold"
                  style={{ color: 'var(--accent-color)' }}
                >
                  2+ yrs experience
                </span>
              </motion.div>

              {/* floating badge — stack */}
              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute glass-panel rounded-2xl px-4 py-2 shadow-xl"
                style={{ top: -16, right: -24 }}
              >
                <span
                  className="text-xs font-mono font-bold"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  Django · React · PostgreSQL
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── Stats Row ── */}
        {stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            {stats.map((stat, idx) => (
              <div key={stat.id || stat.label} className="flex flex-col">
                <div
                  className="font-extrabold tracking-tight"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white' }}
                >
                  <CountUpComponent
                    end={stat.value}
                    duration={2.5}
                    delay={1.2 + idx * 0.1}
                  />
                  <span style={{ color: 'var(--accent-color)' }}>{stat.suffix}</span>
                </div>
                <span
                  className="text-xs font-mono mt-1 uppercase tracking-widest"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex justify-center mt-12"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 transition-colors"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
            <FiArrowDown size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
